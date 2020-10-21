const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      sourcePath: path.relative(__dirname, page.componentPath),
    },
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
  
  await Promise.all(edges.map(async ({ node }) => {
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
        [relativeDirectory]: [...pagesGroupedByFolder[relativeDirectory], node],
      }
    }
    allPages.push({
      permalink,
      relativeDirectory,
      sidebarTitle,
      nextPermalink: next,
      sourcePath: path.relative(__dirname, node.fileAbsolutePath),
    })
  }));

  await Promise.all(Object.entries(pagesGroupedByFolder).map(async ([folder, pages]) => {
    let pagesByUrl = {}
    let previousPagesMap = {}

    await Promise.all(pages.map(async (page) => {
      const {
        frontmatter: { permalink, next },
      } = page
      if (next) {
        previousPagesMap[next] = permalink
      }
      pagesByUrl[permalink] = page
    }))

    let firstPage = null

    await Promise.all(pages.map(async (page) => {
      const {
        frontmatter: { permalink },
      } = page

      if (!previousPagesMap[permalink]) {
        firstPage = page
        return
      }
    }))

    if (!firstPage) {
      throw new Error(`First page not found in ${folder}`)
    }

    let categories = []
    let currentCategory = null

    let page = firstPage
    let i = 0
    while (page && i++ < 1000) {
      const {
        frontmatter: { category, next },
      } = page
      if (!currentCategory || category !== currentCategory.name) {
        currentCategory && categories.push(currentCategory)
        currentCategory = {
          name: category,
          links: [],
        }
      }
      currentCategory.links.push(page)
      page = pagesByUrl[next]
    }

    categories.push(currentCategory)

    sideBardata[folder] = categories
  }))

  await Promise.all(allPages.map(async page => {
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
  }))
}
