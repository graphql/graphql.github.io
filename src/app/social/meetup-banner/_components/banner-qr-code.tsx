import { QRCodeSVG } from "@/app/conf/conference-kit/_components/qr-code"
import {
  colors,
  fonts,
} from "@/app/conf/2026/components/og-images/speaker-opengraph-image"

const RIGHT_COLUMN_TEXT_WIDTH_PX = 260

export function BannerQrCode({
  value,
  caption,
}: {
  value: string
  caption: string
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <QRCodeSVG value={value} size={192} color={colors.neu900} />
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: "1.1rem",
          fontWeight: "normal",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: "1.3",
          color: colors.neu700,
          maxWidth: `${RIGHT_COLUMN_TEXT_WIDTH_PX}px`,
        }}
      >
        {caption}
      </span>
    </div>
  )
}
