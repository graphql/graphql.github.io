import { SimpleOpengraphImage } from "../components/og-images/simple-opengraph-image"
import { dayEvents } from "../day-events"
export {
  generateStaticParams,
  contentType,
  size,
} from "../components/og-images/simple-opengraph-image"

export default SimpleOpengraphImage.bind(null, dayEvents.paris)
