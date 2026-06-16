import clsx from "clsx"

export function Kbd(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      {...props}
      className={clsx(
        "inline-flex h-5 items-center gap-0.5 rounded border border-b-2 border-neu-300 bg-white px-1.5 font-mono text-[11px] font-medium text-neu-700 contrast-more:border-current contrast-more:text-current dark:border-neu-100/30 dark:bg-neu-0/50 dark:text-neu-500 contrast-more:dark:border-current max-sm:hidden",
        props.className,
      )}
    />
  )
}
