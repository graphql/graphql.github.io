import { Metadata } from "next"
import { HostedByGraphQLFoundation } from "@/icons"
import { Sponsors } from "./sponsors"
import { Rubik } from "next/font/google"
import GridButton from "../_components/grid-button"
import { InfoGrid } from "../_components/info-grid"

const rubik = Rubik({
  weight: ["700", "600", "500", "400", "300"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GraphQLConf 2025 — Sept 08-10",
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

      <div className="container flex gap-20 flex-col pt-24">
        <div className="flex gap-12 lg:gap-24 max-md:flex-col">
          <div className="flex flex-col gap-5 text-white flex-1">
            <h2 className="text-3xl lg:text-[45px]/[4rem] font-[400]">
              Celebrating 10 Years of GraphQL. Three transformative days of
              expert insights and innovation to shape the next decade of APIs
              together!
            </h2>
            <GridButton
              title="Get Tickets"
              href="https://cvent.me/PBNYEe?utm_source=graphql_conf_2025&utm_medium=website&utm_campaign=cta"
            />
          </div>
        </div>
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
            className="relative z-0 px-28 py-4 text-white text-3xl font-semibold bg-primary hover:bg-primary flex items-center justify-center gap-2"
          >
            Get Tickets
          </a>
        </div>
      </div>
    </main>
  )
}
