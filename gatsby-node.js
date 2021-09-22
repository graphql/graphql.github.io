const path = require("path")
const sortLibs = require("./scripts/sort-libraries")
const globby = require("globby")
const frontmatterParser = require("parser-front-matter")
const { readFile } = require("fs-extra")
const { promisify } = require("util")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const gql = String.raw;
  const { createTypes } = actions;

  createTypes(gql`
    type BlogPost implements Node
      @dontInfer
      @childOf(types: ["File", "MarkdownRemark"])
    {
      postId: String!
      title: String!
      excerpt: String!
      rawContent: String! # raw markdown content, better if it would be fully parsed & rendered at the build time
      tags: [String!]!
      date: Date! @dateformat(formatString: "YYYY-MM-DD")
      authors: [String!]!
    }
  `);
};

// Transform nodes, each of logic inside here can be extracted to a separated plugin later.
exports.onCreateNode = async ({
  reporter,
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  // Derive content nodes from remark nodes
  if (node.internal.type === 'MarkdownRemark') {
    if (node.frontmatter.layout === 'blog') {
      const nodeId = createNodeId(`${node.id} >>> BlogPost`);

      const permalink = node.frontmatter.permalink;
      if (!permalink?.startsWith('/blog/')) {
        reporter.panicOnBuild(`${permalink} is not valid permalink for blog post`);
        return;
      }

      // It contains a kind of transform logic. However, those logics can be extracted to resolvers into ahead of sourcing (createTypes)
      const blogPostContent = {
        id: nodeId,
        postId: permalink.replace('/blog/', '').replace(/\/$/, ''),
        title: node.frontmatter.title,
        excerpt: node.excerpt,
        rawContent: node.rawMarkdownBody,
        tags: node.frontmatter.tags ?? [],
        date: node.frontmatter.date,
        authors: (node.frontmatter.byline ?? '')
          .split(',')
          .map(name => name.trim())
          .filter(Boolean),
      };

      createNode({
        ...blogPostContent,
        parent: node.id,
        children: [],
        internal: {
          type: 'BlogPost',
          contentDigest: createContentDigest(blogPostContent),
        },
      });

      createParentChildLink({
        parent: node,
        child: blogPostContent,
      });
    }
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  // trying to refactor code to be "the Gatsby way".
  // from the paths on ready, ignores a bunch of existing custom logic below.
  if (page.path.startsWith('/blog')) {
    return;
  }
  if (page.path.startsWith('/tags')) {
    return;
  }

  const { createPage, deletePage } = actions
  deletePage(page)
  let context = {
    ...page.context,
    sourcePath: path.relative(__dirname, page.componentPath),
  }
  if (page.path === "/code" || page.path === "/code/") {
    const markdownFilePaths = await globby("src/content/code/**/*.md")
    const codeData = {}
    const slugMap = require("./src/content/code/slug-map.json")
    const parse$ = promisify(frontmatterParser.parse)
    await Promise.all(
      markdownFilePaths.map(async markdownFilePath => {
        const markdownFileContent = await readFile(markdownFilePath, "utf-8")
        let {
          data: { name, description, url, github, npm, gem },
          content: howto,
        } = await parse$(markdownFileContent, undefined)
        howto = howto.trim()
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
      })
    )
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
              tags
            }
            id
          }
        }
      }
      allBlogPost {
        group(field: tags) {
          fieldValue
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

  const tags = result.data.allBlogPost.group.map(group => group.fieldValue)
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag.toLowerCase()}/`,
      component: path.resolve("./src/templates/{BlogPost.tags}.tsx"),
      context: {
        tag,
      },
    })
  })

  const markdownPages = result.data.allMarkdownRemark.edges

  // foundation: [
  //   {
  //     fileAbsolutePath: '/graphql/graphql.github.io/src/content/foundation/About.md',
  //     parent: {},
  //     frontmatter: {},
  //     id: '1d502d5e-3453-56cf-ad9a-7f6bfb68d9ba'
  //   },
  //   ...
  //   ]
  // }
  let pagesGroupedByFolder = {}

  // {
  //   foundation: [
  //     { name: 'foundation', links: [{"fileAbsolutePath":"/graphql/graphql.github.io/src/content/foundation/About.md","parent":{"relativeDirectory":"foundation","sourceInstanceName":"content"},"frontmatter":{"title":"What is the GraphQL Foundation?","permalink":"/foundation/","next":"/foundation/join/","category":"GraphQL Foundation","sublinks":null,"sidebarTitle":"About the Foundation","date":null},"id":"1d502d5e-3453-56cf-ad9a-7f6bfb68d9ba"}] },
  //     { name: 'GraphQL Foundation', links: [Array] }
  //   ],
  // Note that this is mutated
  let sideBardata = {}

  // Sidebar items to add which don't come from markdown
  const additionalSidebarItems = {
    foundation: [
      {
        name: "GraphQL Foundation",
        links: [
          {
            frontmatter: {
              sidebarTitle: "Foundation Members",
              title: "Foundation Members",
              permalink: "/foundation/members/",
              date: null,
              category: "GraphQL Foundation",
            },
          },
          {
            frontmatter: {
              sidebarTitle: "GraphQL Landscape",
              title: "GraphQL Landscape",
              permalink: "https://landscape.graphql.org/",
              date: null,
              category: "GraphQL Foundation",
            },
          },
        ],
      },
    ],
  }

  // E.g.
  // {
  //   permalink: '/learn/best-practices/',
  //   relativeDirectory: 'learn',
  //   sidebarTitle: 'Introduction',
  //   nextPermalink: '/learn/thinking-in-graphs/',
  //   sourcePath: 'src/content/learn/BestPractice-Introduction.md'
  // }
  const allPages = []

  // Loop through all *.md files in the repo, setting up both pagesGroupedByFolder
  // and allPages.
  markdownPages.map(({ node }) => {
    const {
      frontmatter: { permalink, next, sidebarTitle },
      parent: { relativeDirectory, sourceInstanceName },
    } = node

    if (
      sourceInstanceName !== "content" ||
      relativeDirectory.includes("code/")
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
  })

  // Loop through the sections in the sidebar, mutating the
  // next and previous objects for different
  Object.entries(pagesGroupedByFolder).map(([folder, pages]) => {
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

    pagesByDate.forEach(page => {
      const next = page.frontmatter.next
      const permalink = page.frontmatter.permalink

      if (next) {
        previousPagesMap[next] = permalink
      }
      pagesByUrl[permalink] = page
    })

    let firstPage = null
    pagesByDate.forEach(page => {
      const permalink = page.frontmatter.permalink
      if (!previousPagesMap[permalink] && !firstPage) {
        firstPage = page
        return
      }
    })

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

  Object.entries(additionalSidebarItems).map(([folder, sections]) => {
    sections.forEach(s => {
      const originalLinks = sideBardata[folder].find(l => l.name === s.name)
      originalLinks.links = [...originalLinks.links, ...s.links]
    })
  })

  // Use all the set up data to now tell Gatsby to create pages
  // on the site
  allPages
    .filter(page => !page.permalink.startsWith('/blog'))
    .forEach(page => {
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
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "assert": require.resolve("assert/"),
      }
    }
  })
}
