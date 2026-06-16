import NewspaperIcon from "../assets/newspaper.svg?svgr"
import WriteIcon from "../assets/write-note.svg?svgr"
import BookIcon from "../assets/bookmark.svg?svgr"

export const subcategories = [
  "blogs-and-newsletters",
  "individual-posts",
  "books",
] as const

export type Subcategory = (typeof subcategories)[number]

export type ReadingPageTab = Subcategory | "all"

export const tabs: {
  label: string
  href: string
  variant: ReadingPageTab
  color: string
  icon: React.ReactNode
}[] = [
  {
    label: "Blogs & newsletters",
    href: "/resources/reading/blogs-and-newsletters",
    variant: "blogs-and-newsletters",
    color: "hsl(var(--color-pri-base))",
    icon: <NewspaperIcon className="text-pri-base" />,
  },
  {
    label: "Individual posts",
    href: "/resources/reading/individual-posts",
    variant: "individual-posts",
    color: "#FF8800",
    icon: <WriteIcon className="text-[#FF8800]" />,
  },
  {
    label: "Books",
    href: "/resources/reading/books",
    variant: "books",
    color: "#00C6AC",
    icon: <BookIcon className="text-[#00C6AC]" />,
  },
]
