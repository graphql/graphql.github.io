import { Metadata } from "next"
import MDXPage from "./client-mdx"
import { Sponsors } from "../sponsors"

export const metadata: Metadata = {
  title: "Media and Community Partners",
}

export default function Page() {
  return (
    <>
      <div className="bg-[#f4f6f8]">
        <div className="container">
          <div className="prose lg:prose-lg conf-block prose-a:text-primary max-w-4xl mx-auto">
            <MDXPage />
          </div>
        </div>
      </div>
      <Sponsors />
    </>
  )
}
