import NextLink from "next/link"
import { ReactNode } from "react"
import { clsx } from "clsx"

import { SocialIcons } from "@/app/conf/_components/social-icons"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import blurBean from "@/app/conf/2026/components/footer/blur-bean.webp"

interface FooterLink {
  href: string
  children: ReactNode
  disabled?: boolean
}

export function Footer({
  links,
  logo,
  date,
  location,
}: {
  links: (FooterLink | FooterLink[])[]
  logo: ReactNode
  date?: ReactNode
  location?: ReactNode
}) {
  return (
    <footer className="gql-all-anchors-focusable typography-menu relative !bg-neu-100 text-neu-900 dark:!bg-neu-0 max-md:px-0 max-md:pt-0">
      <Stripes />
      <div className="flex flex-wrap justify-between gap-4 p-4 max-md:w-full md:px-6 lg:py-10 2xl:px-10">
        {logo}
        {date && location && (
          <div className="typography-body-lg flex gap-x-4 max-sm:grid max-sm:grid-cols-2 max-sm:items-start max-sm:text-lg sm:gap-y-2">
            <p className="flex items-center whitespace-pre">{date}</p>
            <address className="not-italic">{location}</address>
          </div>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-px bg-neu-400 py-px dark:bg-neu-100 lg:grid-cols-4">
        {links.map((box, i) => (
          <li className="bg-neu-100 dark:bg-neu-0 lg:h-32" key={i}>
            <FooterBox box={box} />
          </li>
        ))}
      </ul>
      <div className="relative flex justify-between gap-10 p-4 text-sm max-lg:flex-col md:px-6 2xl:px-10">
        <div className="flex flex-col font-light max-md:gap-5">
          <p>
            Copyright © {new Date().getFullYear()} The GraphQL Foundation. All
            rights reserved.
          </p>
          <p>
            For web site terms of use, trademark policy and general project
            policies please see{" "}
            <a
              href="https://lfprojects.org"
              target="_blank"
              rel="noreferrer"
              className="typography-link"
            >
              https://lfprojects.org
            </a>
            .
          </p>
        </div>
        <SocialIcons className="[&>a:focus]:text-current [&>a:focus]:ring-transparent [&>a:hover]:bg-neu-900/10 [&>a:hover]:text-current" />
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
      className="pointer-events-none absolute inset-0
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

function FooterBox({ box }: { box: FooterLink | FooterLink[] }) {
  if (Array.isArray(box)) {
    return (
      <div className="relative flex flex-col p-3">
        {box.map(link => (
          <NextLink
            key={link.href}
            href={link.href}
            title={link.disabled ? "Coming soon" : undefined}
            className={clsx(
              "gql-focus-visible block h-full p-3 first:font-bold",
              link.disabled
                ? "pointer-events-none"
                : "underline-offset-4 hover:underline",
            )}
            tabIndex={link.disabled ? -1 : undefined}
          >
            {link.children}
          </NextLink>
        ))}
      </div>
    )
  }

  const { href, children, disabled } = box

  return (
    <NextLink
      href={href}
      title={disabled ? "Coming soon" : undefined}
      className={clsx(
        "gql-focus-visible relative block h-full p-4 pb-8 md:p-6 2xl:px-10",
        disabled ? "pointer-events-none" : "underline-offset-4 hover:underline",
      )}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </NextLink>
  )
}
