import { ImageResponse } from "next/og"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"

import {
  CfpCallImage,
  type CfpCallImageProps,
} from "./_components/cfp-call-image"
import {
  MeetupAnnouncementImage,
  type MeetupAnnouncementImageProps,
} from "./_components/meetup-announcement-image"
import {
  SpeakerSpotlightImage,
  type SpeakerSpotlightImageProps,
} from "./_components/speaker-spotlight-image"

const size = {
  width: 1200,
  height: 630,
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const rawData = searchParams.get("data")

  if (!rawData) {
    throw new Error("Missing `data` query parameter")
  }

  const data = JSON.parse(rawData)
  const fonts = await loadFontsForOG()

  const image =
    type === "announcement" ? (
      <MeetupAnnouncementImage {...(data as MeetupAnnouncementImageProps)} />
    ) : type === "speaker" ? (
      <SpeakerSpotlightImage {...(data as SpeakerSpotlightImageProps)} />
    ) : type === "cfp" ? (
      <CfpCallImage {...(data as CfpCallImageProps)} />
    ) : null

  if (!image) {
    throw new Error(`Unknown banner type: ${type}`)
  }

  return new ImageResponse(image, { ...size, fonts })
}
