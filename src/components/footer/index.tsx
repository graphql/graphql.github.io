import NextLink from "next/link"
import { useThemeConfig } from "nextra-theme-docs"
import type { ReactNode } from "react"

import { GraphQLWordmarkLogo } from "@/icons"
import { SocialIcons } from "@/app/conf/_components/social-icons"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import blurBean from "@/app/conf/2025/components/footer/blur-bean.webp"
import { Anchor } from "@/app/conf/_design-system/anchor"

import { renderComponent } from "../utils/render-component"
import { ConferenceFooterBox } from "./conference-footer-box"
import { ThemeSwitch } from "../theme-switch"

interface FooterLink {
  title: ReactNode
  route: string
}

interface FooterSection {
  title?: ReactNode
  route?: string
  links: FooterLink[]
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Learn",
    route: "/learn",
    links: [
      { title: "Introduction", route: "/learn" },
      { title: "Best Practices", route: "/learn/best-practices" },
      {
        title: (
          <span>
            <span className="max-md:hidden">Frequently Asked Questions</span>
            <span className="md:hidden">FAQ</span>
          </span>
        ),
        route: "/faq",
      },
      {
        title: "Training Courses",
        route: "/community/resources/training-courses",
      },
    ],
  },
  {
    title: "Code",
    links: [
      { title: "GitHub", route: "https://github.com/graphql" },
      {
        title: "Specification",
        route: "https://spec.graphql.org",
      },
      { title: "Libraries & Tools", route: "/code" },
      {
        title: "Services & Vendors",
        route: "/code/?tags=services",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        title: "Resources",
        route: "/community/resources/official-channels",
      },
      {
        title: "Events",
        route: "/community/events",
      },
      {
        title: (
          <span>
            Contribute<span className="max-md:hidden"> to GraphQL</span>
          </span>
        ),
        route: "/community/contribute/essential-links",
      },
      { title: "Landscape", route: "https://landscape.graphql.org" },
      { title: "Shop", route: "https://store.graphql.org/" },
    ],
  },
  {
    title: "& More",
    links: [
      { title: "Blog", route: "/blog" },
      {
        title: "GraphQL Foundation",
        route: "/foundation",
      },
      {
        title: "Community Grant",
        route: "/foundation/community-grant",
      },
      {
        title: "Brand Guidelines",
        route: "/brand",
      },
      {
        title: "Code of Conduct",
        route: "/codeofconduct",
      },
    ],
  },
]

const CONFERENCE_YEAR = 2025
const HAS_CONFERENCE_BOX = true

export function Footer() {
  return (
    <footer className="relative isolate !bg-neu-100 text-neu-900 dark:!bg-neu-0 max-md:px-0 max-md:pt-0">
      <Stripes />

      <div className="mx-auto max-w-[120rem] border-neu-400 dark:border-neu-100 3xl:border-x 3xl:dark:border-t">
        <div className="flex flex-wrap justify-between gap-4 p-4 max-md:w-full md:p-6 2xl:px-10">
          <NextLink href="/" className="nextra-logo flex items-center">
            <GraphQLWordmarkLogo className="h-6" title="GraphQL" />
          </NextLink>
          <div className="typography-menu flex items-center *:rounded-none dark:*:text-neu-900 md:hidden">
            <ThemeSwitch />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-neu-400 py-px dark:bg-neu-100 lg:grid-cols-5">
          {FOOTER_SECTIONS.map((section, i) => (
            <div
              className="typography-menu relative bg-neu-100 py-4 dark:bg-neu-0 lg:py-6 3xl:py-10"
              key={i}
            >
              {section.title && (
                <h3 className="font-bold lg:mb-4 3xl:mb-10">
                  {section.route ? (
                    <Anchor
                      className="gql-focus-visible block p-4 underline-offset-4 hover:underline focus-visible:!-outline-offset-4 md:px-6 2xl:px-10"
                      href={section.route}
                    >
                      {section.title}
                    </Anchor>
                  ) : (
                    <span className="block p-4 md:px-6 2xl:px-10">
                      {section.title}
                    </span>
                  )}
                </h3>
              )}
              {section.links.map((link, i) => (
                <Anchor
                  key={i}
                  href={link.route}
                  className="gql-focus-visible block p-4 underline-offset-4 hover:underline focus-visible:!-outline-offset-4 md:px-6 2xl:px-10"
                >
                  {link.title}
                </Anchor>
              ))}
            </div>
          ))}
          <div className="flex flex-col max-lg:contents">
            {HAS_CONFERENCE_BOX && (
              <ConferenceFooterBox
                href={`/conf/${CONFERENCE_YEAR}`}
                className="z-[2] col-span-full flex-1 max-lg:row-start-1"
              />
            )}
            <SocialIcons
              count={4}
              className="gql-all-anchors-focusable col-span-full gap-px text-pri-base *:flex *:flex-1 *:items-center *:justify-center *:bg-neu-100 *:dark:bg-neu-0 max-sm:*:aspect-square lg:*:aspect-square [&>a:focus]:text-current [&>a:focus]:!-outline-offset-[6px] [&>a:focus]:ring-transparent [&>a:hover]:bg-neu-0/90 [&>a:hover]:text-current [&_svg]:!h-8"
            />
          </div>
        </div>

        <div className="relative flex items-center justify-between gap-4 p-4 max-md:justify-center md:px-6 2xl:px-10">
          <div className="typography-menu flex items-center *:rounded-none dark:*:text-neu-900 max-md:hidden">
            <ThemeSwitch />
          </div>
          <p className="typography-body-xs flex flex-col text-pretty max-md:gap-5">
            Copyright © {new Date().getFullYear()} The GraphQL Foundation. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function Stripes() {
  return (
    <div
      role="presentation"
      // prettier-ignore
      // false positive
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className="pointer-events-none absolute inset-0 z-[1]
        [--start-1:rgba(255,204,239,.05)]
        [--end-1:hsl(var(--color-pri-base)/.8)]
        dark:[--start-1:hsl(var(--color-pri-darker))]
        dark:[--end-1:hsl(var(--color-pri-base)/.9)]

        [--start-2:transparent]
        [--end-2:hsl(var(--color-pri-base)/.6)]
        dark:[--start-2:rgba(255,204,239,.1)]
        dark:[--end-2:hsl(var(--color-pri-base)/.8)]

        mix-blend-darken
        dark:mix-blend-lighten

        max-sm:![mask-size:300vw_200px]
        max-sm:![mask-position:center_calc(100%-100px)]

        sm:max-lg:![mask-origin:bottom]
        sm:max-lg:![mask-size:250%_300px]
        sm:max-lg:![mask-position:center_calc(100%-30px)]

        max-lg:rotate-180
      "
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        maskPosition: "center 260px",
        WebkitMaskPosition: "center 260px",
        maskSize: "200% 100%",
        WebkitMaskSize: "200% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskOrigin: "top",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(180deg,var(--start-1)_0%,var(--end-1)_200%)]"
        oddClassName="bg-[linear-gradient(180deg,var(--start-2)_0%,var(--end-2)_200%)]"
      />
    </div>
  )
}
