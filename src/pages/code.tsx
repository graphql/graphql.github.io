import React from "react"
import Layout from "../components/Layout"
import Marked from "../components/Marked"
import { toSlug } from "../utils/slug"

export function buildLanguagesMenu(pageContext: any) {
  let lastRow: string[]
  const rows: string[][] = []
  pageContext.languageList.forEach(({ name: languageName }: any, index: number) => {
    if (index % 6 === 0) {
      lastRow = [languageName]
      rows.push(lastRow)
    } else {
      lastRow.push(languageName)
    }
  })
  return (
    <div>
      {rows.map(row => (
        <>
          <div className="container-bl language-boxes">
            {row.map(languageName => {
              const slug = toSlug(languageName)
              return (
                <div className="article language-box">
                  <a href={`#${slug}`} className="article_title">
                    {languageName}
                  </a>
                </div>
              )
            })}
          </div>
          <br />
        </>
      ))}
    </div>
  )
}

export function buildLibraryList(libraries: any[], pageContext: any) {
  return (
    <div className="library-list">
      {libraries.map(library => (
        <div className="library-info">
          <div className="library-details">
            <a className="library-name" href={library.url} target="_blank">
              <p>{library.name}</p>
            </a>
            {library.github && (
              <div className="library-detail">
                <b>GitHub</b>
                <a
                  href={`https://github.com/${library.github}`}
                  target="_blank"
                >
                  {library.github}
                </a>
              </div>
            )}
            {library.npm && (
              <div className="library-detail">
                <b>npm</b>
                <a
                  href={`https://www.npmjs.com/package/${library.npm}`}
                  target="_blank"
                >
                  {library.npm}
                </a>
              </div>
            )}
            {library.gem && (
              <div className="library-detail">
                <b>gem</b>
                <a
                  href={`https://rubygems.org/gems/${library.gem}`}
                  target="_blank"
                >
                  {library.gem}
                </a>
              </div>
            )}
            {library.lastRelease && (
              <div className="library-detail">
                <b>Last Release</b>
                <span>{library.formattedLastRelease}</span>
              </div>
            )}
            {library.stars && (
              <div className="library-detail">
                <b>Stars</b>
                <span>{library.formattedStars}</span>
              </div>
            )}
            {library.license && (
              <div className="library-detail">
                <b>License</b>
                <span>{library.license}</span>
              </div>
            )}
            {library.howto ? (
              <div className="library-description">
                <Marked pageContext={pageContext}>{library.description}</Marked>
              </div>
            ) : (
              <br />
            )}
          </div>
          <div className="library-howto">
            <Marked pageContext={pageContext}>
              {library.howto || library.description}
            </Marked>
          </div>
        </div>
      ))}
    </div>
  )
}

export function buildLibraryCategoryContent(
  libraryCategories: any[],
  libraryCategoryName: string,
  slug: string,
  pageContext: any
) {
  if (libraryCategoryName in libraryCategories) {
    const libraries = libraryCategories[libraryCategoryName as any]
    return (
      <div id={slug} className="library-category">
        <h3 className="library-category-title">{libraryCategoryName}</h3>
        {buildLibraryList(libraries, pageContext)}
      </div>
    )
  }
  return
}

const categorySlugMap = [
  ["Server", toSlug("Server")],
  ["Client", toSlug("Client")],
  ["Tools", toSlug("Tools")],
]

export function buildLanguagesContent(pageContext: any) {
  const elements = []
  for (const languageObj of pageContext.languageList) {
    const languageName = languageObj.name;
    const libraryCategories = languageObj.categoryMap;
    const filteredCategorySlugMap = categorySlugMap.filter(
      ([libraryCategoryName]) =>
        libraryCategories[libraryCategoryName as any]?.length
    );
    const languageSlug = toSlug(languageName);
    elements.push(
      <div className="language-content" id={languageSlug}>
        <div className="language-header">
          <h2 className="language-title">{languageName}</h2>
          {filteredCategorySlugMap.length > 1 && <p className="language-categories-permalinks">
            {filteredCategorySlugMap.map(
              ([libraryCategoryName, categorySlug], i) => (
                <>
                  <a
                    className="language-category-permalink"
                    href={`#${languageSlug}-${categorySlug}`}
                  >
                    {libraryCategoryName}
                  </a>
                  {i < filteredCategorySlugMap.length - 1 && " / "}
                </>
              )
            )}
          </p>}
        </div>
        <div className="library-categories">
          {filteredCategorySlugMap.map(([categoryName, categorySlug]) =>
            buildLibraryCategoryContent(
              libraryCategories,
              categoryName,
              `${languageSlug}-${categorySlug}`,
              pageContext
            )
          )}
        </div>
      </div>
    )
  }
  return <div className="languages-content">{elements}</div>
}

export default ({ pageContext }: any) => {
  return (
    <Layout title="Code" className="code" pageContext={pageContext}>
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
              <strong>
                Because GraphQL is a communication pattern, there are many tools
                to help you get started working which support GraphQL in all
                sorts of languages.
              </strong>
              <div className="goto-section">
                <p>Go to</p>
                <div className="sections">
                  <a href="#language-support">
                    <h3>Language Support</h3>
                  </a>
                  <a href="#generic-tools">
                    <h3>Tools</h3>
                  </a>
                  <a href="#services">
                    <h3>Services</h3>
                  </a>
                  <a href="#more-stuff">
                    <h3>More Stuff</h3>
                  </a>
                </div>
              </div>
            </div>

            <p className="languages-title">Language Support</p>
            {buildLanguagesMenu(pageContext)}
            {buildLanguagesContent(pageContext)}
            <h2>
              <a className="anchor" id="generic-tools"></a>
              Tools
              <a className="hash-link" href="#generic-tools">
                #
              </a>
            </h2>
            {buildLibraryList(pageContext.otherLibraries.Tools, pageContext)}
            <h2>
              <a className="anchor" id="services"></a>
              Services
              <a className="hash-link" href="#services">
                #
              </a>
            </h2>
            {buildLibraryList(pageContext.otherLibraries.Services, pageContext)}
            <h2>
              <a className="anchor" id="more-stuff"></a>
              More Stuff
              <a className="hash-link" href="#more-stuff">
                #
              </a>
            </h2>
            {buildLibraryList(
              pageContext.otherLibraries["More Stuff"],
              pageContext
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
