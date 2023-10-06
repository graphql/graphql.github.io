import React, { FC } from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import SeoConf from "../../components/Conf/Seo"
import GalleryConf from "../../components/Conf/Gallery"
import { Link, PageProps } from "gatsby"

const GalleryPage: FC<PageProps> = ({ path }) => {
  return (
    <LayoutConf>
      <HeaderConf className="shadow-none" />
      <div className="bg-[#F4F6F8]">
        <div className="container">
          <Tabs path={path} />
          <GalleryConf />
        </div>
      </div>
      <FooterConf includeSponors={false} />
    </LayoutConf>
  )
}

export const Tabs = ({ path }: { path: string }) => {
  return (
    <div className="text-3xl font-bold flex gap-10 pt-20 justify-center">
      <Link
        to="/conf/sessions"
        className={path === "/conf/sessions/" ? "underline" : "text-black"}
      >
        Recorded Sessions
      </Link>
      <Link
        to="/conf/gallery"
        className={path === "/conf/gallery/" ? "underline" : "text-black"}
      >
        Gallery
      </Link>
    </div>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 Gallery" />
}

export default GalleryPage
