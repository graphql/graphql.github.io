import { ScheduleSession } from "./src/components/Conf/Schedule/session-list"
import { SchedSpeaker } from "./src/components/Conf/Speakers/Speaker"
import { GatsbyNode } from "gatsby"
import * as path from "path"
import { glob } from "glob"
import { updateCodeData } from "./scripts/update-code-data/update-code-data"
import { organizeCodeData } from "./scripts/update-code-data/organize-code-data"
import { sortCodeData } from "./scripts/update-code-data/sort-code-data"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  async ({ actions }) => {
    const gql = String.raw
    const { createTypes } = actions

    createTypes(gql`
      type BlogPost implements Node @childOf(types: ["MarkdownRemark"]) {
        postId: String!
        title: String!
        tags: [String!]!
        date: Date! @dateformat(formatString: "YYYY-MM-DD")
        authors: [String!]!
        guestBio: String
        remark: MarkdownRemark! @link # backlink to the parent
      }
    `)
  }

// Transform nodes, each of logic inside here can be extracted to a separated plugin later.
export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  reporter,
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions


  // Derive content nodes from remark nodes
  if (
    node.internal.type === "MarkdownRemark" &&
    node.frontmatter.layout === "blog"
  ) {
    const nodeId = createNodeId(`${node.id} >>> BlogPost`)

    const { permalink } = node.frontmatter
    if (!permalink?.startsWith("/blog/")) {
      reporter.panicOnBuild(`${permalink} is not valid permalink for blog post`)
      return
    }

    // It contains a kind of transform logic. However, those logics can be extracted to resolvers into ahead of sourcing (createTypes)
    const blogPostContent = {
      id: nodeId,
      postId: permalink.replace("/blog/", "").replace(/\/$/, ""),
      title: node.frontmatter.title,
      tags: node.frontmatter.tags ?? [],
      date: node.frontmatter.date,
      authors: (node.frontmatter.byline ?? "")
        .split(",")
        .map(name => name.trim())
        .filter(Boolean),
      guestBio: node.frontmatter.guestBio ?? null,
    }

    createNode({
      ...blogPostContent,
      remark: node.id,
      parent: node.id,
      children: [],
      internal: {
        type: "BlogPost",
        contentDigest: createContentDigest(blogPostContent),
      },
    })

    createParentChildLink({
      parent: node,
      child: blogPostContent,
    })
  }
}

export const onCreatePage: GatsbyNode["onCreatePage"] = async ({
  page,
  actions,
}) => {
  // This way is not "the Gatsby way", we create the pages, delete the pages, and create "code" paths page again.
  if (
    page.path.startsWith("/blog") ||
    page.path.startsWith("/tags") ||
    // we have manual og:image in this page that point to cf worker
    page.path.startsWith("/conf/attendee/")
  ) {
    return
  }
  const { createPage, deletePage } = actions
  deletePage(page)
  let context = {
    ...page.context,
    sourcePath: path.relative(__dirname, page.path),
  }
  if (page.path === "/code" || page.path === "/code/") {
    const markdownFilePaths = await glob("src/content/code/**/*.md")
    const slugMap = require("./src/content/code/slug-map.json")
    const codeData = await updateCodeData(markdownFilePaths, slugMap)
    const organizeData = await organizeCodeData(codeData)
    const sortedOrganizeData = await sortCodeData(organizeData)

    context = {
      sourcePath: path.relative(__dirname, page.path),
      ...sortedOrganizeData,
    }
  }
  createPage({
    ...page,
    context,
  })
}

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "GraphQL Conf / GraphQL Foundation",
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(
      `Error fetching data from ${url}: ${error.message || error.toString()}`
    )
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  try {
    const schedAccessToken = process.env.SCHED_ACCESS_TOKEN

    const schedule: ScheduleSession[] = await fetchData(
      `https://graphqlconf23.sched.com/api/session/export?api_key=${schedAccessToken}&format=json`
    )

    const usernames: { username: string }[] = await fetchData(
      `https://graphqlconf23.sched.com/api/user/list?api_key=${schedAccessToken}&format=json&fields=username`
    )

    // Fetch full info of each speaker individually and concurrently
    const speakers = (
      (await Promise.all(
        usernames.map(async user => {
          await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay between requests, rate limit is 30req/min
          return fetchData(
            `https://graphqlconf23.sched.com/api/user/get?api_key=${schedAccessToken}&by=username&term=${user.username}&format=json&fields=username,company,position,name,about,location,url,avatar,role,socialurls`
          )
        })
      )) as SchedSpeaker[]
    ).filter(s => s.role.includes("speaker"))

    createPage({
      path: "/conf/schedule",
      component: path.resolve("./src/templates/schedule.tsx"),
      context: { schedule },
    })

    createPage({
      path: "/conf",
      component: path.resolve("./src/templates/conf.tsx"),
      context: {
        schedule: withSpeakerInfo(schedule.filter(session => session.speakers)),
      },
    })
    // Create schedule page
    createPage({
      path: "/conf/sessions",
      component: path.resolve("./src/templates/session.tsx"),
      context: {
        schedule: withSpeakerInfo(schedule.filter(session => session.speakers)),
      },
    })

    // Create schedule events' pages
    schedule.forEach(event => {
      const eventSpeakers = speakers.filter(e =>
        event.speakers?.find(({ username }) => username === e.username)
      )

      createPage({
        path: `/conf/sessions/${event.id}`,
        component: path.resolve("./src/templates/event.tsx"),
        context: {
          event,
          speakers: eventSpeakers,
        },
      })

      // if (!process.env.GATSBY_CLOUD && !process.env.GITHUB_ACTIONS) {
      //   try {
      //     createOpenGraphImage(createPage, {
      //       outputDir: "../static/img/__og-image",
      //       component: path.resolve("./src/templates/EventOgImageTemplate.tsx"),
      //       size: {
      //         width: 1200,
      //         height: 630,
      //       },
      //       waitCondition: "networkidle0",
      //       context: {
      //         id: event.id,
      //         title: event.name,
      //         event,
      //         speakers: eventSpeakers,
      //       },
      //     })
      //   } catch {
      //     console.log("Error creating OG image for", event.name)
      //   }
      // }
    })

    function withSpeakerInfo(session: ScheduleSession[]) {
      return session.map(session => ({
        ...session,
        speakers: session.speakers
          .map(speaker => speakers.find(s => s.username === speaker.username))
          .filter(Boolean),
      }))
    }

    // Create speakers list page
    createPage({
      path: "/conf/speakers",
      component: path.resolve("./src/templates/speakers.tsx"),
      context: { speakers: speakers || [] },
    })

    // Create a page for each speaker
    speakers.forEach(speaker => {
      const speakerSessions: ScheduleSession[] =
        schedule.filter(session => {
          return session.speakers?.find(e => e.username === speaker.username)
        }) || []

      createPage({
        path: `/conf/speakers/${speaker.username}`,
        component: path.resolve("./src/templates/speaker.tsx"),
        context: {
          speaker,
          schedule: withSpeakerInfo(speakerSessions),
        },
      })

      // if (!process.env.GATSBY_CLOUD && !process.env.GITHUB_ACTIONS) {
      //   try {
      //     createOpenGraphImage(createPage, {
      //       outputDir: "../static/img/__og-image",
      //       component: path.resolve(
      //         "./src/templates/SpeakerOgImageTemplate.tsx"
      //       ),
      //       size: {
      //         width: 1200,
      //         height: 630,
      //       },
      //       waitCondition: "networkidle0",
      //       context: {
      //         id: speaker.username,
      //         title: speaker.name,
      //         speaker,
      //       },
      //     })
      //   } catch {
      //     console.log("Error creating OG image for speaker ", speaker.name)
      //   }
      // }
    })
  } catch (error) {
    console.log("CATCH ME:", error)
  }

  const result = await graphql(`
    query allMarkdownRemark {
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
        group(field: { tags: SELECT }) {
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
  for (const tag of tags) {
    createPage({
      path: `/tags/${tag.toLowerCase()}/`,
      component: path.resolve("./src/templates/{BlogPost.tags}.tsx"),
      context: {
        tag,
      },
    })
  }

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

    pagesGroupedByFolder = {
      ...pagesGroupedByFolder,
      [relativeDirectory]: pagesGroupedByFolder[relativeDirectory]
        ? [...pagesGroupedByFolder[relativeDirectory], node]
        : [node],
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
      }
      if (aDate < bDate) {
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
      const { category: definedCategory, next: definedNextPageUrl } =
        frontmatter
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
  for (const page of allPages) {
    if (!page.permalink.startsWith("/blog")) {
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
    }
  }
}

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] =
  async ({ actions }) => {
    actions.setWebpackConfig({
      resolve: {
        fallback: {
          assert: "assert/",
        },
      },
    })
  }
