// pdf-preview.tsx
"use client"
import { useEffect, useState } from "react"

export function PdfPreview({ path }: { path: string }) {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox")
    setCanRender(
      !isFirefox && !!navigator?.mimeTypes?.["application/pdf" as any],
    )
  }, [])

  if (!canRender) return null
  return <iframe src={path} className="aspect-video size-full" />
}
