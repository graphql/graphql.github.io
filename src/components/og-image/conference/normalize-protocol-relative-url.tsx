export function normalizeProtocolRelativeUrl(url: string) {
  if (url.startsWith("//")) {
    return `https:${url}`
  }
  return url
}
