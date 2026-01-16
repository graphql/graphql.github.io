import { useEffect, useState } from "react"
import { format } from "date-fns"

const CONFERENCE_START = new Date("2026-05-06T00:00:00")
const CONFERENCE_END = new Date("2026-05-07T23:59:59")

export function useCurrentTimeMarker() {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const showNowMarkers =
    now.getTime() >= CONFERENCE_START.getTime() &&
    now.getTime() <= CONFERENCE_END.getTime()

  const getTimeMarker = (sessionDate: string, blockEnd: Date) => {
    const blockStart = new Date(sessionDate)
    const isCurrentBlock =
      showNowMarkers &&
      now.getTime() >= blockStart.getTime() &&
      now.getTime() < blockEnd.getTime()

    if (!isCurrentBlock) {
      return null
    }

    const blockDuration = blockEnd.getTime() - blockStart.getTime()
    const timePassed = now.getTime() - blockStart.getTime()
    const positionPercentage = Math.min(
      100,
      Math.max(0, (timePassed / blockDuration) * 100),
    )
    const currentTimeFormatted = format(now, "HH:mm")

    return {
      positionPercentage,
      currentTime: currentTimeFormatted,
    }
  }

  return { getTimeMarker }
}
