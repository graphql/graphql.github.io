import React from "react"
import SocialIcons from "../SocialIcons"
import SponsorsConf from "../Sponsors"
import PartnersConf from "../Partners"

const links = [
  [
    { text: "Speakers", href: "/conf/#speakers" },
    { text: "Schedule", href: "/conf/#schedule" },
  ],
  [
    { text: "FAQ", href: "/conf/faq/" },
    { text: "Contact Us", href: "/conf/faq/#contact" },
  ],
  [
    { text: "GraphQL", href: "/" },
    { text: "GraphQL Foundation", href: "/foundation/" },
    { text: "Code of Conduct", href: "/conf/faq/#codeofconduct" },
    { text: "Diversity & Inclusion", href: "/conf/faq/#dni" },
  ],
]

const FooterConf = ({ includeSponors = true }) => {
  return (
    <>
      {includeSponors && <SponsorsConf />}
      <footer className="text-white bg-[#0e031c]">
        <div className="container flex max-sm:flex-col gap-10 max-md:justify-between">
          <div className="md:w-1/3">
            <a href="/conf/">
              <img
                src="/img/conf/graphql-conf-logo.svg"
                className="w-[200px]"
              />
            </a>
          </div>
          <div className="flex max-md:flex-col justify-between md:grow">
            {links.map((link, i) => (
              <div key={i}>
                <div className="list-none mb-10 md:mb-20">
                  {link.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-white font-semibold text-base hover:text-white hover:font-semibold hover:underline"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container flex max-lg:flex-col justify-between">
          <p className="text-white text-sm ">
            Copyright © {new Date().getFullYear()} The GraphQL Foundation. All
            rights reserved.
            <br />
            For web site terms of use, trademark policy and general project
            policies please see
            <a href="https://lfprojects.org" target="_blank">
              https://lfprojects.org
            </a>
            .
          </p>
          <SocialIcons />
        </div>
      </footer>
    </>
  )
}

export default FooterConf
