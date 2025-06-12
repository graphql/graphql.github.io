import clsx from "clsx"

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string
}
export function Tag({ color, children, style, className, ...rest }: TagProps) {
  return (
    <span
      className={clsx(
        "relative self-start whitespace-nowrap border px-2 py-1 font-mono text-xs/none uppercase dark:opacity-[96.5%]",
        className,
      )}
      style={{ borderColor: color, ...style }}
      {...rest}
    >
      <span
        className="absolute inset-0 opacity-20"
        style={{
          backgroundColor: color,
        }}
      />
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </span>
  )
}
