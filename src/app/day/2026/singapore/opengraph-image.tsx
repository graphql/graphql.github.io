import { SimpleOpengraphImage } from "../components/og-images/simple-opengraph-image"
export {
  generateStaticParams,
  contentType,
  size,
} from "../components/og-images/simple-opengraph-image"

export default SimpleOpengraphImage.bind(null, {
  pageTitle: "Singapore",
  date: "Apr 14-15, 2026",
  location: "Singapore",
})
