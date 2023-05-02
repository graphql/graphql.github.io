import React from "react"
import { ReactComponent as Stellate } from "../../../../static/img/conf/Sponsors/Stellate.svg"
import { ReactComponent as Postman } from "../../../../static/img/conf/Sponsors/Postman.svg"

interface Image {
  iconPath: string
  name: string
  link: string
}

const imagesSilver: Image[] = [
  {
    iconPath: Stellate,
    name: "Stellate",
    link: "https://stellate.co/",
  },
  {
    iconPath: Postman,
    name: "Postman",
    link: "https://www.postman.com/",
  },
]

const SponsersConf = () => {
  return (
    <div className="bg-white py-10">
      <h1 className="text-center text-4xl text-[#171E26] font-bold my-8">
        Sponsors
      </h1>
      <h3 className="text-center text-[--rhodamine] font-bold mt-4 mb-10 underline underline-offset-8">
        SILVER
      </h3>
      <div className="container flex max-xl:flex-wrap justify-center gap-10">
        {imagesSilver
          .sort(function (a, b) {
            if (a.name < b.name) {
              return -1
            }
            if (a.name > b.name) {
              return 1
            }
            return 0
          })
          .map(image => (
            // eslint-disable-next-line tailwindcss/no-custom-classname
            <div key={image.name} className="zoom cursor-pointer">
              <a href={image.link}>
                <image.iconPath />
              </a>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SponsersConf
