import clsx from "clsx"

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string
}
export function Tag({ color, children, style, className, ...rest }: TagProps) {
  return (
    <span
      className={clsx(
        "relative max-w-full self-start whitespace-nowrap border px-2 py-1 font-mono text-xs/none uppercase dark:opacity-[96.5%]",
        className,
      )}
      style={{ borderColor: color, ...style }}
      {...rest}
    >
      <span
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="Tag--bg absolute inset-0 opacity-20"
        style={{
          backgroundColor: color,
        }}
      />
      <span
        className={clsx(
          "relative max-w-full items-center gap-2 overflow-hidden text-ellipsis",
          typeof children === "string" ? "block" : "flex",
        )}
      >
        {children}
      </span>
    </span>
  )
}
