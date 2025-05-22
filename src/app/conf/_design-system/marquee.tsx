"use client"

import { clsx } from "clsx"
import { useMotionValue, animate, motion, useReducedMotion } from "motion/react"
import { useState, useEffect, Fragment, useId } from "react"
import useMeasure from "react-use-measure"

export interface MarqueeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  gap?: number
  speed?: number
  speedOnHover?: number
  direction?: "horizontal" | "vertical"
  reverse?: boolean
  className?: string
  drag?: boolean
  separator?: React.ReactNode
}

export function Marquee({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
  drag = false,
  separator,
  ...rest
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion()
  const [currentSpeed, setCurrentSpeed] = useState(speed)
  const [ref, { width, height }] = useMeasure()

  // ensure the marquees don't start in the same place.
  const initialShiftPx = useSomeValue() * -64

  const translation = useMotionValue(initialShiftPx)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentSpeed(0)
      return
    }

    let controls
    const size = direction === "horizontal" ? width : height
    const contentSize = size + gap
    const from = reverse ? 0 : -contentSize / 2
    const to = reverse ? -contentSize / 2 : 0

    const distanceToTravel = Math.abs(to - from)
    const duration = distanceToTravel / currentSpeed

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to)
      const transitionDuration = remainingDistance / currentSpeed

      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false)
          setKey(prevKey => prevKey + 1)
        },
      })
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from)
        },
      })
    }

    return controls?.stop
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    shouldReduceMotion,
  ])

  const hoverProps =
    speedOnHover != null
      ? {
          onHoverStart: () => {
            setIsTransitioning(true)
            setCurrentSpeed(speedOnHover)
          },
          onHoverEnd: () => {
            setIsTransitioning(true)
            setCurrentSpeed(speed)
          },
          onPointerUp: (_event: React.PointerEvent<HTMLElement>) => {
            if (window.matchMedia("(hover: none)").matches) {
              setIsTransitioning(true)
              setCurrentSpeed(speed)
            }
          },
        }
      : {}

  const dragProps = drag
    ? {
        drag: direction === "horizontal" ? ("x" as const) : ("y" as const),
        onPointerDown: () => {
          document.documentElement.style.setProperty(
            "--cursor-grabbing",
            "grabbing",
          )
        },
        onPointerUp: (_event: React.PointerEvent<HTMLElement>) => {
          document.documentElement.style.cursor = "initial"
          document.documentElement.style.removeProperty("--cursor-grabbing")
        },
        onDragEnd: () => {
          setIsTransitioning(true)
          setCurrentSpeed(speed)
        },
        dragConstraints:
          direction === "horizontal"
            ? {
                right: 0,
                // window.innerWidth won't be stale because resizing the window triggers useMeasure
                left:
                  typeof window !== "undefined"
                    ? window.innerWidth - width
                    : undefined,
              }
            : {},
      }
    : {}

  const multiples = 2

  return (
    <div className={clsx("overflow-hidden", className)} {...rest}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
          alignItems: "center",
        }}
        ref={ref}
        {...dragProps}
        {...hoverProps}
        onPointerUp={event => {
          dragProps.onPointerUp?.(event)
          hoverProps.onPointerUp?.(event)
        }}
      >
        {Array.from({ length: multiples }).map((_, i) => (
          <Fragment key={i}>
            {children}
            {i < multiples - 1 && separator}
          </Fragment>
        ))}
      </motion.div>
    </div>
  )
}

function useSomeValue() {
  const id = useId()
  const num =
    id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) - 950

  return Math.abs(Math.sin(num))
}
