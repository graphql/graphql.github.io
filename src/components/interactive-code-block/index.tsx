import dynamic from "next/dynamic"

export const InteractiveCodeBlock = dynamic(() => import("./mini-graphiQL"), {
  ssr: true,
})
