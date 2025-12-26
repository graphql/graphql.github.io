import { Tag } from "@/app/conf/_design-system/tag"
import { CheckboxIcon } from "@/app/conf/_design-system/pixelarticons/checkbox-icon"
import clsx from "clsx"

export type EventKind = "meetup" | "conference" | "working-group"

export const eventTagColors = {
  conference: "hsl(var(--color-pri-base))",
  meetup: "hsl(var(--color-sec-dark))",
  "working-group": "#6883FF",
}

export interface EventFilterTagProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  kind: EventKind
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export function EventFilterTag({
  kind,
  checked,
  onChange,
  disabled,
  ...rest
}: EventFilterTagProps) {
  return (
    <label
      {...rest}
      className="cursor-pointer select-none hover:opacity-90 hover:ring hover:ring-neu-100 has-[>:disabled]:pointer-events-none dark:hover:ring-neu-50"
    >
      <input
        type="checkbox"
        className="sr-only"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <Tag
        color={eventTagColors[kind]}
        className="flex py-[3px] pl-[3px] *:gap-1"
      >
        <CheckboxIcon
          checked={checked}
          style={{
            color: eventTagColors[kind],
          }}
        />
        {kind.replace("-", " ")}
      </Tag>
    </label>
  )
}
