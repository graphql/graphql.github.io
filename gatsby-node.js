const path = require("path")
const { readFileSync } = require("fs")
const sortLibs = require("./scripts/sort-libraries")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  let context = {
    ...page.context,
    sourcePath: path.relative(__dirname, page.componentPath),
  }
  if (page.path === "/code" || page.path === "/code/") {
    const codeData = JSON.parse(readFileSync("./data/code.json", "utf8"));
    await Promise.all([
      Promise.all(Object.keys(codeData.Libraries).map(async languageName => {
        const libraryCategoryMap = codeData.Libraries[languageName];
        await Promise.all(
          Object.keys(libraryCategoryMap).map(async libraryCategoryName => {
            const libraries = libraryCategoryMap[libraryCategoryName]
            libraryCategoryMap[libraryCategoryName] = await sortLibs(libraries)
          })
        )
      })),
      sortLibs(codeData.Tools).then(sortedTools => {
        codeData.Tools = sortedTools;
      }),
    ])

    context = {
      ...context,
      codeData,
    }
  }
  createPage({
    ...page,
    context,
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(/* GraphQL */ `
    query {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            parent {
              ... on File {
                relativeDirectory
                sourceInstanceName
              }
            }
            frontmatter {
              title
              permalink
              next
              category
              sublinks
              sidebarTitle
              date
            }
            id
          }
        }
      }
    }
  `)

  const docTemplate = path.resolve("./src/templates/doc.tsx")

  if (result.errors) {
    // eslint-disable-next-line no-console
    console.error(result.errors)
    throw result.errors
  }

  const { edges } = result.data.allMarkdownRemark

  let sideBardata = {}
  let pagesGroupedByFolder = {}
  const allPages = []

  await Promise.all(
    edges.map(async ({ node }) => {
      const {
        frontmatter: { permalink, next, sidebarTitle },
        parent: { relativeDirectory, sourceInstanceName },
      } = node

      if (sourceInstanceName !== "content") {
        return
      }

      if (!pagesGroupedByFolder[relativeDirectory]) {
        pagesGroupedByFolder = {
          ...pagesGroupedByFolder,
          [relativeDirectory]: [node],
        }
      } else {
        pagesGroupedByFolder = {
          ...pagesGroupedByFolder,
          [relativeDirectory]: [
            ...pagesGroupedByFolder[relativeDirectory],
            node,
          ],
        }
      }
      allPages.push({
        permalink,
        relativeDirectory,
        sidebarTitle,
        nextPermalink: next,
        sourcePath: path.relative(__dirname, node.fileAbsolutePath),
      })
    })
  )

  await Promise.all(
    Object.entries(pagesGroupedByFolder).map(async ([folder, pages]) => {
      let pagesByUrl = {}
      let previousPagesMap = {}
      let pagesByDate = pages.sort((a, b) => {
        const aDate = new Date(a.frontmatter.date || Date.now())
        const bDate = new Date(b.frontmatter.date || Date.now())
        if (aDate > bDate) {
          return -1
        } else if (aDate < bDate) {
          return 1
        }
        return 0
      })

      await Promise.all(
        pagesByDate.map(async page => {
          const {
            frontmatter: { permalink, next },
          } = page
          if (next) {
            previousPagesMap[next] = permalink
          }
          pagesByUrl[permalink] = page
        })
      )

      let firstPage = null

      await Promise.all(
        pagesByDate.map(async page => {
          const {
            frontmatter: { permalink },
          } = page

          if (!previousPagesMap[permalink] && !firstPage) {
            firstPage = page
            return
          }
        })
      )

      if (!firstPage) {
        throw new Error(`First page not found in ${folder}`)
      }

      let categoriesMap = {}
      let currentCategory = null

      let page = firstPage
      let i = 0
      while (page && i++ < 1000) {
        const { frontmatter } = page
        const {
          category: definedCategory,
          next: definedNextPageUrl,
        } = frontmatter
        let category = definedCategory || folder
        if (!currentCategory || category !== currentCategory.name) {
          if (currentCategory) {
            if (!(currentCategory.name in categoriesMap)) {
              categoriesMap[currentCategory.name] = currentCategory
            }
          }
          currentCategory = {
            name: category,
            links: [],
          }
        }
        currentCategory.links.push(page)
        if (definedNextPageUrl) {
          page = pagesByUrl[definedNextPageUrl]
        } else {
          page = pagesByDate[pagesByDate.indexOf(page) + 1]
        }
        if (currentCategory.links.includes(page)) {
          page = null
        }
      }

      if (!(currentCategory.name in categoriesMap)) {
        categoriesMap[currentCategory.name] = currentCategory
      }

      sideBardata[folder] = Object.values(categoriesMap);
    })
  )

  await Promise.all(
    allPages.map(async page => {
      createPage({
        path: `${page.permalink}`,
        component: docTemplate,
        context: {
          permalink: page.permalink,
          nextPermalink: page.nextPermalink,
          sideBarData: sideBardata[page.relativeDirectory],
          sourcePath: page.sourcePath,
        },
      })
    })
  )
}
