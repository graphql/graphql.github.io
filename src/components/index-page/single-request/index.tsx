import { QueryHeroFriends, ResponseHeroFriends } from "../../code-blocks"
import { clsx } from "clsx"
import classes from "./index.module.css"
import phoneImage from "public/img/phone.svg"
import serverImage from "public/img/server.svg"
import NextImage from "next-image-export-optimizer"

export function SingleRequest() {
  return (
    <div
      className={clsx(
        // "bg-gray-200",
        "grayWash",
      )}
    >
      <section
        className="*:w-full lg:*:w-1/2 gap-14 flex max-lg:flex-col container conf-block !justify-around [&_pre]:!bg-transparent"
        id="single-request"
      >
        <div className="max-lg:text-center">
          <h2>
            Get many resources <br className="max-lg:hidden" />
            in a single request
          </h2>
          {/*Illustration: a query 2 or 3 levels deep]*/}
          <p>
            GraphQL queries access not just the properties of one resource but
            also smoothly follow references between them. While typical REST
            APIs require loading from multiple URLs, GraphQL APIs get all the
            data your app needs in a single request. Apps using GraphQL can be
            quick even on slow mobile network connections.
          </p>
        </div>
        <div
          className="-my-8 h-[520px] relative pointer-events-none"
          aria-hidden
        >
          <NextImage
            src={serverImage}
            alt="Server"
            className="absolute left-1/2 -translate-x-1/2"
          />
          <NextImage
            src={phoneImage}
            alt="Phone"
            className="absolute left-1/2 -translate-x-1/2 bottom-0"
          />
          <div className={classes.query}>
            <QueryHeroFriends />
          </div>
          <div className={classes.response}>
            <ResponseHeroFriends />
          </div>
        </div>
      </section>
    </div>
  )
}
