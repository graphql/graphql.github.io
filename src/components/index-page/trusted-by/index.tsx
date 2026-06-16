import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"

import MetaLockup from "./logos/Meta.svg?svgr"
import IBMWordmark from "./logos/IBM.svg?svgr"
import AirBnBLockup from "./logos/AirBnB.svg?svgr"
import IntuitWordmark from "./logos/Intuit.svg?svgr"
import AWSLogo from "./logos/AWS.svg?svgr"
import PayPalWordmark from "./logos/PayPal.svg?svgr"
import NewYorkTimesWordmark from "./logos/NewYorkTimes.svg?svgr"
import StarbucksWordmark from "./logos/Starbucks.svg?svgr"
import ShopifyLockup from "./logos/Shopify.svg?svgr"
import ShopifyMonotoneLockup from "./logos/ShopifyMonotone.svg?svgr"
import GitHubLockup from "./logos/GitHub.svg?svgr"

import styles from "./style.module.css"

const logos: LogoListItem[] = [
  {
    href: "https://meta.com",
    alt: "Meta",
    component: MetaLockup,
  },
  {
    href: "https://aws.amazon.com",
    alt: "AWS",
    component: props => (
      <AWSLogo
        {...props}
        className={clsx(props.className, "h-[48px] sm:w-[110px]")}
      />
    ),
  },
  // todo: Netflix?
  // {
  //   href: "https://netflix.com",
  //   alt: "Netflix",
  //   component: NetflixWordmark,
  // },
  {
    href: "https://airbnb.com",
    alt: "Airbnb",
    component: AirBnBLockup,
  },
  {
    href: "https://intuit.com",
    alt: "Intuit",
    component: IntuitWordmark,
  },

  {
    href: "https://ibm.com",
    alt: "IBM",
    component: props => (
      <IBMWordmark {...props} className={clsx(props.className, "w-[140px]")} />
    ),
  },

  {
    href: "https://paypal.com",
    alt: "PayPal",
    component: PayPalWordmark,
  },
  {
    href: "https://nytimes.com",
    alt: "New York Times",
    component: NewYorkTimesWordmark,
  },
  {
    href: "https://starbucks.com",
    alt: "Starbucks",
    component: StarbucksWordmark,
  },
  {
    href: "https://shopify.com",
    alt: "Shopify",
    component: ({ className, ...rest }) => (
      <div
        role="img"
        className={clsx(styles.shopify, "relative size-full flex-col")}
      >
        <ShopifyLockup
          className="size-full opacity-0 group-hover:opacity-100 group-focus:opacity-100"
          {...rest}
        />
        <ShopifyMonotoneLockup
          className="absolute inset-0 size-full opacity-100 group-hover:opacity-0 group-focus:opacity-0"
          {...rest}
        />
      </div>
    ),
  },
  {
    href: "https://github.com",
    alt: "GitHub",
    component: GitHubLockup,
  },
]

export function TrustedBy() {
  return (
    <section className="gql-section gql-container bg-neu-0 py-8 lg:py-16 xl:py-24">
      <div className="flex flex-wrap justify-between gap-6">
        <h2 className="typography-h3 max-w-[474px] text-neu-800">
          GraphQL is open source and trusted by the industry
        </h2>
        <p className="typography-body-md max-w-[624px] text-neu-700">
          Facebook's mobile apps have been powered by GraphQL since 2012. The
          GraphQL specification was open-sourced in 2015. Now it is used by
          industry-leading companies worldwide and supported by the GraphQL
          Foundation, hosted since 2018 by the non-profit Linux Foundation.
        </p>
      </div>
      <div
        className={clsx(
          "gql-radial-gradient my-6 grid grid-cols-2 justify-center gap-px md:my-12 md:grid-cols-5 xl:my-16",
          styles.logos,
        )}
      >
        {logos.map(({ alt, href, component: Component }) => (
          <a
            key={alt}
            aria-label={alt}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex shrink-0 items-center justify-center bg-neu-0 p-10 *:z-[1] before:absolute before:inset-2 hover:before:bg-neu-100/50 focus-visible:z-[1] dark:hover:before:bg-[#202219]"
          >
            <Component className="size-full" />
          </a>
        ))}
      </div>

      <Button href="/users" className="mx-auto w-fit">
        More GraphQL users
      </Button>
    </section>
  )
}

interface LogoListItem {
  href: string
  alt: string
  component: React.FC<{ className?: string }>
}
