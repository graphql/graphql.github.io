import { SimpleOpengraphImage } from "../components/og-images/simple-opengraph-image"
export {
  generateStaticParams,
  contentType,
  size,
} from "../components/og-images/simple-opengraph-image"

export default SimpleOpengraphImage.bind(null, {
  pageTitle: "NYC",
  date: "May 13-14, 2026",
  location: "Convene 360 Madison, New York",
})
