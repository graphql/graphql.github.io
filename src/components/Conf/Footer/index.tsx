import React from "react"
import Link from "../../Link"

interface LinkItem {
  text: string
  href: string
  icon?: string
}

interface FooterLinks {
  text?: string
  href?: string
  subsections: LinkItem[]
}

const getLinks = (): FooterLinks[] => [
  {
    subsections: [
      { text: "GraphQLConf", href: "/" },
      { text: "Speakers", href: "/#speakers" },
      { text: "Venue", href: "/#venue" },
    ],
  },
  {
    subsections: [
      // TODO: Edit the href link to the correct page
      { text: "Register", href: "/#register" },
      { text: "Speak", href: "/cfp" },
      { text: "Sponsor", href: "/PDF" },
    ],
  },
  {
    subsections: [
      // TODO: Edit the href link to the correct page
      { text: "FAQ", href: "/faq" },
      { text: "Code of Conduct", href: "/faq#codeofconduct" },
      { text: "Contact Us", href: "/faq#contact" },
    ],
  },
]

const FooterConf = () => {
  return (
    <div>
      <footer>
        <section className="sitemap">
          {getLinks().map((section, i) => (
            <div key={i}>
              <h5>
                {section.href ? (
                  <Link href={section.href}>{section.text}</Link>
                ) : (
                  <span>{section.text}</span>
                )}
              </h5>
              {section.subsections.map((subsection: any, i) => (
                <Link key={i} href={subsection.href}>
                  {subsection.icon && <img src={subsection.icon} />}
                  {subsection.text}
                </Link>
              ))}
            </div>
          ))}

          <img src="/img/conf/footer.png" height={150} />
        </section>
        <section className="copyright">
          Copyright © {`${new Date().getFullYear()}`} The GraphQL Foundation.
          All rights reserved.
          <br />
          For web site terms of use, trademark policy and general project
          policies please see&nbsp;
          <a href="https://lfprojects.org" target="_blank">
            https://lfprojects.org
          </a>
          .
        </section>
      </footer>
    </div>
  )
}

export default FooterConf
