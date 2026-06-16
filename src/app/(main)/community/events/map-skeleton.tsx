export function MapSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-150 ease-linear ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(60deg, var(--land) 25%, var(--sea) 50%, var(--land) 75%)",
        backgroundSize: "300%",
        animation: "sheen 4s ease infinite",
      }}
    />
  )
}
