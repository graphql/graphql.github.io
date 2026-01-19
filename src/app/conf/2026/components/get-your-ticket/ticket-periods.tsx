"use client"

import { useState, useEffect } from "react"

import { TicketPeriod } from "./ticket-period"

// Ticket period end dates (using zero-indexed months)
// Dates are specified in CET (UTC+1/UTC+2 for CEST) and converted to UTC
// Example: July 13th 23:59 CEST (UTC+2) becomes July 13th 21:59 UTC
const EARLY_BIRD_END_DATE = new Date(Date.UTC(2025, 6, 13, 21, 59)) // July 13th 23:59 CEST
const STANDARD_END_DATE = new Date(Date.UTC(2025, 7, 31, 21, 59)) // August 31st 23:59 CEST
const LATE_END_DATE = new Date(Date.UTC(2025, 8, 10, 21, 59)) // September 10th 23:59 CEST

export function TicketPeriods() {
  const now = useCurrentDate()

  return (
    <>
      TBD
      {/*
      <TicketPeriod
        name="Early Bird"
        price="$599"
        date={EARLY_BIRD_END_DATE}
        comingSoon={false}
        isLoading={!now}
        soldOut={!!now && now > EARLY_BIRD_END_DATE}
      />
      <TicketPeriod
        name="Standard"
        price="$799"
        date={[new Date(2025, 6, 14), STANDARD_END_DATE]}
        isLoading={!now}
        comingSoon={!!now && now < EARLY_BIRD_END_DATE}
        soldOut={!!now && now > STANDARD_END_DATE}
      />
      <TicketPeriod
        name="Late"
        price="$899"
        date={[new Date(2025, 8, 1), LATE_END_DATE]}
        isLoading={!now}
        comingSoon={!!now && now < STANDARD_END_DATE}
        soldOut={!!now && now > LATE_END_DATE}
      />
*/}
    </>
  )
}

function useCurrentDate() {
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    setDate(new Date())
  }, [])

  return date
}
