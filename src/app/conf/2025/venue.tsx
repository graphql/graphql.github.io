import {
  BusFront,
  ExternalLink,
  SquareParking,
  TicketsPlane,
} from "lucide-react"

const HOTELS = [
  {
    name: "Mövenpick Hotel Amsterdam City Centre",
    link: "https://movenpick.accor.com/en/europe/netherlands/amsterdam/hotel-amsterdam.html?utm_source=google&utm_medium=local&utm_campaign=hotel-MHR-Amsterdam-city-center&y_source=1_MTUzNjI2OTgtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D",
    description:
      "Piet Heinkade 11\n1019 BR Amsterdam, Netherlands\nPhone: +31 20 519 1200",
  },
  {
    name: "Inntel Hotels Amsterdam Landmark",
    link: "https://www.inntelhotelsamsterdamlandmark.nl/",
    description:
      "VOC-kade 600\n1018 LG Amsterdam, Netherlands\n Phone: +31 20 227 2550",
  },
  {
    name: "DoubleTree by Hilton Amsterdam Central Station",
    link: "https://www.hilton.com/en/hotels/amscsdi-doubletree-amsterdam-centraal-station/?SEO_id=GMB-EMEA-DI-AMSCSDI",
    description:
      "Oosterdoksstraat 4 \n1011 DK Amsterdam, Netherlands\nPhone: +31 20 530 0800",
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
    description:
      "Limited parking is available at the venue. We recommend using public transportation when possible.",
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
          <p>
            <strong>Pakhuis De Zwijger</strong>
            <br /> Piet Heinkade 179, 1019 HC <br />
            Amsterdam, Netherlands
          </p>
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
                <p className="ml-9 max-w-96">{description}</p>
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
              <div key={hotel.name}>
                <strong>
                  <a
                    className="flex items-center gap-1 hover:underline"
                    href={hotel.link}
                  >
                    {hotel.name}
                    <ExternalLink size={14} />
                  </a>
                </strong>
                <p className="whitespace-pre-wrap">{hotel.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
