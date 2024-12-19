import { QueryHeroFriends, ResponseHeroFriends } from "../../code-blocks"
import classes from "./index.module.css"
import phoneImage from "public/img/phone.svg"
import serverImage from "public/img/server.svg"
import NextImage from "next-image-export-optimizer"

export function SingleRequest() {
  return (
    <section
      className="conf-block container flex !justify-around gap-14 *:w-full max-lg:flex-col lg:*:w-1/2 [&_pre]:!bg-transparent"
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
          also smoothly follow references between them. While typical REST APIs
          require loading from multiple URLs, GraphQL APIs get all the data your
          app needs in a single request. Apps using GraphQL can be quick even on
          slow mobile network connections.
        </p>
      </div>
      <div className="pointer-events-none relative -my-8 h-[520px]" aria-hidden>
        <NextImage
          src={serverImage}
          alt="Server"
          className="absolute left-1/2 -translate-x-1/2"
        />
        <NextImage
          src={phoneImage}
          alt="Phone"
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
        <div className={classes.query}>
          <QueryHeroFriends />
        </div>
        <div className={classes.response}>
          <ResponseHeroFriends />
        </div>
      </div>
    </section>
  )
}
