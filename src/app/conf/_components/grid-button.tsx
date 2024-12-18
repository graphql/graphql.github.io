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
      className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="grid gap-0 md:scale-100 scale-75"
        style={{
          gridTemplateColumns: "repeat(18, 60px)",
          gridTemplateRows: "repeat(6, 60px)",
          width: "1080px",
          height: "360px",
          boxSizing: "border-box",
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
          className="relative z-0 col-span-8 row-span-2 text-white text-3xl font-semibold bg-[#E10098] hover:bg-[#ef00a3] flex items-center justify-center gap-2"
          style={{
            gridColumn: "6 / span 8",
            gridRow: "3 / span 2",
          }}
        >
          <button className="text-white text-3xl font-semibold flex items-center justify-center gap-2">
            {title}
          </button>
        </a>
      </div>
    </div>
  )
}

export default GridButton
