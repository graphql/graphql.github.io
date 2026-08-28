import ApolloWordmark from "@/icons/apollo-wordmark.svg?svgr"
import {
  colors,
  fonts,
} from "@/app/conf/2026/components/og-images/speaker-opengraph-image"

export function SponsoredByApollo() {
  return (
    <div
      style={{
        position: "absolute",
        right: "1.5rem",
        bottom: "1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: "0.75rem",
          fontWeight: "normal",
          textTransform: "uppercase",
          lineHeight: "1",
          color: colors.neu700,
        }}
      >
        Sponsored by
      </span>
      <ApolloWordmark
        style={{ height: "0.875rem", width: "41px", color: colors.neu900 }}
      />
    </div>
  )
}
