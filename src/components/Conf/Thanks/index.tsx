import React from "react"

const ThanksConf: React.FC = () => {
  return (
    <div className="bg-white mb-5">
      <div className="container px-3 py-6 mx-auto">
        <h1 className="text-center text-4xl text-[#171E26] mb-10 font-bold">
          Thank you for Attending!
        </h1>
        <h2 className="text-center text-lg mt-2 mb-10">
          Thank you to all who joined us for GraphQLConf 2023! We look forward
          to seeing you at future events
        </h2>
        <div className="flex flex-wrap ">
          <div className="p-4 md:w-1/2 w-full rounded-2xl">
            <div className="h-full bg-gray-100 p-8 rounded">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 8L16 12L22 16V8Z"
                  stroke="#f827a3"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H14C15.1046 18 16 17.1046 16 16V8C16 6.89543 15.1046 6 14 6Z"
                  stroke="#f827a3"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>
                To experience the best of this year’s event, be sure to watch
                session recordings, available on the{" "}
                <a href="https://www.youtube.com/@GraphQLFoundation">
                  GraphQL Foundation YouTube Channel.
                </a>
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/2 w-full rounded-2xl">
            <div className="h-full bg-gray-100 p-8 rounded">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="50" height="50" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use xlinkHref="#image0_45_8" transform="scale(0.02)" />
                  </pattern>
                  <image
                    id="image0_45_8"
                    width="50"
                    height="50"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACMElEQVR4nO2Zv0scQRTHpzCmScQmAbUIyN2849qUFlbpYyWkjijR5L8Iol1KIUF977C4PyIBD6PCKZZWRsKlsTx/zLOaMOucXM5Vdu/mcjM4Xxg4ZmeO9+E77+3bXSGiPBVL/M5AOrBRuwsy+KC6GveCiEDEjwaEAxsiBaQ26KA498Dt/JZ5Is4aXwT5T+LoiGfi6EiOXk1JumCJu6qES7pcHRYhOsIdNV4BHV7C1ni3AQ8cREl6zxL/3PzGA9fOsCsQXfjyVAF9ZKC95CjZVrp9n3GiDWYx2VeuPmOJp7226ewC5LK4MaGAjtL6nc59qliZS+Yk7nYPgtvOQawTFgJ/K6D5NJA7uSKpKRyKewVhwE/22kkriTtAarkbu0GAKMB9M38tK7O5/9QrEInnZr5Z+Paic22WJPUm2ZWkppnX8PV529pa1rzwJtkZaM9Wobf37VWwuXCzhn6KPol7dqSES/a+cKxfrY+mlWYGalhHPjiM3XH5LVeHTdvRguEizegCjZxP4strqLxjSb/stbp+vfZE9Ens5IYIW+MtmPTcwPpFicbS9nqT7P84I3HR5IGpZEk1k7RjjtNDTniT7L6II4hn4uiIZ+LoiGfi6EjojrDnQ2QACeA7CTp9fM4k31uexwOip38MKaCV2xYfaMXMidCkJK6mPK+sitDEQGdJ8CV8cyUrUxbmTIQmtu9+DUQbSEOEJgW4nHK0PovQpJOXFbhsnWkYiH59/IkSHuovyCnYiMTNoH0AAAAASUVORK5CYII="
                  />
                </defs>
              </svg>

              <p>
                Review session slides from speakers who provided them via the{" "}
                <a href="https://graphqlconf23.sched.com/overview/area/Yes">
                  event schedule.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThanksConf
