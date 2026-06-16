"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useTheme } from "next-themes"

import {
  bootMeetupsMap,
  type MapHandle,
  type MarkerPoint,
} from "@/app/(main)/community/events/map/engine"
import { MapSkeleton } from "@/app/(main)/community/events/map-skeleton"
import {
  asRgbString,
  MAP_COLORS,
  MapColors,
} from "@/app/(main)/community/events/map/map-colors"

import { EVENTS, EventMapItem } from "./events-data"

const CELL_SIZE = 8
const SQUARE_SIZE = 6
const LAND_MASK_URL = new URL(
  "../(main)/community/events/map/land-mask.png",
  import.meta.url,
).toString()
const ASPECT_RATIO = 1.65

type ThemeVariant = keyof typeof MAP_COLORS

const markerPoints: MarkerPoint[] = EVENTS.map(e => ({
  id: e.id,
  lon: e.lon,
  lat: e.lat,
}))

type MapStatus = "loading" | "ready" | "error"

export function EventsMap({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<MapHandle>()
  const { resolvedTheme } = useTheme()
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const themeColors = useMemo(
    () => MAP_COLORS[resolvedTheme as ThemeVariant] || MAP_COLORS.light,
    [resolvedTheme],
  )
  const initialThemeRef = useRef<MapColors>(themeColors)

  const [status, setStatus] = useState<MapStatus>("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const tooltip = document.getElementById("events-map-tooltip")
    if (!tooltip) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    tooltip.style.setProperty("--x", `${x}px`)
    tooltip.style.setProperty("--y", `${y}px`)
  }

  const handlePointerLeave = () => {
    const tooltip = document.getElementById("events-map-tooltip")
    if (!tooltip) return
    tooltip.style.removeProperty("--x")
    tooltip.style.removeProperty("--y")
  }

  const activeEvent = useMemo(
    () => EVENTS.find(e => e.id === activeEventId),
    [activeEventId],
  )

  const handleMapClick = () => {
    if (activeEvent?.href) {
      window.location.href = activeEvent.href
    }
  }

  useEffect(() => {
    initialThemeRef.current = themeColors
  }, [themeColors])

  useEffect(() => {
    if (status !== "ready" || !handleRef.current) return
    handleRef.current.setActiveMarker(activeEventId)
  }, [status, activeEventId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const abortController = new AbortController()
    let engine: MapHandle | null = null
    let disposed = false

    const start = async () => {
      try {
        engine = await bootMeetupsMap({
          canvas,
          markers: markerPoints,
          maskUrl: LAND_MASK_URL,
          initialCellSize: CELL_SIZE,
          initialSquareSize: SQUARE_SIZE,
          aspectRatio: ASPECT_RATIO,
          theme: initialThemeRef.current,
          signal: abortController.signal,
          onActiveMarkerChange: setActiveEventId,
        })
        if (disposed) {
          engine.dispose()
          return
        }
        handleRef.current = engine
        setStatus("ready")
        setErrorMessage(null)
      } catch (error) {
        if (abortController.signal.aborted) return
        console.error(error)
        setStatus("error")
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while rendering the map.",
        )
      }
    }

    void start()

    return () => {
      disposed = true
      abortController.abort()
      handleRef.current = undefined
      engine?.dispose()
    }
  }, [])

  useEffect(() => {
    if (!handleRef.current) return
    handleRef.current.setThemeColors(themeColors)
  }, [themeColors])

  return (
    <div
      id="events-map"
      onMouseOut={() => {
        setActiveEventId(null)
      }}
      className="ml-auto h-[320px] max-w-full animate-fade-in bg-[--sea] [--sea:--sea-light] dark:[--sea:--sea-dark] sm:h-[420px] md:h-[520px] lg:h-[560px]"
      style={
        {
          "--sea-dark": asRgbString(MAP_COLORS.dark.sea),
          "--sea-light": asRgbString(MAP_COLORS.light.sea),
          "--land-dark": asRgbString(MAP_COLORS.dark.land),
          "--land-light": asRgbString(MAP_COLORS.light.land),
          aspectRatio: ASPECT_RATIO,
        } as React.CSSProperties
      }
    >
      <div
        className="group/map relative size-full bg-[--sea] transition duration-300 ease-out"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleMapClick}
        style={{
          transform: status === "ready" ? "scale(1)" : "scale(0.99)",
          filter: status === "ready" ? "blur(0px)" : "blur(1px)",
        }}
      >
        <canvas
          ref={canvasRef}
          aria-describedby="events-map-tooltip"
          aria-label="Interactive map of GraphQL Day events"
          className="block size-full transition-opacity duration-[600ms] ease-out"
          style={{
            imageRendering: "pixelated",
            touchAction: "none",
            opacity: status === "ready" ? 1 : 0,
          }}
        />

        <EventMapTooltip
          id="events-map-tooltip"
          activeEventId={activeEventId}
        />

        <MapSkeleton className={status === "loading" ? "" : "!opacity-0"} />

        {status === "error" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-sm text-neu-600">
            Unable to load the map{errorMessage ? ` (${errorMessage})` : ""}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

function EventMapTooltip({
  id,
  activeEventId,
}: {
  id: string
  activeEventId: string | null
}) {
  const name = activeEventId && EVENTS.find(e => e.id === activeEventId)?.city
  return (
    <span
      id={id}
      role="tooltip"
      className="pointer-events-none absolute left-0 top-0 z-10 hidden min-w-0 whitespace-nowrap border border-neu-200/40 bg-neu-0/40 px-2 py-[3px] text-xs text-neu-900 shadow-sm backdrop-blur-sm transition-[transform,opacity] duration-75 ease-out group-hover/map:flex"
      style={{
        transform: `translate3d(calc(var(--x) - 50%), calc(var(--y) - 50% - 22px), 0)`,
        opacity: activeEventId ? 1 : 0,
      }}
    >
      {name}
    </span>
  )
}
