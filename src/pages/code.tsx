import React from "react"
import Layout from "../components/Layout"
import Marked from "../components/Marked"
import { toSlug } from "../utils/slug"

export function buildLanguagesMenu(pageContext: any) {
  let lastRow: string[]
  const rows: string[][] = []
  Object.keys(pageContext.codeData.Libraries).forEach((languageName, index) => {
    if (index % 4 === 0) {
      lastRow = [languageName]
      rows.push(lastRow)
    } else {
      lastRow.push(languageName)
    }
  })
  return (
    <div className="main-block-blog">
      {rows.map(row => (
        <>
          <div className="container-bl">
            {row.map(languageName => {
              const slug = toSlug(languageName)
              return (
                <div className="column">
                  <div className="article">
                    <a href={`#${slug}`}>
                      <h3 className="article_category">
                        <img
                          src={`../img/${slug}.svg`}
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title" style={{ whiteSpace: 'nowrap' }}>{languageName}</h2>
                    </a>
                  </div>
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

export function buildLibraryListMarkdown(libraries: any[]) {
  let markdown = ""
  for (const library of libraries) {
    if ("howto" in library) {
      markdown += `#### [${library.name}](${library.url}) `
    } else {
      markdown += ` - [${library.name}](${library.url}) `
    }
    if ("github" in library) {
      markdown += `([github](https://github.com/${library.github})) `
    }
    if ("npm" in library) {
      markdown += `([npm](https://www.npmjs.com/package/${library.npm})) `
    }
    if ("gem" in library) {
      markdown += `([gem](https://rubygems.org/gems/${library.gem})) `
    }
    if ("howto" in library) {
      if (library.description) {
        markdown += "\n"
        markdown += library.description || ""
        markdown += "\n"
      }
      markdown += "\n"
      markdown += library.howto
      markdown += "\n"
    } else if (library.description) {
      markdown += ": "
      markdown += library.description || ""
    }
    markdown += "\n\n"
  }
  return markdown
}

export function buildLibraryCategoriesMarkdown(
  libraryCategories: any[],
  libraryCategoryName: string
) {
  let markdown = ""
  if (libraryCategoryName in libraryCategories) {
    markdown += `### ${libraryCategoryName}\n`
    const libraries = libraryCategories[libraryCategoryName as any]
    markdown += buildLibraryListMarkdown(libraries)
    markdown += "\n"
  }
  return markdown
}

export function buildLanguagesContent(pageContext: any) {
  let markdown = ""
  for (const languageName in pageContext.codeData.Libraries) {
    const libraryCategories = pageContext.codeData.Libraries[languageName]
    markdown += `## ${languageName}\n`
    markdown += buildLibraryCategoriesMarkdown(
      libraryCategories,
      'Server Libraries'
    )
    markdown += buildLibraryCategoriesMarkdown(
      libraryCategories,
      "GraphQL Clients"
    )
    markdown += buildLibraryCategoriesMarkdown(
      libraryCategories,
      "Tools"
    )
  }
  return <Marked pageContext={pageContext}>{markdown}</Marked>
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
              </strong>{" "}
              <div className="container-bl1">
                <div className="column">
                  <a href="#languages">
                    <h3>Languages</h3>
                  </a>
                </div>
                <div className="column">
                  <a href="#tools">
                    <h3>Tools</h3>
                  </a>
                </div>
                <div className="column">
                  <a href="#services">
                    <h3>Services</h3>
                  </a>
                </div>
                <div className="column">
                  <a href="#more-stuff">
                    <h3>More Stuff</h3>
                  </a>
                </div>
              </div>
              <Marked pageContext={pageContext}>{`
## Languages
`}</Marked>
              <p>
                This page will help you get started with GraphQL in languages
                you are already using.
              </p>
            </div>

            {buildLanguagesMenu(pageContext)}

            {buildLanguagesContent(pageContext)}
            <Marked pageContext={pageContext}>
              {`
## Tools
${buildLibraryListMarkdown(pageContext.codeData.Tools)}
`}
            </Marked>
            <Marked pageContext={pageContext}>
              {`
## Services
${buildLibraryListMarkdown(pageContext.codeData.Services)}
`}
            </Marked>
            <Marked pageContext={pageContext}>
              {`
## More Stuff
${buildLibraryListMarkdown(pageContext.codeData["More Stuff"])}
`}
            </Marked>
          </div>
        </div>
      </section>
    </Layout>
  )
}
