"use client"

import QRCode from "qrcode"

export interface QRCodeSVGProps {
  value: string
  size?: number
  color?: string
  /** ECC level: L=7%, M=15% (default), Q=25%, H=30%. Higher = bigger module count. */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"
}

export function QRCodeSVG({
  value,
  size = 56,
  color = "currentColor",
  errorCorrectionLevel = "M",
}: QRCodeSVGProps) {
  const qr = QRCode.create(value, { errorCorrectionLevel })
  const N = qr.modules.size
  const cells: [number, number][] = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (qr.modules.get(r, c)) cells.push([r, c])
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${N} ${N}`}
      shapeRendering="crispEdges"
      className="block"
      aria-hidden="true"
    >
      {cells.map(([r, c], i) => (
        <rect key={i} x={c} y={r} width="1" height="1" fill={color} />
      ))}
    </svg>
  )
}
