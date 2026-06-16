export const fullscreenVert = /* GLSL */ `#version 300 es
precision highp float;

const vec2 POSITIONS[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);

void main() {
  gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
}
`

export const MARKER_CAPACITY = 128

export const dotsFrag = /* GLSL */ `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 uRes;
uniform vec2 uWorldSize;
uniform vec2 uPan;
uniform float uZoom;
uniform float uCell;
uniform float uSquare;
uniform sampler2D uLand;
uniform vec3 uLandColor;
uniform vec3 uSeaColor;
uniform vec4 uMarkers[${MARKER_CAPACITY}];
uniform int uMarkerCount;
uniform vec3 uMarkerColor;
uniform vec3 uHaloColor;
uniform float uHaloMinOpacity;
uniform vec3 uPointerTrail[64];
uniform int uTrailCount;
uniform float uTime;

vec2 markerCellCenter(vec4 marker, vec2 referencePx) {
  float periodX = uWorldSize.x * uZoom;
  float baseX = uPan.x + (marker.x * periodX);
  float offset =
    mod(baseX - referencePx.x + 0.5 * periodX, periodX) - 0.5 * periodX;
  float alignedX = referencePx.x + offset;
  float cellX = floor(alignedX / uCell);
  float screenY = uPan.y + (marker.y * uWorldSize.y * uZoom);
  float cellY = floor(screenY / uCell);
  return vec2((cellX + 0.5) * uCell, (cellY + 0.5) * uCell);
}

vec2 markerStateAtCellCenterPx(vec2 cellCenterPx) {
  ivec2 cellIndex = ivec2(floor(cellCenterPx / uCell));
  for (int i = 0; i < ${MARKER_CAPACITY}; i++) {
    if (i >= uMarkerCount) {
      break;
    }
    vec4 marker = uMarkers[i];
    vec2 markerCenter = markerCellCenter(marker, cellCenterPx);
    ivec2 markerIndex = ivec2(floor(markerCenter / uCell));
    if (markerIndex.x == cellIndex.x && markerIndex.y == cellIndex.y) {
      return vec2(marker.z, marker.w);
    }
  }
  return vec2(0.0);
}

float sampleCoverage(vec2 uv) {
  ivec2 texSize = textureSize(uLand, 0);
  vec2 texel = 1.0 / vec2(texSize);
  float coverage = 0.0;
  
  for (int y = 0; y < 2; y++) {
    for (int x = 0; x < 2; x++) {
      vec2 offset = (vec2(float(x), float(y)) - 0.5) * texel;
      coverage += texture(uLand, uv + offset).r;
    }
  }

  return coverage * 0.25;
}

void main() {
  vec2 fragPx = gl_FragCoord.xy;
  vec2 cell = floor(fragPx / uCell) * uCell;
  vec2 center = cell + vec2(0.5 * uCell);
  float baseHalfSquare = 0.5 * uSquare;
  vec2 markerState = markerStateAtCellCenterPx(center);
  float markerType = markerState.x;
  vec2 uv = (center / uWorldSize) / uZoom - (uPan / (uWorldSize * uZoom));
  uv.x = fract(uv.x);
  if (uv.y < 0.0 || uv.y > 1.0) {
    discard;
  }
  vec2 landUV = vec2(uv.x, 1.0 - uv.y);
  float seaCoverage = sampleCoverage(landUV);
  float landCoverage = 1.0 - seaCoverage;
  float haloIntensity = 0.0;
  for (int i = 0; i < ${MARKER_CAPACITY}; i++) {
    if (i >= uMarkerCount) {
      break;
    }
    vec4 marker = uMarkers[i];
    float strength = marker.w;
    if (strength > 0.0) {
      vec2 markerCenter = markerCellCenter(marker, fragPx);
      float dist = length(fragPx - markerCenter);
      float innerRadius = baseHalfSquare + 0.4 * uCell;
      float outerRadius = innerRadius + 2.0 * uCell;
      float radiusDiff = max(outerRadius - innerRadius, 0.0001);
      float t = clamp((dist - innerRadius) / radiusDiff, 0.0, 1.0);
      float logFalloff = 1.0 - log(1.0 + t * 9.0) / log(10.0);
      float halo = uHaloMinOpacity * logFalloff * strength;
      haloIntensity = max(haloIntensity, halo);
    }
  }
  if (markerType <= 0.5 && landCoverage < 0.5 && haloIntensity <= 0.0) {
    discard;
  }
  float landMask = step(0.5, landCoverage);
  vec3 terrainColor = mix(uSeaColor, uLandColor, landMask);
  vec3 color = terrainColor;
  if (markerType > 0.5) {
    color = uMarkerColor;
  }
  float squareHalf = baseHalfSquare;
  if (markerType <= 0.5) {
    float maxDecrease = 0.0;
    float oldestTime = 0.0;
    float newestTime = uTime;
    if (uTrailCount > 0) {
      oldestTime = uPointerTrail[uTrailCount - 1].z;
      newestTime = uPointerTrail[0].z;
    }
    float timeRange = max(newestTime - oldestTime, 0.001);
    for (int i = 0; i < 64; i++) {
      if (i >= uTrailCount) {
        break;
      }
      vec3 trailPoint = uPointerTrail[i];
      if (trailPoint.x <= 0.0 && trailPoint.y <= 0.0) {
        continue;
      }
      vec2 trailPos = trailPoint.xy;
      float dist = length(center - trailPos);
      float age = (uTime - trailPoint.z) / timeRange;
      age = clamp(age, 0.0, 1.0);
      float positionInTrail = float(i) / max(float(uTrailCount - 1), 1.0);
      float widthFactor = 1.0 - positionInTrail;
      float coolingFactor = pow(1.0 - age, 2.5);
      float combinedFactor = widthFactor * coolingFactor;
      float cellDist = dist / uCell;
      float decrease = 3.0 * combinedFactor * exp(-cellDist * 0.8);
      maxDecrease = max(maxDecrease, decrease);
    }
    squareHalf = max(0.0, squareHalf - maxDecrease);
  }
  vec2 delta = abs(fragPx - center);
  bool insideSquare = delta.x <= squareHalf && delta.y <= squareHalf;
  bool isSeaCell = markerType <= 0.5 && landCoverage < 0.5;
  float haloAlpha = clamp(haloIntensity, 0.0, 1.0);
  color = (isSeaCell || !insideSquare) ? uSeaColor : color;
  color = mix(color, uHaloColor, haloAlpha);
  outColor = vec4(color, 1.0);
}
`
