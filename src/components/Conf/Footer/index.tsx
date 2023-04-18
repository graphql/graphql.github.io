import React from "react"
import SocialIcons from "../SocialIcons"

const links = [
  [
    { text: "Attend", href: "/conf/#attend" },
    { text: "Speakers", href: "/conf/#speakers" },
    { text: "Schedule", href: "/conf/#schedule" },
    { text: "Location", href: "/conf/#location" },
  ],
  [
    { text: "Speak", href: "/conf/speak/" },
    { text: "Sponsor", href: "/conf/sponsor/" },
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

const FooterConf = () => {
  return (
    <footer className="text-gray-600 bg-[#171E26]">
      <div className="container px-5 md:py-24 mx-auto flex md:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 shrink-0 md:mx-0 text-left">
          <a
            href="/conf/"
            className="flex font-medium md:items-center justify-start text-gray-900"
          >
            <img src="/img/conf/graphql-conf-logo.svg" className="w-[200px]" />
          </a>
        </div>
        <div className="grow flex flex-wrap justify-between lg:pl-20 -mb-10 md:mt-0 mt-10 text-left">
          {links.map((link, i) => (
            <div key={i} className="md:w-1/3 md:px-4">
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
      <div className="container px-5 mt-5 sm:mt-0 py-4 flex flex-wrap flex-col sm:flex-row">
        <p className="text-white text-sm text-center sm:text-left">
          Copyright © {`${new Date().getFullYear()}`} The GraphQL Foundation.
          All rights reserved.
          <br />
          For web site terms of use, trademark policy and general project
          policies please see&nbsp;
          <a href="https://lfprojects.org" target="_blank">
            https://lfprojects.org
          </a>
          .
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start items-start">
          <SocialIcons />
        </span>
      </div>
    </footer>
  )
}

export default FooterConf
