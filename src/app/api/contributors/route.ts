import { NextRequest, NextResponse } from "next/server"
import contributorData from "../../../../scripts/sync-landing-schema/data.json"

export const dynamic = "auto"
export const revalidate = 172800

interface Contributor {
  id: string
  website?: string | null
  contributions: number
}

interface ContributorData {
  [repository: string]: Contributor[]
}

function getContributorData(): ContributorData {
  return contributorData as ContributorData
}

const ALLOWED_ORIGIN =
  process.env.VERCEL_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

export async function GET(request: NextRequest) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": `public, s-maxage=86400, stale-while-revalidate=${revalidate}`,
  })

  try {
    const { searchParams } = new URL(request.url)
    const first = Math.max(
      1,
      Math.min(100, parseInt(searchParams.get("first") || "5")),
    )
    const after = searchParams.get("after") || ""
    const project = searchParams.get("project") || ""

    if (!project) {
      return NextResponse.json(
        {
          error: "Bad request",
          message: "Repository parameter is required",
        },
        { status: 400, headers },
      )
    }

    const data = getContributorData()
    const allContributors = data[project] || []

    const sortedContributors = allContributors.sort((a, b) => {
      if (b.contributions !== a.contributions) {
        return b.contributions - a.contributions
      }
      return a.id.localeCompare(b.id)
    })

    let startIndex = 0
    if (after) {
      const afterIndex = sortedContributors.findIndex(
        contributor => contributor.id === after,
      )
      if (afterIndex >= 0) {
        startIndex = afterIndex + 1
      }
    }

    const endIndex = Math.min(startIndex + first, sortedContributors.length)
    const paginatedContributors = sortedContributors.slice(startIndex, endIndex)

    return NextResponse.json(paginatedContributors, { headers })
  } catch (error) {
    console.error("Error in contributors API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to fetch contributors data",
      },
      { status: 500, headers },
    )
  }
}
