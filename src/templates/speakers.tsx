import React, { FC, useEffect, useState } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { keynoteSpeakers } from "../components/Conf/Speakers"
import Speaker, { SchedSpeaker } from "../components/Conf/Speakers/Speaker"
import { PageProps } from "gatsby"

const SpeakersTemplate: FC<PageProps<{}, { speakers: SchedSpeaker[] }>> = ({
  pageContext: { speakers: speakersData },
}) => {
  const [speakers, setSpeakers] = useState<SchedSpeaker[]>([])

  useEffect(() => {
    const keynoteNames = keynoteSpeakers.map(speaker => speaker.name)

    // create an array for keynote speakers in fetched data maintaining the order in keynoteSpeakers
    const keynoteSpeakersData = keynoteNames
      .map(name => {
        return speakersData.find(
          (speaker: any) =>
            speaker.name === name
        )
      })
      .filter(Boolean) as SchedSpeaker[]

    const otherSpeakersData = speakersData.filter(
      (speaker: any) =>
        !keynoteNames.includes(speaker.name)
    )

    // Sort other speakers by last name alphabetically
    otherSpeakersData.sort((a: any, b: any) => {
      const aLastName = a.name.split(" ").slice(-1)[0].toLowerCase()
      const bLastName = b.name.split(" ").slice(-1)[0].toLowerCase()

      return aLastName.localeCompare(bLastName)
    })

    setSpeakers([...keynoteSpeakersData, ...otherSpeakersData])
  }, [])

  return (
    <LayoutConf>
      <HeaderConf />

      <div className="bg-white">
        <div className="prose lg:prose-lg mx-auto py-10 px-6 lg:px-0 override-prose-w-with-85ch">
          <h1>GraphQLConf 2023 Speakers</h1>
          <p>
            Meet the unique lineup of insightful speakers we've carefully
            chosen, who are primed to share their groundbreaking ideas and
            innovative practices in the realm of GraphQL at the conference.
          </p>
        </div>
        <section className="override-prose-w-with-85ch mx-auto max-lg:px-4 px-0 mt-8 flex flex-wrap gap-5 lg:justify-between justify-center">
          {speakers.length ? (
            speakers.map((speaker: any) => (
              <Speaker key={speaker.id} {...speaker} />
            ))
          ) : (
            <p className="text-center w-screen my-0 mb-20">
              Loading Speakers...
            </p>
          )}
        </section>
      </div>
      <FooterConf includePartners={false} includeSponors={false} />
    </LayoutConf>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 Speakers" />
}

export default SpeakersTemplate
