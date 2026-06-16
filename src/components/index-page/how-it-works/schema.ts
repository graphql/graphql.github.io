import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLError,
} from "graphql"

const PROJECT_NAME = "GraphQL"
const PROJECT_TAGLINE = "A query language for APIs"

export const INITIAL_QUERY_TEXT = `{
  project(name: "${PROJECT_NAME}") {
    tagline
  }
}`

export const INITIAL_RESULTS_TEXT = `{
  "project": {
    "tagline": "${PROJECT_TAGLINE}"
  }
}`

const projects: Project[] = [
  {
    name: PROJECT_NAME,
    tagline: PROJECT_TAGLINE,
    contributors: [],
  },
  {
    name: "GraphiQL",
    tagline: "Ecosystem for building browser & IDE tools.",
    contributors: [],
  },
  {
    name: "graphql-js",
    tagline: "A reference implementation of GraphQL for JavaScript",
    contributors: [],
  },
]

interface Contributor {
  id: string
  website?: string | null
  contributions: number
}

interface Project {
  name: string
  tagline: string
  contributors: Contributor[]
}

interface PaginationArgs {
  first?: number | null
  after?: string | null
}

const UserType = new GraphQLObjectType<Contributor>({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "GitHub handle of the contributor",
    },
    website: {
      type: GraphQLString,
      description: "Personal website of the contributor",
    },
    contributions: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Number of contributions made to the project",
    },
  },
})

const ProjectType = new GraphQLObjectType<Project>({
  name: "Project",
  fields: {
    name: {
      type: GraphQLString,
      description: "The name of the project",
    },
    tagline: {
      type: GraphQLString,
      description: "A short description of what the project does",
    },
    contributors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      description: "List of contributors to the project",
      args: {
        first: {
          type: GraphQLInt,
          description: "Limits the number of contributors returned",
        },
        after: {
          type: GraphQLID,
          description: "Cursor (User.id) after which to start",
        },
      },
      resolve: async (project, args: PaginationArgs) => {
        try {
          const params = new URLSearchParams()

          if (args.first) params.set("first", args.first.toString())
          if (args.after) params.set("after", args.after)
          params.set("project", project.name)

          const response = await fetch(
            `/api/contributors/?${params.toString()}`,
          )

          if (!response.ok) {
            console.error(`Failed to fetch contributors: ${response.status}`)
            return []
          }

          return response.json()
        } catch (error) {
          console.error("Error fetching contributors:", error)
          return []
        }
      },
    },
  },
})

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    project: {
      type: ProjectType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The name of the project to retrieve",
        },
      },
      resolve: (_, args) => {
        const project = projects.find(
          project => project.name.toLowerCase() === args.name.toLowerCase(),
        )

        if (!project) {
          throw new GraphQLError(
            "To learn about more GraphQL projects, visit graphql.org/code/ or github.com/topics/graphql. In this playground, try 'GraphiQL', 'graphql-js' or 'graphiql'.",
          )
        }

        return project
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      description: "Get all available projects",
      resolve: () => projects,
    },
  },
})

export const projectsSchema = new GraphQLSchema({
  query: QueryType,
})
