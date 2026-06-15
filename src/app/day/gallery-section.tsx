import { GalleryStrip } from "./2026/components/gallery-strip"

export function GallerySection({ moving }: { moving?: boolean }) {
  return (
    <section className="gql-container py-8 xl:py-12 3xl:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="px-4 lg:px-12 xl:px-24">
        <h3 className="typography-h2 mb-2">Gallery</h3>
        <p className="typography-body-md text-neu-700">
          Photos from GraphQL Day.
        </p>
      </div>
      <GalleryStrip speed={moving ? 35 : 0} />
    </section>
  )
}
