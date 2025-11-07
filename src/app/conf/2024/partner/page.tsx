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
          <div className="conf-block prose mx-auto max-w-4xl lg:prose-lg prose-a:text-primary">
            <MDXPage />
          </div>
        </div>
      </div>
      <Sponsors />
    </>
  )
}
