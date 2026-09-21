import { SimpleOpengraphImage } from "../components/og-images/simple-opengraph-image"
export {
  generateStaticParams,
  contentType,
  size,
} from "../components/og-images/simple-opengraph-image"

export default SimpleOpengraphImage.bind(null, {
  pageTitle: "London",
  date: "Sep 30-Oct 1, 2026",
  location: "Convene Sancroft, London",
})
