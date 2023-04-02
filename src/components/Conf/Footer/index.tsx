import React from "react"
import SocialIcons from "../SocialIcons"

const links = [
  {
    category: "GraphQLConf",
    links: [
      { text: "GraphQLConf", href: "/conf/" },
      { text: "Speakers", href: "/conf/#speakers" },
      { text: "Venue", href: "/conf/#venue" },
    ],
  },
  {
    category: "Act now",
    links: [
      { text: "Register", href: "/conf/#register" },
      { text: "Speak", href: "/conf/speak" },
      { text: "Sponsor", href: "/conf/sponsor" },
    ],
  },
  {
    category: "FAQ",
    links: [
      { text: "FAQ", href: "/faq" },
      { text: "Code of Conduct", href: "/conf/faq/#codeofconduct" },
      { text: "Contact Us", href: "/conf/faq/#contact" },
    ],
  },
]

const FooterConf = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a href="/conf/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src="/img/conf/graphql-conf-logo.svg" className="w-[200px]" />
          </a>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {links.map((link, i) => (
            <div key={i} className="lg:w-1/4 md:w-1/2 w-full px-4">
              <nav className="list-none mb-20 ">
                {link.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-white font-semibold text-base hover:text-white hover:font-semibold cursor-pointer">
                      {link.text}
                    </a>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#862e69]">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-white text-sm text-center sm:text-left">
            <section>
              Copyright © {`${new Date().getFullYear()}`} The GraphQL
              Foundation. All rights reserved.
              <br />
              For web site terms of use, trademark policy and general project
              policies please see&nbsp;
              <a href="https://lfprojects.org" target="_blank">
                https://lfprojects.org
              </a>
              .
            </section>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start ">
            <SocialIcons />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default FooterConf
