import { parseISO } from "date-fns"

const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
})
export const formatBlockTime = (start: string, end?: Date) => {
  const startDate = parseISO(start)
  if (end) {
    return timeFormat.formatRange(startDate, end).replace("AM –", "–")
  }
  return timeFormat.format(startDate)
}
