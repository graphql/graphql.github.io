export interface BlogMdxContent {
  route: string
  frontMatter: {
    title: string
    tags: string[]
    byline: string
    date: Date
    featured: boolean
  }
}
