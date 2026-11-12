import { Tag } from "@/app/conf/_design-system/tag"
import { CheckboxIcon } from "@/app/conf/_design-system/pixelarticons/checkbox-icon"
import clsx from "clsx"

export type EventKind =
  | "meetup"
  | "conference"
  | "working-group"
  | "foundation-meeting"
  | "workshop"

export const eventTagColors = {
  conference: "hsl(var(--color-pri-base))",
  meetup: "hsl(var(--color-sec-dark))",
  "working-group": "#6883FF",
  "foundation-meeting": "#FFB140",
  workshop: "#3DBE7E",
} satisfies { [kind in EventKind]: string }

export const eventTagDescriptions = {
  conference: "A large event, often with multiple talks, booth, etc...",
  meetup: "Smaller event, often focused on one or two topics",
  "working-group": "Online meetings where the specs are worked on",
  "foundation-meeting":
    "Meeting where the non-technical aspects of GraphQL are discussed",
  workshop: "Hands on event to learn about GraphQL",
} satisfies { [kind in EventKind]: string }

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
      title={eventTagDescriptions[kind]}
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
