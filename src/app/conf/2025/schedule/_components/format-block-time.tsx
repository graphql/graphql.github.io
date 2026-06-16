import { parseISO } from "date-fns"

const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // per Carolyn's request
})

export const formatBlockTime = (start: string, end?: Date) => {
  const startDate = parseISO(start)
  if (end) {
    return timeFormat.formatRange(startDate, end).replace("AM –", "–")
  }
  return timeFormat.format(startDate)
}
