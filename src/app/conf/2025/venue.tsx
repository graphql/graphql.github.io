import {
  BusFront,
  ExternalLink,
  SquareParking,
  TicketsPlane,
} from "lucide-react"
import Link from "next/link"

const HOTELS = [
  {
    name: "Mövenpick Hotel Amsterdam City Centre",
    link: "https://movenpick.accor.com/en/europe/netherlands/amsterdam/hotel-amsterdam.html?utm_source=google&utm_medium=local&utm_campaign=hotel-MHR-Amsterdam-city-center&y_source=1_MTUzNjI2OTgtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D",
    description: `Piet Heinkade 11\n1019 BR Amsterdam, Netherlands\nPhone: <a class="hover:text-primary underline" href="tel:+31 20 519 1200">+31 20 519 1200</a>`,
  },
  {
    name: "Inntel Hotels Amsterdam Landmark",
    link: "https://www.inntelhotelsamsterdamlandmark.nl/",
    description: `VOC-kade 600\n1018 LG Amsterdam, Netherlands\n Phone: <a class="hover:text-primary underline" href="tel:+31 20 227 2550">+31 20 227 2550</a>`,
  },
  {
    name: "DoubleTree by Hilton Amsterdam Central Station",
    link: "https://www.hilton.com/en/hotels/amscsdi-doubletree-amsterdam-centraal-station/?SEO_id=GMB-EMEA-DI-AMSCSDI",
    description: `Oosterdoksstraat 4 \n1011 DK Amsterdam, Netherlands\nPhone: <a class="hover:text-primary underline" href="tel:+31 20 530 0800">+31 20 530 0800</a>`,
  },
]

const HOW_TO_GET_TO_VENUE = [
  {
    title: "Public Transportation",
    description:
      'Take tram 26 from Amsterdam Central Station to the "Rietlandpark" stop. The venue is a 5-minute walk from there.',
    icon: <BusFront size={20} />,
  },
  {
    title: "Airport Information",
    description:
      "Amsterdam Airport Schiphol is about 20 km from the venue. Take a direct train to Amsterdam Central Station, then follow the public transportation instructions.",
    icon: <TicketsPlane size={20} />,
  },
  {
    title: "Parking at venue",
    description: `Limited parking is available at the venue. We recommend using public transportation when possible. Learn more about parking at <a class="hover:text-primary underline" href="https://dezwijger.nl/about-us-en/contact" target="_blank">Pakhuis de Zwijger</a>. If you require an accessible parking spot, park at Vriesseveem 4 or Withoedenveem 16 where you can park if you have a Disability Parking Card.`,
    icon: <SquareParking size={20} />,
  },
]

export function Venue() {
  return (
    <section>
      <h1 className="mb-4 text-5xl font-bold">Venue</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">Conference</h2>
          <address className="not-italic">
            <strong>
              <Link
                className="underline hover:text-primary"
                target="_blank"
                href="https://dezwijger.nl/"
              >
                Pakhuis De Zwijger
              </Link>
            </strong>
            <br /> Piet Heinkade 179, 1019 HC <br />
            Amsterdam, Netherlands
          </address>
          <div className="flex flex-col gap-2">
            <h3 className="mt-4 text-xl font-semibold">
              How to get to the venue?
            </h3>
            {HOW_TO_GET_TO_VENUE.map(({ title, description, icon }) => (
              <div key={title}>
                <div className="flex flex-row items-center gap-4">
                  {icon}
                  <h5 className="text-lg">{title}</h5>
                </div>
                <p
                  className="ml-9 max-w-96"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl">Hotel Information</h2>
          <p className="mt-2">
            The Linux Foundation has not contracted rooms at these properties
            and cannot guarantee rates or availability.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {HOTELS.map(hotel => (
              <address className="not-italic" key={hotel.name}>
                <strong>
                  <a
                    className="flex items-center gap-1 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    href={hotel.link}
                  >
                    {hotel.name}
                    <ExternalLink size={14} />
                  </a>
                </strong>
                <span
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: hotel.description }}
                />
              </address>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
