import type { PageProps } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import React, { useState, Fragment } from "react"
import Layout from "../components/Layout"
import Marked from "../components/Marked"
import Seo from "../components/Seo"
import { toSlug } from "../utils/slug"

interface ILibrary {
  description: string
  github?: string
  npm?: string
  howto: string
  name: string
  sourcePath: string
  url: string
  gem?: string
  lastRelease?: string
  formattedLastRelease?: string
  stars?: number
  formattedStars?: string
  license?: string
}

interface Language {
  name: string
  totalStars: number
  categoryMap: {
    Client: ILibrary[]
    Server: ILibrary[]
  }
}

interface Tool {
  name: string
  totalStars: number
  categoryMap: {
    Supergraphs: ILibrary[]
    General: ILibrary[]
  }
}

interface PageContext {
  languageList: Language[]
  toolList: Tool[]
  otherLibraries: {
    Services: ILibrary[]
    Tools?: ILibrary[]
  }
  sourcePath: string
}

export function Library({ data }: { data: ILibrary }) {
  const [overflown, setOverflown] = useState(false)
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="library-info">
      <div className="library-details">
        <a
          className="library-name"
          href={data.url}
          target="_blank"
          rel="noreferrer"
        >
          <p>{data.name}</p>
        </a>
        {data.github && (
          <div className="library-detail">
            <b>GitHub</b>
            <a
              href={`https://github.com/${data.github}`}
              target="_blank"
              rel="noreferrer"
            >
              {data.github}
            </a>
          </div>
        )}
        {data.npm && (
          <div className="library-detail">
            <b>npm</b>
            <a
              href={`https://www.npmjs.com/package/${data.npm}`}
              target="_blank"
              rel="noreferrer"
            >
              {data.npm}
            </a>
          </div>
        )}
        {data.gem && (
          <div className="library-detail">
            <b>gem</b>
            <a
              href={`https://rubygems.org/gems/${data.gem}`}
              target="_blank"
              rel="noreferrer"
            >
              {data.gem}
            </a>
          </div>
        )}
        {data.lastRelease && (
          <div className="library-detail">
            <b>Last Release</b>
            <span>{data.formattedLastRelease}</span>
          </div>
        )}
        {data.stars && (
          <div className="library-detail">
            <b>Stars</b>
            <span>{data.formattedStars}</span>
          </div>
        )}
        {data.license && (
          <div className="library-detail">
            <b>License</b>
            <span>{data.license}</span>
          </div>
        )}
        {data.howto ? (
          <div className="library-description">
            <Marked>{data.description}</Marked>
          </div>
        ) : (
          <br />
        )}
      </div>
      <div className="library-howto">
        <div
          className={`library-howto-content ${
            expanded ? "expanded" : "not-expanded"
          }`}
          ref={el => {
            if (el && !overflown) {
              setOverflown(el.clientHeight < el.scrollHeight)
            }
          }}
        >
          <Marked>{data.howto || data.description}</Marked>
        </div>
        {overflown && (
          <div
            className={`library-howto-expand ${
              expanded ? "expanded" : "not-expanded"
            }`}
            onClick={() => setExpanded(true)}
          >
            <img
              src="/img/downarrow.svg"
              className="library-howto-expand-anchor"
            />
          </div>
        )}
      </div>
    </div>
  )
}

const categorySlugMap = [
  ["Server", toSlug("Server")],
  ["Client", toSlug("Client")],
  ["Tools", toSlug("Tools")],
  ["Supergraphs", toSlug("Supergraphs")],
  ["General", toSlug("General")],
]

export function LibraryList({ data }: { data: ILibrary[] }) {
  return (
    <div className="library-list">
      {data.map(library => (
        <Library key={library.name} data={library} />
      ))}
    </div>
  )
}

interface ToolsListProps {
  pageContext: PageContext
  type: "General" | "Supergraphs"
}

export function ToolsList({ pageContext, type }: ToolsListProps) {
  return (
    <>
      <h3 className="library-category-title">{type}</h3>
      <div>
        {pageContext.toolList.map(tool => (
          <div
            key={tool.name}
            id={toSlug(tool.name)}
            className="language-content"
          >
            {Object.entries(tool.categoryMap).map(
              ([categoryName, data]) =>
                categoryName === type && <LibraryList data={data} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default ({ pageContext }: PageProps<{}, PageContext>) => {
  return (
    <Layout className="code" pageContext={pageContext}>
      <div className="code-hero">
        <div className="code-hero-inner">
          <h1>Code</h1>
          <p>using GraphQL</p>
        </div>
      </div>
      <section>
        <div className="documentationContent">
          <div className="inner-content">
            <div className="intro-note">
              <p>
                Because GraphQL is a communication pattern, there are many tools
                to help you get started working which support GraphQL in all
                sorts of languages.
              </p>
              <div className="goto-section">
                <p>Go to</p>
                <div className="sections">
                  <AnchorLink to="#language-support" title="Language Support">
                    <h3>Language Support</h3>
                  </AnchorLink>
                  <AnchorLink to="#generic-tools" title="Tools">
                    <h3>Tools</h3>
                  </AnchorLink>
                  <AnchorLink to="#services" title="Services">
                    <h3>Services</h3>
                  </AnchorLink>
                </div>
              </div>
            </div>
            <p id="language-support" className="languages-title">
              Language Support
            </p>
            <div className="language-boxes">
              {pageContext.languageList
                ?.map(language => language?.name!)
                .filter(Boolean)
                .map(languageName => {
                  const slug = toSlug(languageName)
                  return (
                    <AnchorLink
                      to={`#${slug}`}
                      className="article language-box"
                      title={languageName}
                    >
                      <span className="article_title">{languageName}</span>
                    </AnchorLink>
                  )
                })}
            </div>
            <div className="languages-content">
              {pageContext.languageList.map(lang => {
                const languageName = lang.name
                const libraryCategories = lang.categoryMap
                const filteredCategorySlugMap = categorySlugMap.filter(
                  ([libraryCategoryName]) =>
                    libraryCategories[
                      libraryCategoryName as "Client" | "Server"
                    ]?.length
                )
                const languageSlug = toSlug(languageName)
                return (
                  <div className="language-content" id={languageSlug}>
                    <div className="language-header">
                      <h2 className="language-title">{languageName}</h2>
                      {filteredCategorySlugMap.length > 1 && (
                        <p className="language-categories-permalinks">
                          {filteredCategorySlugMap.map(
                            ([libraryCategoryName, categorySlug], i) => (
                              <Fragment key={libraryCategoryName}>
                                <AnchorLink
                                  title={`${languageSlug} ${categorySlug}`}
                                  className="language-category-permalink"
                                  to={`#${languageSlug}-${categorySlug}`}
                                >
                                  {libraryCategoryName}
                                </AnchorLink>
                                {i < filteredCategorySlugMap.length - 1 &&
                                  " / "}
                              </Fragment>
                            )
                          )}
                        </p>
                      )}
                    </div>
                    <div className="library-categories">
                      {filteredCategorySlugMap.map(
                        ([categoryName, categorySlug]) =>
                          categoryName in libraryCategories && (
                            <div
                              id={`${languageSlug}-${categorySlug}`}
                              className="library-category"
                            >
                              <h3 className="library-category-title">
                                {categoryName}
                              </h3>
                              <LibraryList
                                data={
                                  libraryCategories[
                                    categoryName as "Client" | "Server"
                                  ]
                                }
                              />
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <h2>
              <a className="anchor" id="generic-tools"></a>
              Tools
              <AnchorLink className="hash-link" to="#generic-tools">
                #
              </AnchorLink>
            </h2>
            <ToolsList pageContext={pageContext} type="General" />
            <ToolsList pageContext={pageContext} type="Supergraphs" />
            <h2>
              <a className="anchor" id="services"></a>
              Services
              <AnchorLink className="hash-link" to="#services">
                #
              </AnchorLink>
            </h2>
            <LibraryList data={pageContext.otherLibraries?.Services ?? []} />
          </div>
        </div>
        <p>
          Want to improve this page? See the{" "}
          <a href="https://github.com/graphql/graphql.github.io/blob/source/notes/ContributingToCodePage.md">
            docs here
          </a>
          .
        </p>
      </section>
    </Layout>
  )
}

export function Head() {
  return <Seo title="GraphQL Code Libraries, Tools and Services" />
}
