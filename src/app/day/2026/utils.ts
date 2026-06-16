// Re-export utils from conf/2025 for schedule components.
// This file exists to keep the schedule directory working
// while it's not yet wired up for GraphQL Day events.
export { eventsColors, getEventTitle } from "@/app/conf/2025/utils"

export const HERO_MARQUEE_ITEMS = [
  ["COMMUNITY", "DEVELOPER EXPERIENCE", "APIs", "TOOLS & LIBRARIES"],
  ["OPEN SOURCE", "FEDERATION", "ECOSYSTEMS", "TRACING & OBSERVABILITY"],
  ["BEST PRACTICES", "WORKSHOPS", "SCHEMAS", "SECURITY"],
]
