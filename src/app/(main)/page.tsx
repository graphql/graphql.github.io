import type { Metadata } from "next"
import { IndexPage } from "../../components/index-page"

export const metadata: Metadata = {
  title: "GraphQL | A query language for your API",
}

export default function Page() {
  return <IndexPage />
}
