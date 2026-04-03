export interface EventMapItem {
  id: string
  city: string
  date: string
  href: string
  lon: number
  lat: number
}

export const EVENTS: EventMapItem[] = [
  {
    id: "singapore",
    city: "Singapore",
    date: "Apr 14-15",
    href: "/day/2026/singapore",
    lon: 103.8198,
    lat: 1.3521,
  },
  {
    id: "nyc",
    city: "NYC",
    date: "May 13-14",
    href: "/day/2026/nyc",
    lon: -74.006,
    lat: 40.7128,
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    date: "Jun 9-10",
    href: "/day/2026/amsterdam",
    lon: 4.9041,
    lat: 52.3676,
  },
  {
    id: "melbourne",
    city: "Melbourne",
    date: "Oct 28-29",
    href: "/day/2026/melbourne",
    lon: 144.9631,
    lat: -37.8136,
  },
  {
    id: "paris",
    city: "Paris",
    date: "Dec 1-3",
    href: "/day/2026/paris",
    lon: 2.3522,
    lat: 48.8566,
  },
]
