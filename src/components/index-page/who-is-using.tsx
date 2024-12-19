import Link from "next/link"
import facebookLogo from "../../../public/users/logos/facebook.png"
import githubLogo from "../../../public/users/logos/github.png"
import pinterestLogo from "../../../public/users/logos/pinterest.png"
import intuitLogo from "../../../public/users/logos/intuit.png"
import courseraLogo from "../../../public/users/logos/coursera.png"
import shopifyLogo from "../../../public/users/logos/shopify.png"
import NextImage from "next-image-export-optimizer"
import { clsx } from "clsx"

export function WhoIsUsing() {
  return (
    <div className="index-gradient">
      <section id="whos-using">
        <div className="conf-block container flex flex-col items-center">
          <h2>Who's using GraphQL?</h2>
          <p className="text-balance text-center">
            Facebook's mobile apps have been powered by GraphQL since 2012. A
            GraphQL spec was open sourced in 2015 and is now available in many
            environments and used by teams of all sizes.
          </p>
          <div className="mb-20 mt-10 flex flex-wrap justify-center gap-10 lg:gap-16">
            {/* Waiting for permission from some of the below */}
            {[
              {
                href: "https://facebook.com",
                alt: "Facebook",
                src: facebookLogo,
              },
              {
                href: "https://docs.github.com/en/graphql",
                alt: "GitHub",
                src: githubLogo,
                className: "dark:invert",
              },
              {
                href: "https://pinterest.com",
                alt: "Pinterest",
                src: pinterestLogo,
              },
              {
                href: "https://intuit.com",
                alt: "Intuit",
                src: intuitLogo,
              },
              {
                href: "https://coursera.org",
                alt: "Coursera",
                src: courseraLogo,
              },
              {
                href: "https://shopify.com",
                alt: "Shopify",
                src: shopifyLogo,
              },
            ].map(({ alt, src, className, href }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
              >
                <NextImage
                  src={src}
                  alt={alt}
                  title={alt}
                  className={clsx("h-16 w-auto lg:h-28", className)}
                />
              </a>
            ))}
            {/** /}
             <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
             <img src="/users/logos/twitter.png" title="Twitter" className="round" />
             </a>
             {/**/}
            {/** /}
             <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer">
             <img src="/users/logos/airbnb.png" title="Airbnb" className="round" />
             </a>
             {/**/}
          </div>

          <Link href="/users" className="index-button">
            More GraphQL Users
          </Link>
        </div>
      </section>
    </div>
  )
}
