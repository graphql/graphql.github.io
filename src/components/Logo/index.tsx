import React from "react"

export default function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/img/logo.svg"
      alt="GraphQL Logo"
      style={{ userSelect: "none" }}
      className={className}
      onContextMenuCapture={event => {
        event.preventDefault()
        document.location.assign("/brand")
      }}
    />
  )
}
