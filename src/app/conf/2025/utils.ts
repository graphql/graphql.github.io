import { ScheduleSession } from "../2023/types"

export const eventsColors: Record<string, string> = {
  Breaks: "#7DAA5E",
  "Keynote Sessions": "#7e66cc",
  "Lightning Talks": "#1a5b77",
  "Session Presentations": "#5c2e75",
  Workshops: "#4b5fc0",
  Unconference: "#7e66cc",
  "API Platform": "#4e6e82",
  Backend: "#36C1A0",
  "Breaks & Special Events": "#7DAA5E",
  "Defies Categorization": "#894545",
  "Developer Experience": "#6fc9af",
  "Federation and Composite Schemas": "#cbc749",
  "GraphQL Clients": "#ca78fc",
  "GraphQL in Production": "#e4981f",
  "GraphQL Security": "#CC6BB0",
  "GraphQL Spec": "#6B73CC",
  Scaling: "#8D8D8D",
  Frontend: "violet",
  Documentation: "salmon",
  "Schema Evolution": "thistle",
  Security: "cornflowerblue",
  "Case studies": "#894545",
  "Federation and distributed systems": "#FC8251",
}

export function getEventTitle(
  event: Pick<ScheduleSession, "name">,
  speakers: string[],
): string {
  let { name } = event

  if (!speakers) {
    return name
  }

  if (name.startsWith("Keynote: ")) {
    name = name.slice(8)
  }

  speakers?.forEach(speaker => {
    const speakerInTitle = name.indexOf(`- ${speaker.replace("ı", "i")}`)
    if (speakerInTitle > -1) {
      name = name.slice(0, speakerInTitle)
    }
  })

  return name
}

export const HERO_MARQUEE_ITEMS = [
  ["COMMUNITY", "DEVELOPER EXPERIENCE", "APIs", "TOOLS & LIBRARIES"],
  ["OPEN SOURCE", "FEDERATION", "ECOSYSTEMS", "TRACING & OBSERVABILITY"],
  ["BEST PRACTICES", "WORKSHOPS", "SCHEMAS", "SECURITY"],
]
