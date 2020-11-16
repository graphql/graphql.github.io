const path = require("path")
const sortLibs = require("./scripts/sort-libraries")
const globby = require('globby');
const frontmatterParser = require('parser-front-matter');
const { readFile } = require("fs-extra");
const { promisify } = require('util');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  let context = {
    ...page.context,
    sourcePath: path.relative(__dirname, page.componentPath),
  }
  if (page.path === "/code" || page.path === "/code/") {
    const markdownFilePaths = await globby('src/content/code/**/*.md');
    const codeData = {}
    const slugMap = require('./src/content/code/slug-map.json');
    const parse$ = promisify(frontmatterParser.parse);
    await Promise.all(markdownFilePaths.map(async markdownFilePath => {

      const markdownFileContent = await readFile(markdownFilePath, "utf-8")
      let {
        data: { name, description, url, github, npm, gem },
        content: howto,
      } = await parse$(markdownFileContent, undefined)
      howto = howto.trim();
      const pathArr = markdownFilePath.split("/")
      if (markdownFilePath.includes("language-support")) {
        const languageSupportDirIndex = pathArr.indexOf("language-support")
        const languageNameSlugIndex = languageSupportDirIndex + 1
        const languageNameSlug = pathArr[languageNameSlugIndex]
        const languageName = slugMap[languageNameSlug]
        codeData.Languages = codeData.Languages || {}
        codeData.Languages[languageName] =
          codeData.Languages[languageName] || {}

        const categoryNameSlugIndex = languageSupportDirIndex + 2
        const categoryNameSlug = pathArr[categoryNameSlugIndex]
        const categoryName = slugMap[categoryNameSlug]
        codeData.Languages[languageName][categoryName] =
          codeData.Languages[languageName][categoryName] || []
        codeData.Languages[languageName][categoryName].push({
          name,
          description,
          howto,
          url,
          github,
          npm,
          gem,
          sourcePath: markdownFilePath,
        })
      } else {
        const codeDirIndex = pathArr.indexOf("code")
        const categoryNameSlugIndex = codeDirIndex + 1
        const categoryNameSlug = pathArr[categoryNameSlugIndex]
        const categoryName = slugMap[categoryNameSlug]
        codeData[categoryName] = codeData[categoryName] || []
        codeData[categoryName].push({
          name,
          description,
          howto,
          url,
          github,
          npm,
          gem,
          sourcePath: markdownFilePath,
        })
      }
    }))
    const languageList = []
    let sortedTools = []
    await Promise.all([
      Promise.all(
        Object.keys(codeData.Languages).map(async languageName => {
          const libraryCategoryMap = codeData.Languages[languageName]
          let languageTotalStars = 0
          await Promise.all(
            Object.keys(libraryCategoryMap).map(async libraryCategoryName => {
              const libraries = libraryCategoryMap[libraryCategoryName]
              const { sortedLibs, totalStars } = await sortLibs(libraries)
              libraryCategoryMap[libraryCategoryName] = sortedLibs
              languageTotalStars += totalStars || 0
            })
          )
          languageList.push({
            name: languageName,
            totalStars: languageTotalStars,
            categoryMap: libraryCategoryMap,
          })
        })
      ),
      sortLibs(codeData.Tools).then(({ sortedLibs }) => {
        sortedTools = sortedLibs
      }),
    ])

    context = {
      ...context,
      otherLibraries: {
        Services: codeData.Services,
        Tools: sortedTools,
        "More Stuff": codeData["More Stuff"],
      },
      languageList: languageList.sort((a, b) => {
        if (a.totalStars > b.totalStars) {
          return -1
        } else if (a.totalStars < b.totalStars) {
          return 1
        }
        return 0
      }),
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

      if (
        sourceInstanceName !== "content" ||
        relativeDirectory.includes("code")
      ) {
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

      sideBardata[folder] = Object.values(categoriesMap)
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
