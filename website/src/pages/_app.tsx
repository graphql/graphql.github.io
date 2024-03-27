import type { AppProps } from "next/app"
import "@/globals.css"
import "@/codemirror.less"
import "@/index.less"
import { Roboto_Flex, Roboto_Mono } from "next/font/google"

const robotoFlex = Roboto_Flex({
  // weight: ["300", """500", "600", "700"],
  subsets: ["latin"],
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${robotoFlex.style.fontFamily};
        }

        .roboto-mono {
          font-family: ${robotoMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
