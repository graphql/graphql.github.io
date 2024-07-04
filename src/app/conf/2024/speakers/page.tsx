import { Metadata } from "next"
import { speakers } from "@/app/conf/2024/_data"
import { Speaker } from "@/app/conf/_components/speakers/speaker"

export const metadata: Metadata = {
  title: "Speakers",
}

export default function Page() {
  return (
    <div className='bg-[url("/img/conf/golden-gate-bridge.png")] bg-no-repeat bg-contain'>
      <div className="w-full flex justify-center">
        <div className="prose lg:prose-lg py-20 md:container px-2 xs:px-0">
          <h1 className="text-white">GraphQLConf 2024 Speakers</h1>
          <p className="text-white sm:w-2/3">
            Meet the unique lineup of insightful speakers we've carefully
            chosen, who are primed to share their groundbreaking ideas and
            innovative practices in the realm of GraphQL at the conference.
          </p>
        </div>
      </div>
      <div className="bg-white">
        <section className="container flex gap-8 flex-wrap lg:justify-between justify-center conf-block">
          {speakers.map(speaker => (
            <Speaker key={speaker.username} {...speaker} year="2024" />
          ))}
        </section>
      </div>
    </div>
  )
}
