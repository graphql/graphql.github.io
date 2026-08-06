import clsx from "clsx"

import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
// Most other repo blobs are wide-and-flat — the use-cases bean is the only
// near-square one (1421×1138, ratio 1.25), so it doesn't get stretched into
// a skinny strip when scaled up on a tall portrait banner.
import blurBlob from "@/components/index-page/use-cases/blur-bean.webp"

export interface BlobStripesProps {
  className?: string
  evenClassName?: string
  oddClassName?: string
  stripeWidth?: string
  angle?: string
  /** mask-position passed through. */
  position?: string
  /** mask-size passed through. */
  size?: string
}

export function BlobStripes({
  className,
  evenClassName,
  oddClassName,
  stripeWidth,
  angle,
  position = "center",
  size = "140%",
}: BlobStripesProps) {
  return (
    <div
      role="presentation"
      className={clsx("pointer-events-none absolute inset-0", className)}
      style={{
        maskImage: `url(${blurBlob.src})`,
        WebkitMaskImage: `url(${blurBlob.src})`,
        maskPosition: position,
        WebkitMaskPosition: position,
        maskSize: size,
        WebkitMaskSize: size,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName={evenClassName}
        oddClassName={oddClassName}
        stripeWidth={stripeWidth}
        angle={angle}
      />
    </div>
  )
}
