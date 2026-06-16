export function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", {
    antialias: false,
    desynchronized: true,
    powerPreference: "high-performance",
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  })

  if (!gl) {
    throw new Error("WebGL2 is not supported in this browser")
  }

  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.STENCIL_TEST)
  gl.disable(gl.CULL_FACE)
  gl.disable(gl.DITHER)

  return gl
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vertSrc: string,
  fragSrc: string,
) {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc)
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)

  const program = gl.createProgram()
  if (!program) {
    throw new Error("Unable to create WebGL program")
  }

  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) || "Unknown program link error"
    gl.deleteShader(vert)
    gl.deleteShader(frag)
    gl.deleteProgram(program)
    throw new Error(info)
  }

  gl.deleteShader(vert)
  gl.deleteShader(frag)

  return program
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: GLenum,
  source: string,
) {
  const shader = gl.createShader(type)
  if (!shader) {
    throw new Error("Unable to create shader")
  }
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) || "Unknown shader compile error"
    gl.deleteShader(shader)
    throw new Error(info)
  }

  return shader
}

export async function loadLandMaskTexture(
  gl: WebGL2RenderingContext,
  url: string,
  signal?: AbortSignal,
) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Failed to load land mask: ${response.status}`)
  }
  const blob = await response.blob()
  const bitmap = await createImageBitmap(blob, {
    colorSpaceConversion: "none",
    premultiplyAlpha: "none",
  })

  const texture = gl.createTexture()
  if (!texture) {
    throw new Error("Unable to create texture")
  }

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    bitmap.width,
    bitmap.height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    bitmap,
  )
  gl.bindTexture(gl.TEXTURE_2D, null)
  bitmap.close()

  return texture
}
