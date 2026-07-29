import { renderLlmsTxt } from "./render-llms-txt"

export const dynamic = "force-static"

export function GET() {
  return new Response(renderLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
