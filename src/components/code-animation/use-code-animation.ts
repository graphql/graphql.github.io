"use client"

import { useEffect, useRef, useState } from "react"

const noPauses: Readonly<Record<number, number>> = {}

interface CodeAnimationOptions {
  active: boolean
  restartKey?: number
  initialDelay?: number
  minTypingDelay?: number
  maxTypingDelay?: number
  pauses?: Readonly<Record<number, number>>
  loop?: boolean
  endDelay?: number
  deleteDelay?: number
}

export function useCodeAnimation(
  code: string,
  {
    active,
    restartKey = 0,
    initialDelay = 0,
    minTypingDelay = 5,
    maxTypingDelay = 17,
    pauses = noPauses,
    loop = false,
    endDelay = 1500,
    deleteDelay = 80,
  }: CodeAnimationOptions,
) {
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const visibleCharactersRef = useRef(0)
  const directionRef = useRef<1 | -1>(1)
  const animationRef = useRef({ code: "", restartKey: -1 })

  useEffect(() => {
    const isNewAnimation =
      animationRef.current.code !== code ||
      animationRef.current.restartKey !== restartKey

    if (isNewAnimation) {
      animationRef.current = { code, restartKey }
      visibleCharactersRef.current = 0
      directionRef.current = 1
      setVisibleCharacters(0)
    }

    if (!active) return

    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)")
    let timer: ReturnType<typeof setTimeout> | undefined

    const setLength = (length: number) => {
      visibleCharactersRef.current = length
      setVisibleCharacters(length)
    }

    const schedule = (delay: number) => {
      clearTimeout(timer)
      timer = setTimeout(type, delay)
    }

    const type = () => {
      const next = Math.max(
        0,
        Math.min(
          code.length,
          visibleCharactersRef.current + directionRef.current,
        ),
      )
      setLength(next)

      if (directionRef.current === 1) {
        if (next === code.length) {
          if (!loop) return
          directionRef.current = -1
          schedule(endDelay)
          return
        }

        schedule(
          pauses[next] ??
            Math.random() * (maxTypingDelay - minTypingDelay) + minTypingDelay,
        )
        return
      }

      if (next === 0) {
        directionRef.current = 1
        schedule(initialDelay)
        return
      }
      schedule(deleteDelay)
    }

    const sync = () => {
      clearTimeout(timer)
      if (stillness.matches) {
        directionRef.current = 1
        setLength(code.length)
      } else if (!document.hidden) {
        schedule(
          visibleCharactersRef.current === 0 && directionRef.current === 1
            ? initialDelay
            : directionRef.current === 1
              ? minTypingDelay
              : deleteDelay,
        )
      }
    }

    const handleMotionPreference = () => {
      if (!stillness.matches && visibleCharactersRef.current === code.length) {
        setLength(0)
      }
      sync()
    }

    sync()
    stillness.addEventListener("change", handleMotionPreference)
    document.addEventListener("visibilitychange", sync)

    return () => {
      clearTimeout(timer)
      stillness.removeEventListener("change", handleMotionPreference)
      document.removeEventListener("visibilitychange", sync)
    }
  }, [
    active,
    code,
    deleteDelay,
    endDelay,
    initialDelay,
    loop,
    maxTypingDelay,
    minTypingDelay,
    pauses,
    restartKey,
  ])

  const isCurrentAnimation =
    animationRef.current.code === code &&
    animationRef.current.restartKey === restartKey
  const currentVisibleCharacters = isCurrentAnimation ? visibleCharacters : 0

  return {
    code: code.slice(0, currentVisibleCharacters),
    isComplete: currentVisibleCharacters === code.length,
    visibleCharacters: currentVisibleCharacters,
  }
}
