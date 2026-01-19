import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import { Accordion } from "@/app/conf/_design-system/accordion"

import locationPhoto from "./location-photo.webp"

export interface VenueProps extends React.HTMLAttributes<HTMLElement> {}

export function Venue(props: VenueProps) {
  return (
    <section
      {...props}
      style={{
        ...({ "--photo": `url(${locationPhoto.src})` } as {}),
        ...props.style,
        backgroundBlendMode: "overlay, normal",
      }}
      className={clsx(
        "gql-section relative bg-[linear-gradient(0deg,hsl(var(--color-sec-light))_0%,hsl(var(--color-sec-light))_100%),var(--photo)] dark:bg-[linear-gradient(180deg,#344303_0%,#344303_120%),var(--photo)] md:bg-cover",
        props.className,
      )}
    >
      <div className="relative flex gap-x-12 gap-y-10 bg-white/10 p-4 dark:bg-blk/10 max-lg:flex-col lg:p-16 xl:*:flex-1">
        <div
          className="absolute inset-0 backdrop-blur-3xl"
          style={{
            maskImage:
              "radial-gradient(circle at center, #fff 65%, rgb(255 0 0/.8) 99%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, #fff 65%, rgb(255 0 0/.8) 99%)",
          }}
        />
        <article className="relative flex shrink-0 flex-col gap-6 max-xl:max-w-[476px]">
          {/*
          <h2 className="typography-h2">
            A place of innovation &&nbsp;creation
          </h2>
          <p className="typography-body-lg">
            A former warehouse, located in an industrial area near the Amsterdam
            city centre, changed into a place of culture & business.
          </p>
          <div className="flex-1" />
          */}
          <p className="typography-body-lg">Menlo Park, California</p>
          {/*
          <Button href="https://maps.app.goo.gl/W7nX1NejhWw9PqxF7">
            Google Maps
          </Button>
          */}
        </article>
        {/*
        <div className="relative flex-1">
          <h3 className="typography-h3 mb-6">How to get to the venue?</h3>
          <Accordion
            className="[&_svg]:fill-neu-900"
            items={[
              {
                title: "Public Transportation",
                description: (
                  <>
                    Take tram 26 from Amsterdam Central Station to the
                    "Kattenburgerstraat" stop.
                    <br />
                    The venue is in front of the tram stop.
                  </>
                ),
              },
              {
                title: "Airport Information",
                description:
                  "Amsterdam Airport Schiphol is about 20 km from the venue. Take a direct train to Amsterdam Central Station, then follow the public transportation instructions.",
              },
              {
                title: "Parking at venue",
                description: (
                  <>
                    Limited parking is available at the venue. We recommend
                    using public transportation when possible. Learn more about
                    parking at{" "}
                    <a
                      className="typography-link"
                      href="https://dezwijger.nl/about-us-en/contact"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pakhuis de Zwijger
                    </a>
                    . If&nbsp;you require an accessible parking spot, park at
                    Vriesseveem 4 or Withoedenveem 16 where you can park if you
                    have a Disability Parking Card.
                  </>
                ),
              },
            ]}
          />
          <h3 className="typography-h3 my-6">Where to stay?</h3>
          <Accordion
            className="[&_svg]:fill-neu-900"
            items={[
              {
                title: "Mövenpick Hotel Amsterdam City Centre",
                link: "https://movenpick.accor.com/en/europe/netherlands/amsterdam/hotel-amsterdam.html?utm_source=google&utm_medium=local&utm_campaign=hotel-MHR-Amsterdam-city-center&y_source=1_MTUzNjI2OTgtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D",
                description: (
                  <>
                    Piet Heinkade 11
                    <br />
                    1019 BR Amsterdam, Netherlands
                    <br />
                    Phone:{" "}
                    <a className="typography-link" href="tel:+31 20 519 1200">
                      +31 20 519 1200
                    </a>
                  </>
                ),
              },
              {
                title: "Inntel Hotels Amsterdam Landmark",
                link: "https://www.inntelhotelsamsterdamlandmark.nl/",
                description: (
                  <>
                    VOC-kade 600
                    <br />
                    1018 LG Amsterdam, Netherlands
                    <br />
                    Phone:{" "}
                    <a className="typography-link" href="tel:+31 20 227 2550">
                      +31 20 227 2550
                    </a>
                  </>
                ),
              },
              {
                title: "DoubleTree by Hilton Amsterdam Central Station",
                link: "https://www.hilton.com/en/hotels/amscsdi-doubletree-amsterdam-centraal-station/?SEO_id=GMB-EMEA-DI-AMSCSDI",
                description: (
                  <>
                    Oosterdoksstraat 4 <br />
                    1011 DK Amsterdam, Netherlands
                    <br />
                    Phone:{" "}
                    <a className="typography-link" href="tel:+31 20 530 0800">
                      +31 20 530 0800
                    </a>
                  </>
                ),
              },
            ]}
          />
        </div>
        */}
      </div>
    </section>
  )
}
