import React from "react"

type GridButtonProps = {
  title: string
  href: string
  disabled?: boolean
  id?: string
}

const GridButton: React.FC<GridButtonProps> = ({
  title,
  href,
  disabled,
  id,
}) => {
  return (
    <div
      id={id}
      className="relative w-full flex items-center justify-center overflow-hidden"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(18, 60px)",
          gridTemplateRows: "repeat(6, 60px)",
        }}
      >
        {Array.from({ length: 18 * 5 + 2 }).map((_, index) => (
          <div
            key={index}
            className="border border-white/10"
            style={{
              width: "60px",
              height: "60px",
            }}
          ></div>
        ))}
        <a
          href={disabled ? undefined : href}
          target="_blank"
          rel="noreferrer"
          className="px-20 flex items-center justify-center md:px-28 py-4 text-center text-white text-3xl font-semibold bg-primary/85 hover:bg-primary/100 transition-colors"
          style={{
            gridColumn: "6 / span 8",
            gridRow: "3 / span 2",
          }}
        >
          {title}
        </a>
      </div>
    </div>
  )
}

export default GridButton
