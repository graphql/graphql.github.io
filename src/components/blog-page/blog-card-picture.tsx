"use client"

import { clsx } from "clsx"
import { type ReactNode, useEffect, useRef } from "react"

import { getBlogPattern } from "./blog-card-pattern"

interface BlogCardPictureProps {
  frontMatter: {
    title: string
    tags?: string[]
  }
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export function BlogCardPicture({
  frontMatter,
  children,
  className,
  style,
}: BlogCardPictureProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const seed = frontMatter.title

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) {
      return
    }

    const draw = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(0, Math.round(rect.width))
      const height = Math.max(0, Math.round(rect.height))

      if (width === 0 || height === 0) {
        return
      }

      const canvasWidth = Math.round(width)
      const canvasHeight = Math.round(height)

      if (canvas.width !== canvasWidth) {
        canvas.width = canvasWidth
      }
      if (canvas.height !== canvasHeight) {
        canvas.height = canvasHeight
      }

      const displayWidth = `${width}px`
      const displayHeight = `${height}px`
      if (canvas.style.width !== displayWidth) {
        canvas.style.width = displayWidth
      }
      if (canvas.style.height !== displayHeight) {
        canvas.style.height = displayHeight
      }

      const context = canvas.getContext("2d")
      if (!context) {
        return
      }

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, width, height)
      context.imageSmoothingEnabled = false

      for (const cell of getBlogPattern(seed, width, height)) {
        context.fillStyle = cell.color
        context.fillRect(cell.x, cell.y, cell.width, cell.height)
      }
    }

    draw()

    canvas.dataset.visible = "true"
  }, [seed])

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative isolate overflow-hidden bg-neu-50 dark:opacity-90",
        className,
      )}
      style={style}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 !size-full data-[visible]:animate-fade-in"
      />
      {children ? <div className="relative z-10 p-4">{children}</div> : null}
    </div>
  )
}
