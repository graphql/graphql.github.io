import { colors, fonts } from "./speaker-opengraph-image"

export function OpengraphImageFooter({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        borderTop: `2px solid ${colors.neu600}`,
        paddingLeft: "2.5rem",
        paddingRight: "4rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: "1.5rem",
          fontWeight: "normal",
          textTransform: "uppercase",
          lineHeight: "1",
          color: colors.neu900,
        }}
      >
        {children}
      </span>
    </footer>
  )
}
