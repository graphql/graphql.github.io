import { Metadata } from "next"
import { speakers } from "@/app/conf/2024/_data"
import { Speaker } from "@/app/conf/_components/speakers/speaker"

export const metadata: Metadata = {
  title: "Speakers",
}

export default function Page() {
  return (
    <div className='bg-[url("/img/conf/golden-gate-bridge.png")] bg-contain bg-no-repeat'>
      <div className="flex w-full justify-center">
        <div className="xs:px-0 prose px-2 py-20 md:container lg:prose-lg">
          <h1 className="text-white">GraphQLConf 2024 Speakers</h1>
          <p className="text-white sm:w-2/3">
            Meet the unique lineup of insightful speakers we've carefully
            chosen, who are primed to share their groundbreaking ideas and
            innovative practices in the realm of GraphQL at the conference.
          </p>
        </div>
      </div>
      <div className="bg-white">
        <section className="conf-block container flex flex-wrap justify-center gap-8 lg:justify-between">
          {speakers.map(speaker => (
            <Speaker key={speaker.username} {...speaker} year="2024" />
          ))}
        </section>
      </div>
    </div>
  )
}
