import { useEffect, useState } from "react"
import { format } from "date-fns"

export function useCurrentTimeMarker(
  conferenceStart: Date,
  conferenceEnd: Date,
) {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const showNowMarkers =
    now.getTime() >= conferenceStart.getTime() &&
    now.getTime() <= conferenceEnd.getTime()

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
