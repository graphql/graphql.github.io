import { ReactElement, ReactNode } from "react"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar/navbar"
import { topLevelNavbarItems } from "@/components/navbar/top-level-items"

export default function MainLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  return (
    <>
      <Navbar items={topLevelNavbarItems} />
      {children}
      <Footer />
    </>
  )
}
