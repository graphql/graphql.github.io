// Combined regex that matches either existing anchor tags OR standalone URLs
const COMBINED_REGEX =
  /(<a\s+[^>]*href\s*=\s*[^>]*>.*?<\/a>)|(https?:\/\/[^\s]+)/gi

export function formatDescription(text: string): string {
  return text.replace(COMBINED_REGEX, (match, anchorTag, standaloneUrl) => {
    if (anchorTag) {
      const linkMatch = anchorTag.match(
        /<a\s+([^>]*href\s*=\s*[^>]*)>(.*?)<\/a>/i,
      )
      if (!linkMatch) return anchorTag

      const [, attributes, content] = linkMatch
      let attrs = attributes

      if (!attrs.includes("rel=")) {
        attrs += ' rel="noopener noreferrer"'
      }

      if (!attrs.includes("target=")) {
        attrs += ' target="_blank"'
      }

      if (!attrs.includes("class=")) {
        attrs += ' class="typography-link"'
      } else if (!attrs.includes("typography-link")) {
        attrs = attrs.replace(
          /class\s*=\s*["']([^"']*)/gi,
          'class="$1 typography-link',
        )
      }

      const urlContent = content.replace(
        /https?:\/\/[^\s]+/g,
        (url: string) => {
          return url.replace(/^https?:\/\//, "")
        },
      )

      return `<a ${attrs}>${urlContent}</a>`
    } else if (standaloneUrl) {
      const displayUrl = standaloneUrl.replace(/^https?:\/\//, "")
      return `<a href="${standaloneUrl}" target="_blank" rel="noopener noreferrer" class="typography-link">${displayUrl}</a>`
    }

    return match
  })
}
