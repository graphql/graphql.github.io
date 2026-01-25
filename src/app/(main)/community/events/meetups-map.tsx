"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useTheme } from "next-themes"

import { meetups } from "@/components/meetups"

import { bootMeetupsMap, type MapHandle, type MarkerPoint } from "./map/engine"
import { MapTooltip } from "./map/map-tooltip"
import { MapSkeleton } from "./map-skeleton"
import { MeetupsList } from "./meetups-list"
import { asRgbString, MAP_COLORS, MapColors } from "./map/map-colors"

const CELL_SIZE = 8
const SQUARE_SIZE = 6
const LAND_MASK_URL = new URL("./map/land-mask.png", import.meta.url).toString()
const ASPECT_RATIO = 1.65

type ThemeVariant = keyof typeof MAP_COLORS

const markerPoints: MarkerPoint[] = meetups.map(({ node }) => ({
  id: node.id,
  lon: node.longitude,
  lat: node.latitude,
}))

type MapStatus = "loading" | "ready" | "error"

export function MeetupsMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<MapHandle>()
  const { resolvedTheme } = useTheme()
  const [activeMeetupId, setActiveMeetupId] = useState<string | null>(null)
  const themeColors = useMemo(
    () => MAP_COLORS[resolvedTheme as ThemeVariant] || MAP_COLORS.light,
    [resolvedTheme],
  )
  const initialThemeRef = useRef<MapColors>(themeColors)

  const [status, setStatus] = useState<MapStatus>("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const tooltip = document.getElementById("map-tooltip")
    if (!tooltip) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    tooltip.style.setProperty("--x", `${x}px`)
    tooltip.style.setProperty("--y", `${y}px`)
  }

  const handlePointerLeave = () => {
    const tooltip = document.getElementById("map-tooltip")
    if (!tooltip) return
    tooltip.style.removeProperty("--x")
    tooltip.style.removeProperty("--y")
  }

  const activeMeetup = useMemo(
    () => meetups.find(m => m.node.id === activeMeetupId),
    [activeMeetupId],
  )

  const handleMapClick = () => {
    if (activeMeetup?.node.link) {
      window.open(activeMeetup.node.link, "_blank", "noopener,noreferrer")
    }
  }

  useEffect(() => {
    initialThemeRef.current = themeColors
  }, [themeColors])

  useEffect(() => {
    if (status !== "ready" || !handleRef.current) return
    handleRef.current.setActiveMarker(activeMeetupId)
  }, [status, activeMeetupId])

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
          onActiveMarkerChange: setActiveMeetupId,
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
      id="meetups-map"
      onMouseOut={() => {
        setActiveMeetupId(null)
      }}
      className="my-6 flex flex-row-reverse divide-neu-200 border border-neu-200 bg-[--sea] [--sea:--sea-light] dark:divide-neu-50 dark:border-neu-50 dark:[--sea:--sea-dark] max-md:flex-col max-md:divide-y md:h-[592px]"
      style={
        {
          "--sea-dark": asRgbString(MAP_COLORS.dark.sea),
          "--sea-light": asRgbString(MAP_COLORS.light.sea),
          "--land-dark": asRgbString(MAP_COLORS.dark.land),
          "--land-light": asRgbString(MAP_COLORS.light.land),
        } as React.CSSProperties
      }
    >
      <div
        className="group/map relative grow border-neu-200 bg-[--sea] dark:border-neu-50 dark:bg-[--sea] md:border-l"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleMapClick}
      >
        <canvas
          ref={canvasRef}
          aria-describedby="map-tooltip"
          aria-label="Interactive WebGL map of GraphQL meetups"
          className="block h-80 w-full animate-fade-in transition-opacity duration-150 ease-linear md:h-full"
          style={{
            imageRendering: "pixelated",
            touchAction: "none",
            opacity: status === "ready" ? 1 : 0,
          }}
        />

        <MapTooltip id="map-tooltip" activeMeetupId={activeMeetupId} />

        <InfoTip />

        <MapSkeleton className={status === "loading" ? "" : "!opacity-0"} />

        {status === "error" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-sm text-neu-600">
            Unable to load the map{errorMessage ? ` (${errorMessage})` : ""}
          </div>
        )}
      </div>
      <MeetupsList
        activeMeetupId={activeMeetupId}
        onActiveMeetupChange={setActiveMeetupId}
        className="shrink-0 md:max-h-full lg:w-[240px]"
      />
    </div>
  )
}

function InfoTip() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 w-fit translate-y-0.5 px-1 py-0.5 text-[11px] text-neu-700/90 opacity-0 blur-[0.5px] backdrop-blur-sm transition duration-200 before:inset-0 before:bg-[--sea] before:opacity-30 group-hover/map:translate-y-0 group-hover/map:opacity-100 group-hover/map:blur-0 hover-none:hidden">
      Pinch or ctrl+scroll to zoom
    </div>
  )
}
