import { SimpleOpengraphImage } from "../components/og-images/simple-opengraph-image"
export {
  generateStaticParams,
  contentType,
  size,
} from "../components/og-images/simple-opengraph-image"

export default SimpleOpengraphImage.bind(null, {
  pageTitle: "Resources",
})
