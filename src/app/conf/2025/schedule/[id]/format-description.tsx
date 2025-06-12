import React from "react"

const URL_REGEX = /https?:\/\/[^\s]+/g

export function formatDescription(text: string): React.ReactNode {
  const res: React.ReactNode[] = []

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      res.push(text.slice(lastIndex, match.index))
    }

    res.push(
      <a
        href={match[0]}
        target="_blank"
        rel="noopener noreferrer"
        className="typography-link"
      >
        {match[0].replace(/^https?:\/\//, "")}
      </a>,
    )

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    res.push(text.slice(lastIndex))
  }

  return <>{res}</>
}
