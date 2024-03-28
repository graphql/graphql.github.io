import FAQ from "./client-mdx"
import { Sponsors } from "../../_components/sponsors"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ Frequently Asked Questions",
}

export default function FAQPage() {
  return (
    <>
      <div className="bg-[#f4f6f8]">
        <div className="container">
          <div className="prose lg:prose-lg conf-block prose-a:text-primary max-w-4xl mx-auto">
            <FAQ />
          </div>
        </div>
      </div>
      <Sponsors />
    </>
  )
}
