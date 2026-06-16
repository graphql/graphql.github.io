export function WhyAttendSection() {
  return (
    <section className="gql-section xl:py-12">
      <h3 className="typography-h2 mb-12">Why attend GraphQL Day?</h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Real-World Talks"
          description="Hear how teams actually use GraphQL — what worked, what didn't, and what they'd do differently."
        />
        <Card
          title="Cross-Community"
          description="FOST brings together GraphQL, AsyncAPI, OpenAPI, and JSON Schema communities. Learn across boundaries."
        />
        <Card
          title="Open Source"
          description="Meet library maintainers and core contributors. Ask questions, report bugs, discuss roadmaps."
        />
        <Card
          title="Workshops"
          description="Hands-on sessions to try new tools and techniques with guidance from the people who build them."
        />
        <Card
          title="Networking"
          description="A focused single-day format means everyone's in the same room. Easy to meet people."
        />
        <Card
          title="Free for Speakers"
          description="All speakers get a free conference ticket. Submit a talk and share what you've learned."
        />
      </div>
    </section>
  )
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <article className="flex flex-col gap-4 border border-neu-200 p-6">
      <h4 className="typography-h3">{title}</h4>
      <p className="typography-body-md text-neu-700">{description}</p>
    </article>
  )
}
