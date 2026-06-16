import rssImage from "./rss.png"

export function SubscribeToRssLink() {
  return (
    <a
      href="/community/events/rss.xml"
      className="-mx-4 -my-2 flex items-center px-4 py-2 transition-colors hover:bg-neu-100 hover:duration-0 max-md:mb-6"
    >
      <span>Subscribe to Events RSS</span>
      <img
        src={rssImage.src}
        alt="RSS Feed"
        className="ml-2"
        width={24}
        height={24}
      />
    </a>
  )
}
