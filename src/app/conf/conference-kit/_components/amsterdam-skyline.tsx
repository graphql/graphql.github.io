import clsx from "clsx"

export interface AmsterdamSkylineProps {
  className?: string
  moonClassName?: string
}

export function AmsterdamSkyline({
  className,
  moonClassName,
}: AmsterdamSkylineProps) {
  return (
    <svg
      viewBox="0 0 260 200"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("block", className)}
    >
      <circle
        cx="200"
        cy="52"
        r="20"
        className={clsx("fill-current", moonClassName)}
        stroke="none"
        opacity="0.85"
      />
      <line x1="0" y1="168" x2="260" y2="168" />
      {/* stepped gable */}
      <path d="M10 168 V108 L10 108 L18 100 L26 108 L26 94 L40 94 L40 108 L48 100 L56 108 V168" />
      <rect x="18" y="118" width="8" height="10" />
      <rect x="34" y="118" width="8" height="10" />
      <rect x="26" y="134" width="10" height="14" />
      {/* bell gable */}
      <path d="M56 168 V112 Q56 98 68 96 Q80 98 80 112 V168" />
      <rect x="62" y="120" width="6" height="8" />
      <rect x="72" y="120" width="6" height="8" />
      <rect x="62" y="136" width="6" height="8" />
      <rect x="72" y="136" width="6" height="8" />
      {/* neck gable */}
      <path d="M80 168 V104 L86 100 L88 92 L96 84 L104 92 L106 100 L112 104 V168" />
      <rect x="88" y="116" width="8" height="10" />
      <rect x="98" y="116" width="8" height="10" />
      <rect x="92" y="134" width="10" height="14" />
      {/* peaked */}
      <path d="M112 168 V108 L128 92 L144 108 V168" />
      <rect x="120" y="118" width="8" height="8" />
      <rect x="130" y="118" width="8" height="8" />
      <rect x="124" y="134" width="10" height="14" />
      {/* taller stepped */}
      <path d="M144 168 V96 L154 88 L164 96 V168" />
      <rect x="150" y="108" width="6" height="8" />
      <rect x="158" y="108" width="6" height="8" />
      <rect x="150" y="124" width="6" height="8" />
      <rect x="158" y="124" width="6" height="8" />
      <rect x="150" y="140" width="6" height="8" />
      <rect x="158" y="140" width="6" height="8" />
      {/* bell */}
      <path d="M164 168 V114 Q164 100 176 98 Q188 100 188 114 V168" />
      <rect x="170" y="122" width="6" height="8" />
      <rect x="178" y="122" width="6" height="8" />
      <rect x="170" y="138" width="6" height="8" />
      <rect x="178" y="138" width="6" height="8" />
      {/* stepped */}
      <path d="M188 168 V110 L194 104 L200 108 L200 98 L212 98 L212 108 L218 104 L224 110 V168" />
      <rect x="196" y="120" width="8" height="10" />
      <rect x="210" y="120" width="8" height="10" />
      <rect x="202" y="136" width="10" height="14" />
      {/* simple */}
      <path d="M224 168 V106 L240 94 L256 106 V168" />
      <rect x="230" y="116" width="8" height="10" />
      <rect x="242" y="116" width="8" height="10" />
      {/* bridge arches */}
      <path d="M0 168 Q20 160 40 168" />
      <path d="M40 168 Q60 160 80 168" />
      <path d="M80 168 Q100 160 120 168" />
      <path d="M120 168 Q140 160 160 168" />
      <path d="M160 168 Q180 160 200 168" />
      <path d="M200 168 Q220 160 240 168" />
      <path d="M240 168 Q252 162 260 168" />
      {/* tiny boat */}
      <path d="M96 184 L130 184 L126 190 L100 190 Z" />
      <line x1="113" y1="184" x2="113" y2="174" />
      <line x1="113" y1="174" x2="122" y2="182" />
      {/* water ripples */}
      <path d="M12 178 q6 -2 12 0 t12 0" opacity="0.6" />
      <path d="M160 182 q6 -2 12 0 t12 0" opacity="0.6" />
      <path d="M200 178 q6 -2 12 0 t12 0" opacity="0.6" />
    </svg>
  )
}
