"use client"

/**
 * Originally from nextra/components.
 * Fixed: horizontal collapse was setting inline width on open, then only
 * removing it after openDuration delay, causing sidebar to stay at collapsed
 * width (48px) until animation timeout. Now immediately removes width on open.
 */

import cn from "clsx"
import type { ReactNode } from "react"
import { Children, useEffect, useRef, useState } from "react"

interface CollapseProps {
  className?: string
  children: ReactNode
  isOpen: boolean
  horizontal?: boolean
  openDuration?: number
  closeDuration?: number
}

export function Collapse({
  className,
  children,
  isOpen,
  horizontal = false,
  openDuration = 500,
  closeDuration = 300,
}: CollapseProps) {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [initialOpen] = useState(isOpen)
  const animationRef = useRef(0)
  const initialRender = useRef(true)
  useEffect(() => {
    const animation = animationRef.current
    const container = containerRef.current
    if (animation) {
      clearTimeout(animation)
      animationRef.current = 0
    }

    if (initialRender.current) {
      return
    }
    const child = container.children[0] as HTMLDivElement

    if (isOpen) {
      if (horizontal) {
        child.style.removeProperty("minWidth")
        container.style.removeProperty("width")
      } else {
        container.style.height = `${child.clientHeight}px`
        animationRef.current = window.setTimeout(() => {
          container.style.removeProperty("height")
        }, openDuration)
      }
    } else {
      if (horizontal) {
        const width = child.clientWidth
        child.style.minWidth = `${width}px`
        container.style.width = `${width}px`
      } else {
        container.style.height = `${child.clientHeight}px`
      }
      requestAnimationFrame(() => {
        if (horizontal) {
          container.style.width = "0"
        } else {
          container.style.height = "0"
        }
      })
    }
  }, [horizontal, isOpen, openDuration])

  useEffect(() => {
    if (isOpen || !horizontal) {
      initialRender.current = false
    }
  }, [horizontal, isOpen])

  const newChildren =
    Children.count(children) === 1 &&
    children &&
    typeof children === "object" &&
    "type" in children ? (
      children
    ) : (
      <div>{children}</div>
    )

  return (
    <div
      ref={containerRef}
      className={cn(
        "transform-gpu transition-all ease-in-out motion-reduce:transition-none",
        isOpen ? "opacity-100" : "overflow-hidden opacity-0",
        className,
      )}
      style={{
        ...(initialOpen || horizontal ? undefined : { height: 0 }),
        transitionDuration: `${isOpen ? openDuration : closeDuration}ms`,
      }}
    >
      {newChildren}
    </div>
  )
}
