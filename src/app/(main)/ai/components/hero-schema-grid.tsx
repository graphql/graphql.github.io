"use client"

import { useEffect, useRef } from "react"

export function SchemaGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const gfx = { canvas, ctx }

    let animId: number
    let time = 0
    const nodes: { x: number; y: number; r: number; vx: number; vy: number }[] =
      []

    function resize() {
      gfx.canvas.width = gfx.canvas.offsetWidth * (window.devicePixelRatio || 1)
      gfx.canvas.height =
        gfx.canvas.offsetHeight * (window.devicePixelRatio || 1)
      gfx.ctx.setTransform(1, 0, 0, 1, 0, 0)
      gfx.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
    }

    function init() {
      resize()
      const w = gfx.canvas.offsetWidth
      const h = gfx.canvas.offsetHeight
      nodes.length = 0
      for (let i = 0; i < 30; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        })
      }
    }

    function draw() {
      const w = gfx.canvas.offsetWidth
      const h = gfx.canvas.offsetHeight

      gfx.ctx.clearRect(0, 0, w, h)
      time += 0.005

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy + Math.sin(time + n.x * 0.02) * 0.1
        if (n.x < 0) n.x = w
        if (n.x > w) n.x = 0
        if (n.y < 0) n.y = h
        if (n.y > h) n.y = 0
      }

      const maxDist = 150
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            gfx.ctx.beginPath()
            gfx.ctx.moveTo(nodes[i].x, nodes[i].y)
            gfx.ctx.lineTo(nodes[j].x, nodes[j].y)
            const alpha = (1 - dist / maxDist) * 0.08
            gfx.ctx.strokeStyle = `rgba(255,204,239,${alpha})`
            gfx.ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        gfx.ctx.beginPath()
        gfx.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        gfx.ctx.fillStyle = "rgba(255,204,239,0.15)"
        gfx.ctx.fill()
      }
    }

    function frame() {
      draw()
      animId = requestAnimationFrame(frame)
    }

    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)")

    let running = false
    let onScreen = false

    function sync() {
      const shouldRun = onScreen && !document.hidden && !stillness.matches
      if (shouldRun === running) return
      running = shouldRun
      if (shouldRun) frame()
      else cancelAnimationFrame(animId)
    }

    function onResize() {
      resize()
      const w = gfx.canvas.offsetWidth
      const h = gfx.canvas.offsetHeight
      for (const n of nodes) {
        n.x = Math.min(n.x, w)
        n.y = Math.min(n.y, h)
      }
      if (!running) draw()
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })

    init()
    draw()
    observer.observe(gfx.canvas)
    stillness.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    window.addEventListener("resize", onResize)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      observer.disconnect()
      stillness.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
    />
  )
}
