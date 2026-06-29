import Link from "next/link"

import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { LookingForMore } from "@/components/looking-for-more"
import { Breadcrumbs } from "@/_design-system/breadcrumbs"
import { readVendors } from "@/resources/vendors/data"

import { ResourcesHero } from "../resources-hero"
import { VendorCard } from "./vendor-card"

export const metadata = {
  title: "Vendors",
  description:
    "Discover companies building GraphQL products and platforms in the GraphQL ecosystem.",
}

export default async function VendorsPage() {
  const vendors = await readVendors()

  return (
    <main className="gql-all-anchors-focusable pb-8 md:pb-16 lg:pb-24">
      <NavbarFixed />
      <ResourcesHero
        heading="GraphQL Vendors"
        text="Discover companies building GraphQL products and platforms. Listings are informational and do not imply endorsement by the GraphQL Foundation."
      />

      <section className="gql-container gql-section">
        <Breadcrumbs
          activePath={[
            {
              name: "home",
              route: "/",
              title: "Home",
              type: "page",
              children: [],
              frontMatter: {},
            },
            {
              name: "resources",
              route: "/resources",
              title: "Resource Hub",
              type: "page",
              children: [],
              frontMatter: {},
            },
            {
              name: "Vendors",
              route: "",
              title: "Vendors",
              type: "page",
              children: [],
            },
          ]}
        />

        <header className="mt-16 flex flex-wrap justify-between gap-x-8 gap-y-4 pt-2">
          <h2 className="typography-h2 text-pretty">Browse GraphQL Vendors</h2>
          <p className="typography-body-md max-w-[578px] text-neu-800">
            Explore companies in the GraphQL ecosystem. For product-level
            listings, see the{" "}
            <Link href="/code" className="underline">
              Tools &amp; Libraries
            </Link>{" "}
            catalog. For vendor community chat channels, visit{" "}
            <Link href="/community/vendor-channels" className="underline">
              Vendor Channels
            </Link>
            .
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {vendors.map(vendor => (
            <VendorCard key={vendor.slug} vendor={vendor} />
          ))}
        </ul>

        <LookingForMore
          className="mt-10 lg:mt-16"
          description="Discover even more ways to learn and connect with the GraphQL community."
          links={[
            { href: "/community", label: "Community" },
            { href: "/learn", label: "Learn" },
          ]}
        />
      </section>
    </main>
  )
}
