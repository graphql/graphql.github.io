import { AnchorLink } from "gatsby-plugin-anchor-links"
import React, { useState } from "react"
import Layout from "../components/Layout"
import Marked from "../components/Marked"
import { toSlug } from "../utils/slug"

export function buildLanguagesMenu(pageContext: any) {
  return (
    <div className="language-boxes">
      {pageContext.languageList.map(({ name: languageName }) => {
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
  )
}

export function buildLibraryContent(library: any, pageContext: any) {
  const [ overflown, setOverflown ] = useState(false);
  const [ expanded, setExpanded ] = useState(false);
  return (
    <div className="library-info">
      <div className="library-details">
        <a className="library-name" href={library.url} target="_blank">
          <p>{library.name}</p>
        </a>
        {library.github && (
          <div className="library-detail">
            <b>GitHub</b>
            <a href={`https://github.com/${library.github}`} target="_blank">
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
        <div
          className={`library-howto-content ${expanded ? 'expanded' : 'not-expanded'}`}
          ref={el => {
            if (el && !overflown) {
              setOverflown(el.clientHeight < el.scrollHeight)
            }
          }}
        >
          <Marked pageContext={pageContext}>
            {library.howto || library.description}
          </Marked>
        </div>
        {overflown && (
          <div
            className={`library-howto-expand ${expanded ? 'expanded' : 'not-expanded'}`}
            onClick={() => setExpanded(true)}>
              <img src="/img/downarrow.svg" className="library-howto-expand-anchor" />
          </div>
        )}
      </div>
    </div>
  )
}

export function buildLibraryList(libraries: any[], pageContext: any) {
  return (
    <div className="library-list">
      {libraries.map(library => buildLibraryContent(library, pageContext))}
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
    const languageName = languageObj.name
    const libraryCategories = languageObj.categoryMap
    const filteredCategorySlugMap = categorySlugMap.filter(
      ([libraryCategoryName]) =>
        libraryCategories[libraryCategoryName as any]?.length
    )
    const languageSlug = toSlug(languageName)
    elements.push(
      <div className="language-content" id={languageSlug}>
        <div className="language-header">
          <h2 className="language-title">{languageName}</h2>
          {filteredCategorySlugMap.length > 1 && (
            <p className="language-categories-permalinks">
              {filteredCategorySlugMap.map(
                ([libraryCategoryName, categorySlug], i) => (
                  <>
                    <AnchorLink
                      title={`${languageSlug} ${categorySlug}`}
                      className="language-category-permalink"
                      to={`#${languageSlug}-${categorySlug}`}
                    >
                      {libraryCategoryName}
                    </AnchorLink>
                    {i < filteredCategorySlugMap.length - 1 && " / "}
                  </>
                )
              )}
            </p>
          )}
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
    <Layout title="GraphQL Code Libraries, Tools and Services" className="code" pageContext={pageContext}>
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
            {buildLanguagesMenu(pageContext)}
            {buildLanguagesContent(pageContext)}
            <h2>
              <a className="anchor" id="generic-tools"></a>
              Tools
              <AnchorLink className="hash-link" to="#generic-tools">
                #
              </AnchorLink>
            </h2>
            {buildLibraryList(pageContext.otherLibraries.Tools, pageContext)}
            <h2>
              <a className="anchor" id="services"></a>
              Services
              <AnchorLink className="hash-link" to="#services">
                #
              </AnchorLink>
            </h2>
            {buildLibraryList(pageContext.otherLibraries.Services, pageContext)}
          </div>
        </div>
      <p>Want to improve this page? See the <a href="https://github.com/graphql/graphql.github.io/blob/source/notes/ContributingToCodePage.md">docs here</a>.</p>
      </section>
    </Layout>
  )
}
