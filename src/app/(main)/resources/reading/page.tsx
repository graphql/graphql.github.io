import { ReadingLibraryPage, readingMetadata } from "./reading-page"

export const metadata = readingMetadata("all")

export default function ReadingPage() {
  return <ReadingLibraryPage variant="all" />
}
