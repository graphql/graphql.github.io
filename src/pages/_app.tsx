import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { NewFontsStyleTag } from "@/app/fonts"

import "@/docs.css"
import "@/globals.css"
import "@/app/colors.css"

import { useMenu } from "../components/use-menu"

const gaId = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function handleRouteChange(url: string) {
  ;(window as any).gtag("config", gaId, { page_path: url })
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (!gaId) return
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const menu = useMenu()

  return (
    <>
      <NewFontsStyleTag />
      <Component {...pageProps} />
    </>
  )
}
