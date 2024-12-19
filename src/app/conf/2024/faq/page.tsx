import FAQ from "./client-mdx"
import { Sponsors } from "../sponsors"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ Frequently Asked Questions",
}

export default function FAQPage() {
  return (
    <>
      <div className="bg-[#f4f6f8]">
        <div className="container">
          <div className="conf-block prose mx-auto max-w-4xl lg:prose-lg prose-a:text-primary">
            <FAQ />
          </div>
        </div>
      </div>
      <Sponsors />
    </>
  )
}
