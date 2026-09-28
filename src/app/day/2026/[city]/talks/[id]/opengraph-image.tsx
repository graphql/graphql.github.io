import { findDayTalk, getDayTalkParams } from "../../../day-events"
import { TalkOpengraphImage } from "../../../components/og-images/talk-opengraph-image"
export {
  contentType,
  size,
} from "../../../components/og-images/talk-opengraph-image"

export const dynamicParams = false

export function generateStaticParams() {
  return getDayTalkParams()
}

export default function Image({
  params,
}: {
  params: { city: string; id: string }
}) {
  const talk = findDayTalk(params.city, params.id)
  if (!talk) {
    throw new Error(`Talk not found: ${params.city}/${params.id}`)
  }
  return TalkOpengraphImage(talk)
}
