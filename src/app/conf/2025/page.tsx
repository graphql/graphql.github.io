import { Metadata } from "next"
import { HostedByGraphQLFoundation } from "@/icons"
import { Sponsors } from "./sponsors"
import { Rubik } from "next/font/google"
import GridButton from "../_components/grid-button"
import { InfoGrid } from "../_components/info-grid"
import {
  BusFront,
  TicketsPlane,
  SquareParking,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import styles from "./index.module.css"
import clsx from "clsx"

const rubik = Rubik({
  weight: ["700", "600", "500", "400", "300"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GraphQLConf 2025 — Sept 08-10",
}

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

function Venue() {
  return (
    <section className="container pb-24 text-white">
      <h1 className="text-5xl font-bold mb-4">Venue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl">Conference</h2>
          <p>
            <strong>Pakhuis De Zwijger</strong>
            <br /> Piet Heinkade 179, 1019 HC <br />
            Amsterdam, Netherlands
          </p>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl mt-4 font-semibold">
              How to get to the venue?
            </h3>
            {HOW_TO_GET_TO_VENUE.map(({ title, description, icon }) => (
              <div key={title}>
                <div className="flex flex-row items-center gap-4">
                  {icon}
                  <h5 className="text-lg">{title}</h5>
                </div>
                <p className="max-w-96 ml-9">{description}</p>
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
                    className="hover:underline flex items-center gap-1"
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

const FAQS = [
  {
    question: "When will speakers and the agenda be announced?",
    answer:
      "Stay tuned to our social media channels and website for updates on speakers and the agenda.",
  },
  {
    question: "Can I sponsor the event?",
    answer:
      'Yes! We offer various sponsorship packages. See <a href="#sponsors">this</a> section for more information.',
  },
  {
    question: "Are there group discounts for teams?",
    answer:
      'If you have a group of 5 or more people, you can receive a 10% discount on all passes. All pass types must be the same, and all registrations must be processed under one group registration and must be paid with the same credit card. To create a group, select “Add Another Person” to your registration. When 5 or more people are added the 10% discount will be automatically applied. <a href="mailto:registration@linuxfoundation.org">Contact us</a> for any questions.',
  },
  {
    question: "What is the refund and cancellation policy?",
    answer: `If you must cancel for any reason, please sign back into your registration, click the “Register/Modify” button and select “Unregister.” If you need further assistance, <a href="mailto:registration@linuxfoundation.org">contact us</a>.<br/><br/>Refunds will only be issued for cancellations received two weeks prior to the event start date, including bulk ticket request refunds, and will appear as a credit on the card's statement 7-10 business days after cancellation. Individual refund requests for late cancellations due to sickness or emergency will be considered on a case by case basis - <a href="mailto:registration@linuxfoundation.org">contact us</a>.<br/><br/>Refunds can only be issued on the card the original payment was made.`,
  },
  {
    question: "Can I transfer my registration?",
    answer:
      "If you are unable to attend, you may substitute another attendee in lieu of cancellation. To substitute an attendee, sign back into your registration, click the “Register/Modify”, and select “Transfer Registration” on your confirmation page.",
  },
  {
    question: "Can I get certificate of attendance?",
    answer:
      'To request a Certificate of Attendance, please submit a request <a target="blank" href="https://docs.google.com/forms/d/1RpI8h6AGK2rCl3aIlyEY0D6fU3tsZ5yr1Ba6c3h6p9Y/viewform?edit_requested=true">here</a>. Please Note: We verify attendance through the registration system, and Certificate of Attendance letters are sent out after the event is completed.',
  },
  {
    question: "Cannot find the answer to your question?",
    answer:
      'You are welcome to email us <a href="mailto:graphqlconf@graphql.org">graphqlconf@graphql.org</a>.',
  },
]

function FAQSection() {
  return (
    <div id="faq" className={clsx("text-white py-16 px-4 md:px-8", styles.faq)}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="select-none text-4xl md:text-5xl font-bold mb-4">
            Frequently
            <br />
            Asked Questions
          </h2>
          <p className="text-sm select-none">
            PLEASE CONTACT{" "}
            <a
              href="mailto:graphqlconf@graphql.org"
              className="text-primary hover:underline uppercase select-text"
            >
              graphqlconf@graphql.org
            </a>
          </p>
        </div>

        <div>
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group border-b border-white/10 border-dashed"
            >
              <summary className="py-6 flex items-center justify-start gap-2 text-left cursor-pointer list-none focus:outline-none">
                <ArrowRight className="shrink-0 size-5 transition-transform duration-200 group-hover:translate-x-1 group-open:rotate-90" />
                <span className="text-lg select-none">{faq.question}</span>
              </summary>
              <p
                className="pb-6 ml-7 -mt-4 text-gray-300 whitespace-pre-wrap [&>a]:underline"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main
      style={{
        fontFamily: rubik.style.fontFamily,
      }}
    >
      <div className="conf-hero-2025 relative">
        <div className="container h-full py-16 md:py-28 flex flex-col justify-center">
          <div className="flex items-center justify-center flex-col">
            <h1
              style={{
                fontSize: "min(calc(10px + 80vw / 12), 150px)",
                fontWeight: "bold",
                fontFamily: rubik.style.fontFamily,
              }}
            >
              GraphQLConf <span className="font-light">2025</span>
            </h1>
            <HostedByGraphQLFoundation className="w-full shrink-0 h-8 lg:h-10 mb-6 self-start" />
            <span className={`${rubik.className} font-medium text-xl`}>
              September 08 - 10, 2025 | Amsterdam, Netherlands
            </span>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-px bg-white/10"
          aria-hidden="true"
        ></div>
      </div>

      <div className="container text-white flex flex-col mt-14 gap-14 md:mt-20 md:gap-20">
        <h2 className="text-3xl lg:text-5xl font-normal">
          Celebrating 10 Years of GraphQL. Three transformative days of expert
          insights and innovation to shape the next decade of APIs together!
        </h2>
        <GridButton
          title="Get Tickets"
          href="https://cvent.me/PBNYEe?utm_source=graphql_conf_2025&utm_medium=website&utm_campaign=cta"
        />
      </div>

      <Sponsors />

      <GridButton
        id="speakers"
        title="Notify Me About Speaking"
        href="https://forms.gle/jRsE2u8pokLX93RGA"
      />

      <div className="container py-24">
        <InfoGrid
          id="register"
          title="Register"
          subtitle="Join a diverse community of GraphQL developers, architects, and enthusiasts while experiencing premium content and networking opportunities in a vendor-neutral environment."
          listItems={[
            {
              title: "Corporate",
              description:
                "The Corporate Registration type is for registrants whose company is paying for their attendance. This includes for-profit companies. You will help keep the conference affordable for everyone, especially students and those needing financial aid.",
            },
            {
              title: "Individuals",
              description:
                "The Individual Registration type is for registrants who are currently not working for a company, work for a non-profit or research institution or are attending at their own expense. You will receive confirmation within five business days of registering if your individual registration is approved or needs additional information.",
            },
            {
              title: "Academics",
              description: `Academics registrations are for current full-time students and faculty members. Full-time faculty and students will need to upload a valid copy of their Faculty or Student ID when registering. If you have any questions, please email <a href="mailto:graphql_events@linuxfoundation.org">graphql_events@linuxfoundation.org</a>`,
            },
            {
              title: "Speakers",
              description: `You should have received a registration link in your acceptance email. If you did not, please contact <a href="mailto:cfp@linuxfoundation.org">cfp@linuxfoundation.org</a> for more details.`,
            },
            {
              title: "Sponsors",
              description: `A registration link was shared in an email to your company's sponsorship contact. Please reach out to your company’s sponsorship contact if you need to register as a Sponsor. For further questions, please email <a href="mailto:events@linuxfoundation.org.">events@linuxfoundation.org.</a>`,
            },
          ]}
        />

        <div className="flex justify-center my-14">
          <a
            href="https://cvent.me/PBNYEe?utm_source=graphql_conf_2025&utm_medium=website&utm_campaign=register_section"
            target="_blank"
            rel="noreferrer"
            className="px-20 md:px-28 py-4 text-center text-white text-3xl font-semibold bg-primary/85 hover:bg-primary/100 transition-colors"
          >
            Get Tickets
          </a>
        </div>
      </div>

      <Venue />

      <FAQSection />
    </main>
  )
}
