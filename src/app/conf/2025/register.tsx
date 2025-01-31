import { InfoGrid } from "../_components/info-grid"

export function Register() {
  return (
    <section>
      <InfoGrid
        id="register"
        title="Register"
        subtitle="Join a diverse community of GraphQL developers, architects, and enthusiasts while experiencing premium content and networking opportunities in a vendor-neutral environment. We never sell attendee lists or contact information, nor do we authorize others to do so. If you receive an email claiming to sell an attendee list for a Linux Foundation event, please forward it to events@linuxfoundation.org."
        listItems={[
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
            description: `A registration link was shared in an email to your company's sponsorship contact. Please reach out to your company’s sponsorship contact if you need to register as a Sponsor. For further questions, please email <a href="mailto:graphql_events@linuxfoundation.org">graphql_events@linuxfoundation.org</a>.`,
          },
          {
            title: "Media",
            description: `If you are a member of the media interested in attending this event and have not received a complimentary access code to attend, contact us at <a href="mailto:graphql_events@linuxfoundation.org">graphql_events@linuxfoundation.org</a>.`,
          },
        ]}
      />

      <div className="mt-10">
        <h2 className="mb-4 text-5xl font-bold text-white">Rates</h2>
        <p>The registraion deadlines is 23:59 on the respective date.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-2">
          {[
            { title: "Early Bird", dates: "Through 13 July", price: "$599" },
            { title: "Standard", dates: "14 July - 31 August", price: "$799" },
            {
              title: "Late",
              dates: "1 September - 10 September",
              price: "$899",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="w-full flex-shrink-0 snap-start items-center justify-center border border-primary p-6 text-center text-white shadow-lg lg:w-full lg:max-w-sm"
            >
              <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
              <time>{item.dates}</time>
              <p className="mt-2 text-3xl font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="https://cvent.me/PBNYEe?utm_source=graphql_conf_2025&utm_medium=website&utm_campaign=register_section"
          target="_blank"
          rel="noreferrer"
          className="bg-primary/85 px-20 py-4 text-center text-3xl font-semibold transition-colors hover:bg-primary/100 md:px-28"
        >
          Get Tickets
        </a>
      </div>
    </section>
  )
}
