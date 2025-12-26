export function IntegrationFigure() {
  const languages = [
    "C SHARP",
    "NODE.JS",
    "PYTHON",
    "RUST",
    "POSTGRES",
    "JAVASCRIPT",
  ]

  return (
    <div
      className="flex w-full max-w-[100vw] flex-col items-center justify-center bg-gradient-to-b from-[hsla(75,57%,97%,0)] to-white px-[14px] py-[30px] dark:to-neu-100/20 sm:max-w-[calc(100vw-32px)] xl:min-h-[300px] xl:px-[46px]"
      aria-hidden
    >
      <div className="flex w-full items-center justify-center bg-pri-lighter/50 px-10 py-6 dark:bg-pri-base/15">
        <span className="font-mono text-xs font-normal uppercase tracking-wide text-pri-base dark:text-pri-light">
          GRAPHQL
        </span>
      </div>

      <div className="relative mt-5 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_23%,white_77%,transparent)]">
        <div className="flex animate-scroll gap-3 [--animation-duration:10s] lg:[--animation-duration:30s]">
          {[...languages, ...languages].map((language, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center justify-center bg-sec-lighter px-10 py-6 dark:bg-sec-darker/30"
            >
              <span className="font-mono text-xs font-normal uppercase tracking-wide text-sec-dark dark:text-sec-light">
                {language}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
