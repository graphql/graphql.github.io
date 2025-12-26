import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if (window.navigator.platform.includes("Mac")) document.documentElement.classList.add("mac")',
          }}
        />
      </body>
    </Html>
  )
}
