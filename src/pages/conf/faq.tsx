import React, { ReactNode } from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SectionConf from "../../components/Conf/Section"
import SeoConf from "../../components/Conf/Seo"

const faq: Array<{ id: string; title: string; contents: ReactNode }> = [
  {
    id: "contact",
    title: "Contact Us",
    contents: (
      <p>
        Answers to many common questions are readily available on this event’s
        website. If you cannot find the answer to your question, you are welcome
        to contact us by emailing{" "}
        <a href="mailto:graphql_events@linuxfoundation.org">
          graphql_events@linuxfoundation.org
        </a>
        .
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    contents: (
      <p>
        We never sell attendee lists or contact information, nor do we authorize
        others to do so. If you receive an email claiming to sell an attendee
        list for a Linux Foundation event, please forward it to{" "}
        <a href="mailto:events@linuxfoundation.org">
          events@linuxfoundation.org
        </a>
        .
      </p>
    ),
  },
  {
    id: "codeofconduct",
    title: "Code of Conduct",
    contents: (
      <>
        <p>
          The GraphQL Foundation and the Linux Foundation are dedicated to
          providing a harassment-free experience for participants at all of our
          events, whether they are held in person or virtually. GraphQLConf is a
          working conference intended for professional networking and
          collaboration within the open source community. It exists to encourage
          the open exchange of ideas and expression and requires an environment
          that recognizes the inherent worth of every person and group. While at
          GraphQLConf or related ancillary or social events, any participants,
          including members, speakers, attendees, volunteers, sponsors,
          exhibitors, booth staff and anyone else, should not engage in
          harassment in any form.
        </p>
        <p>
          This Code of Conduct may be revised at any time by The GraphQL
          Foundation or The Linux Foundation and the terms are non-negotiable.
          Your registration for or attendance at GraphQL, whether in person or
          virtually, indicates your agreement to abide by this policy and its
          terms.
        </p>
        <p>
          Please read the full{" "}
          <a
            href="https://events.linuxfoundation.org/about/code-of-conduct/"
            target="_blank"
          >
            Code of Conduct
          </a>{" "}
          for the complete policy and terms.
        </p>
      </>
    ),
  },
  {
    id: "dni",
    title: "Diversity & Inclusion",
    contents: (
      <>
        <p>
          Education and collaboration are vital to the future of the open source
          ecosystem, and it is imperative to us that everyone in the community
          that wants to participate feels welcome to do so regardless of gender,
          gender identity, sexual orientation, disability, race, ethnicity, age,
          religion or economic status. Our{" "}
          <a href="#codeofconduct">code of conduct</a> outlines our expectations
          for all those who participate in our community, as well as the
          consequences for unacceptable behavior.
        </p>
        <p>
          We offer diversity and need based{" "}
          <a href="#scholarships">scholarships</a> and have considered a broad
          range of both <a href="#onsite-resources">onsite resources</a> and{" "}
          <a href="#emergency-resources">emergency resources</a> as well as a{" "}
          <a href="#health-and-safety">health &amp; safety</a> policy.
        </p>
        <p>
          If you have ideas on how we can create a more inclusive event, please
          do not hesitate to let us know. Contact Emily Ruf, Senior Event
          Manager, at{" "}
          <a href="mailto:eruf@linuxfoundation.org">eruf@linuxfoundation.org</a>
          .
        </p>
      </>
    ),
  },
  {
    id: "health-and-safety",
    title: "Health & Safety",
    contents: (
      <>
        <em>Updated March 29, 2023</em>

        <p>
          Our attendees’ health and safety remain our top priority as we
          continue to monitor COVID-19 and look to local, CDC and WHO guidelines
          to make the best and most informed decisions around onsite safety and
          requirements.
        </p>

        <h3>In-Person Attendance Requirements</h3>
        <h4>Masks</h4>
        <p>Masks are recommended, but not required, to be worn at the event.</p>

        <h4>Vaccine Or Negative Covid-19 Test Requirement</h4>
        <p>
          At this time, proof of vaccine or a negative COVID test is NOT
          required to attend the event in person.
        </p>

        <p>
          All in-person attendance requirements are subject to change based on
          local guidelines. Registered attendees will be notified 1 month prior
          to the event of any updates to our mask mandate and other on-site
          health & safety requirements.
        </p>

        <h3>Onsite Health & Safety Measures</h3>
        <p>Please expect the following measures to be in place at the event.</p>
        <ul className="list-disc">
          <li>Event signage indicating required health and safety protocols</li>
          <li>Onsite cleaning and sanitizing of all touch points</li>
          <li>Sanitized microphones between each speaker’s use</li>
          <li>
            Plentiful sanitation stations onsite and personal hand sanitizer
            bottles and wipes available for participants
          </li>
          <li>
            Wearable Indicators of Social Distance Comfort Levels — We will
            provide a wearable indicator of social distance comfort levels for
            event participants to wear onsite (optional but encouraged).
            Participants are asked to be respectful of each other’s comfort
            level on social distance.
          </li>
          <li>
            The Linux Foundation does not allow firearms or other weapons,
            regardless of whether they are permitted or not, or whether they are
            concealed or not, to be brought into our events. By registering for
            the event, you are agreeing that you understand this policy and will
            not bring a firearm or other weapons into the event.
          </li>
        </ul>

        <p>
          At a minimum, we will be following all mandated venue, municipality,
          and CDC guidelines. This list, and all protocols, are subject to
          change should there be a change if local municipality and health
          agency guidelines indicate or require that they should change. We will
          do everything we can to provide any updates as early as possible.
        </p>

        <h3>The United States COVID-Related Entry Requirements</h3>
        <p>
          If you are traveling to the United States, review the entry
          requirements from your country of origin here. With the ever-changing
          COVID-19 guidelines, we highly suggest visiting{" "}
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/international-travel-during-covid19.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Ftravelers%2Finternational-travel%2Findex.html"
            target="_blank"
          >
            the CDC website
          </a>{" "}
          regularly for the most up-to-date information as your trip nears.
          Changes and updates are typically marked at the top of the page. Read
          carefully to ensure you have the most recent information regarding
          travel rules and regulations based on your country of origin. The
          requirements may change so continue to check back regularly.
        </p>

        <h3>What should I do if I am onsite and not feeling well?</h3>

        <p>
          If you aren’t feeling well, please watch for COVID-19 symptoms.
          Depending on your symptoms and how unwell you feel, please take an
          at-home COVID test (we highly recommend traveling with your own tests)
          or go to the nearest testing facility, urgent care, or hospital.
        </p>

        <p>
          If you have chest pain or shortness of breath, we advise you to call
          911 or go directly to the Emergency Room.
        </p>

        <h4>Should you end up testing positive for COVID:</h4>
        <ul className="list-disc">
          <li>
            Follow the guidance of the testing facility, urgent care, or
            hospital that you visited in order to best protect yourself, as well
            as the community.
          </li>
          <li>
            Please follow the guidance of the testing facility, urgent care, or
            hospital that you visited in order to best protect yourself, as well
            as the community. The facility at which you test positive will
            notify the Department of Health if deemed necessary by local
            guidelines for contact tracing purposes.
          </li>
          <li>You will not be able to return to the event.</li>
          <li>
            Email Angela Brown, SVP & GM of Events, at{" "}
            <a href="mailto:angela@linuxfoundation.org">
              angela@linuxfoundation.org
            </a>
            , to let us know. While we will need to let event participants know
            that someone onsite tested positive for COVID-19, we will not
            disclose your name.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "invoices",
    title: "Invoices & Certificates of Attendance",
    contents: (
      <>
        <h3>Registration Invoices</h3>
        <p>
          Invoice receipts are downloadable from the confirmation email you
          received after registering under the Payment Receipt Information
          section. If the downloadable invoice receipt does not meet your needs
          or you need to have your confirmation email resent, please submit your
          request{" "}
          <a
            href="https://docs.google.com/forms/d/1uxCqF-ieG9QmpU8tl3HqgatHLY9FWhRs7KLpyhZA5KI/edit"
            target="_blank"
          >
            here
          </a>
          . Please include any additional customization you need for your
          invoice receipt in the request.
        </p>

        <h3>Certificates of Attendance</h3>
        <p>
          To request a Certificate of Attendance, please submit a request{" "}
          <a
            href="https://docs.google.com/forms/d/1RpI8h6AGK2rCl3aIlyEY0D6fU3tsZ5yr1Ba6c3h6p9Y/edit"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <p>
          Please Note: We verify attendance through the registration system, and
          Certificate of Attendance letters are sent out after the event is
          completed.
        </p>
      </>
    ),
  },
  {
    id: "emergency-resources",
    title: "Emergency Resources",
    contents: (
      <>
        <h3>Taxi</h3>
        <p>Allied Yellow Cab</p>
        <p>650-579-7000</p>

        <h3>Closest Police Station</h3>
        <p>
          <a
            href="https://www.burlingame.org/departments/police_department/index.php"
            target="_blank"
          >
            Burlingame Police Department
          </a>
        </p>
        <p>650-777-4100</p>
        <p>Dial 911 for Emergencies</p>

        <h3>24-Hour Hospital</h3>
        <p>
          <a
            href="https://www.sutterhealth.org/find-location/facility/mills-peninsula-medical-center"
            target="_blank"
          >
            Mills-Peninsula Medical Center
          </a>
        </p>
        <p>
          1501 Trousdale Drive
          <br />
          Burlingame, CA 94010
        </p>
        <p>650-696-5400</p>
        <p>Dial 911 for Emergencies or Ambulance</p>
        <p>
          9-minute drive from venue
          <br />
          43-minute walk from venue (2.1 miles)
        </p>

        <h3>Urgent Care</h3>
        <p>
          <a
            href="https://www.gohealthuc.com/dignity/locations/san-bruno?utm_source=gmb&utm_medium=organic&utm_content=dignity-sanbruno"
            target="_blank"
          >
            Dignity Health – GoHealth Urgent Care
          </a>
        </p>
        <p>
          1310 El Camino Real Ste I-J
          <br />
          San Bruno, CA 94066
        </p>
        <p>650-270-2395</p>
        <p>9-minute drive from venue (5 miles)</p>

        <h3>Pharmacy</h3>
        <p>
          <a
            href="https://www.walgreens.com/topic/promotion/covid-testing.jsp"
            target="_blank"
          >
            Walgreens
          </a>{" "}
          (drive-thru COVID-19 testing)
        </p>
        <p>
          45 S. El Camino Real
          <br />
          Millbrae, CA 94030
        </p>
        <p>800-925-4733</p>
        <p>
          6-minute drive from venue
          <br />
          39-minute walk from venue (1.9 miles)
        </p>

        <h3>24 Hour Rape Crisis Line</h3>
        <p>
          <a
            href="https://divisionoftraumarecoveryservices.org/rtc-casarc/help-now-2/"
            target="_blank"
          >
            Division of Trauma Recovery Services
          </a>
        </p>
        <p>
          San Francisco Women Against Rape 24-Hour Crisis Line: 415-647-RAPE
          (7272)
        </p>
      </>
    ),
  },
  {
    id: "onsite-resources",
    title: "Onsite Resources",
    contents: (
      <>
        <h3>Nursing Room</h3>
        <p>
          A private nursing room will be available at the event to aid in the
          comfort and accessibility for our nursing attendees. The room will be
          available all days of the event and will be located onsite. For
          location information, please check with registration or information
          desk staff onsite.
        </p>

        <h3>Venue Accessibility</h3>
        <p>
          If you need any assistance locating an elevator, or have other
          questions about accessibility onsite, please speak to a member of the
          LF event staff at any of the registration or information desks onsite.
          If you have questions prior to the event, please email
          <a href="mailto:graphql_events@linuxfoundation.org">
            graphql_events@linuxfoundation.org
          </a>
          .
        </p>

        <h3>Wheelchair & Medical Equipment Rental</h3>
        <p>
          If you need a wheelchair or scooter, you can rent them from{" "}
          <a href="http://baycitymedicalsupplies.com/" target="_blank">
            Bay City Medical Supplies
          </a>
          . Please contact them directly for rates and availability.
        </p>

        <h3>Zen Zone</h3>
        <p>
          All attendees are invited to use the Zen Zone as needed for sensory
          relaxation, meditation, and worship. It is a physical space where
          conversation and interaction are not allowed, where attendees can go
          if, for any reason, they can’t interact with other attendees at that
          time.
        </p>

        <h3>Communication Stickers</h3>
        <p>
          At Registration, attendees can pick up communication stickers to add
          to their badges. Communication stickers indicate an attendee’s
          requested level of interaction with both other attendees and press
          (including photographers and videographers).
        </p>

        <ul>
          <li>Green = Open to communicate.</li>
          <li>Yellow = Only if you know me, please.</li>
          <li>
            Red = I’m not interested in communicating (or being videotaped or
            photographed) at this time.
          </li>
        </ul>
        <p>Please be respectful of attendee communication preferences.</p>

        <h3>Interaction Pins</h3>
        <p>
          Please be mindful of attendee’s pins throughout the conference and use
          this tool to communicate appropriately:
        </p>
        <ul>
          <li>
            Green = Handshakes and high 5’s are welcome with frequent
            handwashing.
          </li>
          <li>Yellow = Still being cautious, elbow bumps only.</li>
          <li>Red = No contact at all, please remain 6 feet away.</li>
        </ul>
        <p>
          Don’t see a pin? Assume red until given permission from the other
          attendee.
        </p>

        <h3>Share your Pronouns</h3>
        <p>
          Pick up a pronoun sticker from registration to share your pronouns
          with other conference attendees. Please be respectful of attendees’
          pronouns.
        </p>

        <h3>First Aid/Medical Assistance</h3>
        <p>
          If you require first aid or medical assistance, please visit our
          registration desk or the venue front desk. For emergencies, please
          dial 911.
        </p>

        <h3>How to Handle a Harassment Report</h3>
        <p>
          If you are being harassed, notice that someone else is being harassed,
          or have any other concerns, please contact a member of the event staff
          immediately. Event staff can be identified by staff badges and/or
          shirts onsite and can be found at the event registration counter at
          any time. Our staff has had incident response training, responds to
          harassments reports and does so in accordance with the process
          recommended by the Ada Initiative, which can be found on{" "}
          <a
            href="https://geekfeminism.wikia.org/wiki/Conference_anti-harassment/Responding_to_reports"
            target="_blank"
          >
            the Geek Feminism Wiki
          </a>
          .
        </p>

        <p>
          Conference staff will be happy to help participants contact
          hotel/venue security or local law enforcement, provide escorts, or
          otherwise assist those experiencing harassment to feel safe for the
          duration of the conference.
        </p>
        <p>
          If you are planning to attend and have concerns regarding another
          individual who may be present, please reach out to us pre-event.
          Precautions will be taken to ensure a victim’s comfort and safety,
          including, but not limited to providing an escort, prepping onsite
          event staff, keeping victim and harasser from attending the same
          talks/social events and providing onsite contact cell phone numbers
          for immediate contact.
        </p>

        <h3>The Linux Foundation Contacts:</h3>
        <p>
          Emily Ruf, Senior Event Manager (
          <a href="mailto:eruf@linuxfoundation.org">eruf@linuxfoundation.org</a>
          )
        </p>
        <p>
          Angela Brown, SVP & General Manager of Events (+1-575-694-2263;
          <a href="mailto:angela@linuxfoundation.org">
            angela@linuxfoundation.org
          </a>
          )
        </p>
      </>
    ),
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    contents: (
      <>
        <h3>Cancellations</h3>
        <p>
          If you must cancel for any reason, please{" "}
          <a href="https://cvent.me/4zbxz9" target="_blank">
            sign back into your registration
          </a>
          , click the “Register/Modify” button and select “Unregister.” If you
          need further assistance, email{" "}
          <a href="mailto:registration@linuxfoundation.org">
            registration@linuxfoundation.org
          </a>
          .
        </p>
        <p>
          Refunds will only be issued for cancellations received two weeks prior
          to the event start date, including bulk ticket request refunds, and
          will appear as a credit on the card’s statement 7 – 10 business days
          after cancellation. Due to the ongoing pandemic, individual refund
          requests due to COVID-19 positive tests will be honored up until the
          start date of the event, and must be accompanied by a photo of a
          positive COVID-19 test.
        </p>
        <p>
          Please note: Refunds can only be issued on the card the original
          payment was made.
        </p>
        <h3>Substitutions</h3>
        <p>
          If you are unable to attend, you may substitute another attendee in
          lieu of cancellation. To substitute an attendee,{" "}
          <a href="https://cvent.me/4zbxz9" target="_blank">
            sign back into your registration
          </a>
          , click the “Register/Modify”, and select “Transfer Registration” on
          your confirmation page.
        </p>
      </>
    ),
  },
  {
    id: "registration-types",
    title: "Other Registration Types",
    contents: (
      <>
        <h3>Scholarships</h3>
        <p>
          For information about scholarship opportunities, please{" "}
          <a href="#scholarships">click here</a>.
        </p>

        <h3>Speakers</h3>
        <p>
          You should have received a registration link in your acceptance email.
          If you did not, please contact{" "}
          <a href="mailto:cfp@linuxfoundation.org">cfp@linuxfoundation.org</a>{" "}
          for more details.
        </p>

        <h3>Sponsors</h3>
        <p>
          A registration link was shared in an email to your company’s
          sponsorship contact. Please reach out to your company’s sponsorship
          contact if you need to register as a Sponsor. For further questions,
          please email{" "}
          <a href="mailto:sponsors@linuxfoundation.org">
            sponsors@linuxfoundation.org
          </a>
          .
        </p>

        <h3>Media</h3>
        <p>
          If you are a member of the media interested in attending this event
          and have not received a complimentary access code to attend, please
          contact{" "}
          <a href="mailto:events@linuxfoundation.org">
            events@linuxfoundation.org
          </a>{" "}
          and a member of our PR team will be in touch.
        </p>
      </>
    ),
  },
  {
    id: "scholarships",
    title: "Scholarships",
    contents: (
      <>
        <p>
          The Linux Foundation’s Registration Scholarship program exists to
          support individuals who may not otherwise have the opportunity to
          attend Linux Foundation events in two categories:
        </p>

        <h3>Diversity Scholarships</h3>
        <p>
          Applicants must be from a traditionally underrepresented and/or
          marginalized group in the technology and/or open source communities
          who are unable to attend without some financial assistance. Including,
          but not limited to: persons identifying as LGBTQIA+, women, persons of
          color, and/or persons with disabilities.
        </p>

        <h3>Need-based Scholarships</h3>
        <p>
          Individuals who apply should be active members of the open source
          community who are unable to attend for financial reasons and are
          unable to get funding from their companies.
        </p>

        <p>
          Registration Scholarship recipients will receive a complimentary
          registration pass. Registration Scholarships are awarded based on a
          combination of need and impact. Selection will be made by an assembled
          group of reviewers who will assess each applicant’s request.
        </p>
        <p>
          Receipt of a scholarship does not, on its own, guarantee entry to the
          event. Recipients need to adhere to The Linux Foundation{" "}
          <a href="#health-and-safety">Health and Safety</a> rules and
          regulations or the scholarship is null and void.
        </p>
        <p>
          Applicants can be approved for up to 2 (two) Registration Scholarships
          per calendar year.
        </p>
        <ul className="list-disc">
          <li>Application Deadline — Friday, July 21, 2023 11:59 PM PST</li>
          <li>Notifications — Week of August 7, 2023</li>
        </ul>
        <ButtonConf href="https://forms.gle/PwgWSTJ872Pce9XW6">
          Apply for a Scholarship
        </ButtonConf>
      </>
    ),
  },
  {
    id: "visas",
    title: "Visa Letter Request",
    contents: (
      <p>
        If you require a visa letter to attend GraphQLConf, please read the
        instructions and then fill and submit the{" "}
        <a
          href="https://events.linuxfoundation.org/about/visa-request/"
          target="_blank"
        >
          form to request a visa
        </a>
        .
      </p>
    ),
  },
]

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="bg-white">
        <div className="prose lg:prose-lg mx-auto py-10 max-sm:px-4">
          <h1>GraphQLConf FAQ</h1>
          <ul className="md:columns-2 max-lg:p-0 max-lg:m-0 list-none">
            {faq.map(q => (
              <li key={q.id} className="md:mt-0 md:mb-2">
                <a href={`#${q.id}`}>{q.title}</a>
              </li>
            ))}
          </ul>
          {faq.map(q => (
            <SectionConf key={q.id} id={q.id} title={q.title}>
              {q.contents}
            </SectionConf>
          ))}
        </div>
      </div>
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 FAQ Frequently Asked Questions" />
}
