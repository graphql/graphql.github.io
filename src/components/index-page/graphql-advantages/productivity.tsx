const VIDEOS_DIR =
  "https://github.com/graphql/graphql.github.io/raw/refs/heads/source/public/img"

export function ProductivityFigure() {
  return (
    <div className="flex w-full items-center bg-gradient-to-b from-pri-lighter/[.05] to-pri-lighter/20 px-[14px] py-[30px] dark:from-sec-darker/[.01] dark:to-pri-light/5">
      <div className="overflow-hidden rounded-lg shadow-[0px_0px_20px_0px_rgba(153,0,105,0.20)] dark:shadow-[0px_0px_20px_0px_hsl(218deg,60.3%,17.5%,.2)]">
        <div className="h-px bg-[#FEFEFE] dark:bg-[#1F293A]" />
        <video
          disablePictureInPicture
          autoPlay
          muted
          loop
          playsInline
          // the video is irrelevant to screen readers as its soundless
          aria-hidden
          // @ts-expect-error @types/react doesn't support fetchPriority yet
          fetchpriority="low"
        >
          <source
            src={`${VIDEOS_DIR}/graphiql-dark.mp4`}
            media="(prefers-color-scheme: dark)"
            type="video/mp4"
          />
          <source
            src={`${VIDEOS_DIR}/graphiql-light.mp4`}
            media="(prefers-color-scheme: light)"
            type="video/mp4"
          />
        </video>
        <div
          /* the video is cropped a bit short at the bottom, so we're adding missing padding */
          className="h-[7px] bg-[#FEFEFE] dark:bg-[#1F293A]"
        />
      </div>
    </div>
  )
}
