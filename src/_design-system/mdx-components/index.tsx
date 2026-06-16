import { Pre, PreProps } from "../../components/pre"
import { getMdxHeadings } from "./get-mdx-headings"
import { MdxLink } from "./mdx-link"

const MdxPre = (props: PreProps) => {
  return (
    <Pre
      {...props}
      containerClassName="[&:not(:first-child)]:_mt-6 bg-white dark:bg-neu-800/[.025]"
      className="!rounded-none"
    />
  )
}

export const mdxComponents = {
  a: MdxLink,
  pre: MdxPre,
  ...getMdxHeadings(),
}
