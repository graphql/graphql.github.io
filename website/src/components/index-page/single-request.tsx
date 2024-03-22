import { QueryHeroFriends, ResponseHeroFriends } from "../code-blocks"
import { clsx } from "clsx"

export function SingleRequest() {
  return (
    <div
      className={clsx(
        // "bg-gray-200",
        "grayWash",
      )}
    >
      <section
        className="point2 *:w-full lg:*:w-1/2 gap-14 flex max-lg:flex-col container conf-block !justify-around [&_pre]:bg-white"
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
        <div className="app-to-server [&_pre]:w-80" aria-hidden>
          <img
            src="/img/phone.svg"
            width="496"
            height="440"
            className="phone"
          />
          <img
            src="/img/server.svg"
            width="496"
            height="440"
            className="server"
          />
          <div className="query">
            <QueryHeroFriends />
          </div>
          <div className="response">
            <ResponseHeroFriends />
          </div>
        </div>
      </section>
    </div>
  )
}
