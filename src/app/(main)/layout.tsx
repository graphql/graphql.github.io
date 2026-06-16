import { ThemeProvider } from "next-themes"

import { Footer } from "../../components/footer"
import { NewFontsStyleTag } from "../fonts"
import { Navbar } from "../../components/navbar/navbar"
import {
  directories,
  docsDirectories,
  topLevelNavbarItems,
} from "../../components/navbar/top-level-items"
import { Sidebar } from "../../components/sidebar"

import "@/globals.css"
import "@/app/colors.css"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NewFontsStyleTag />
      <ThemeProvider attribute="class">
        <Navbar items={topLevelNavbarItems} />
        <Sidebar
          includePlaceholder={false}
          toc={[]}
          docsDirectories={docsDirectories}
          fullDirectories={directories}
          asPopover
        />
        <div className="isolate bg-neu-0 text-neu-900 antialiased">
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </>
  )
}
