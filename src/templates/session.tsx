import React, { FC } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { PageProps } from "gatsby"
import { Tabs } from "../pages/conf/gallery"
import SessionList, {
  ScheduleSession,
} from "../components/Conf/Schedule/session-list"

const SessionsTemplate: FC<
  PageProps<
    {},
    {
      schedule: ScheduleSession[]
    }
  >
> = ({ pageContext: { schedule }, path }) => {
  return (
    <LayoutConf>
      <HeaderConf className="shadow-none" />

      <div className="bg-[#F4F6F8]">
        <div className="container">
          <Tabs path={path} />
          <SessionList scheduleData={schedule} />
        </div>
      </div>
      <FooterConf includeSponors={false} />
    </LayoutConf>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 Sessions" />
}

export default SessionsTemplate
