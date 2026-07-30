"use client"

import { useEffect, useRef } from "react"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { Button } from "@/app/conf/_design-system/button"
import { SectionLabel } from "@/app/conf/_design-system/section-label"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import blurBean from "@/components/blog-page/blur-bean.webp"

const highlights = [
  "Self-describing schemas let agents discover your API",
  "Strong typing eliminates hallucinated API calls",
  "Composable queries minimize token usage by up to 90%",
]

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-pri-dark text-white dark:bg-pri-darker">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: `url(${blurBean.src})`,
          WebkitMaskImage: `url(${blurBean.src})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center top",
          WebkitMaskPosition: "center top",
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      >
        <StripesDecoration
          stripeWidth="8px"
          evenClassName="bg-[linear-gradient(180deg,hsl(var(--color-pri-darker)/0.6)_0%,transparent_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-pri-light)/0.25)_0%,transparent_100%)]"
          oddClassName="bg-[linear-gradient(180deg,hsl(var(--color-neu-900)/0.2)_0%,transparent_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-neu-0)/0.12)_0%,transparent_100%)]"
        />
      </div>
      <SchemaGrid />
      <div className="gql-container relative">
        <div className="flex flex-col items-center px-4 pb-16 pt-24 text-center lg:min-h-[640px] lg:justify-center lg:pb-24 lg:pt-32 xl:min-h-[720px] xl:px-24 xl:pt-40">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sec-light/30 bg-sec-light/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-sec-base opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-sec-base" />
            </span>
            <span className="typography-body-sm font-medium text-sec-light">
              New: GraphQL AI Working Group
            </span>
          </div>

          <SectionLabel className="mb-6 !text-sec-light">
            GraphQL + AI
          </SectionLabel>

          <h1 className="typography-h1 max-w-4xl text-balance">
            The API protocol
            <br />
            <span className="text-sec-light">for intelligent systems</span>
          </h1>

          <p className="typography-body-lg mt-6 max-w-2xl text-pretty text-white/80">
            When AI agents need to interact with APIs, GraphQL&apos;s
            self-describing schemas, strong typing, and composable queries make
            it the natural choice. No hand-written tool definitions. No
            token-wasting REST payloads. Just structured, predictable data.
          </p>

          <ul className="mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-2">
            {highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-1.5">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-sec-base" />
                <span className="typography-body-sm text-white/80">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="#interactive-demo" variant="primary">
              Try the live demo
              <ArrowDownIcon className="size-5 shrink-0 text-neu-0" />
            </Button>
            <Button
              href="/blog/2025-07-03-graphql-supercharging-ai/"
              variant="secondary"
            >
              Read the blog post
            </Button>
            <Button href="/resources/ai" variant="tertiary">
              Explore AI resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Subtle animated schema grid in background
   ───────────────────────────────────────────── */

function SchemaGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let time = 0
    const nodes: { x: number; y: number; r: number; vx: number; vy: number }[] =
      []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
    }

    function init() {
      resize()
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
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
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)
      time += 0.005

      // Update & draw nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy + Math.sin(time + n.x * 0.02) * 0.1
        if (n.x < 0) n.x = w
        if (n.x > w) n.x = 0
        if (n.y < 0) n.y = h
        if (n.y > h) n.y = 0
      }

      // Draw connections
      const maxDist = 150
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            const alpha = (1 - dist / maxDist) * 0.08
            ctx.strokeStyle = `rgba(255,204,239,${alpha})`
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,204,239,0.15)"
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener("resize", init)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", init)
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
