import React from "react"

export function GridButton({
  title,
  href,
  id,
}: {
  title: string
  href: string
  id?: string
}) {
  return (
    <div
      id={id}
      className="relative flex w-full items-center justify-center overflow-hidden"
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
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center bg-primary/85 px-20 py-4 text-center text-3xl font-semibold text-white transition-colors hover:bg-primary/100 md:px-28"
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
