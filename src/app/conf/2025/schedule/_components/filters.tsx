import clsx from "clsx"
import { useState } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Label,
} from "@headlessui/react"

import { Tag } from "@/app/conf/_design-system/tag"
import { Button } from "@/app/conf/_design-system/button"

import CloseIcon from "@/app/conf/_design-system/pixelarticons/close.svg?svgr"
import CaretDownIcon from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"
import { eventsColors } from "../../utils"
import { ScheduleSession } from "@/app/conf/_api/sched-types"

export interface FilterCategoryConfig {
  property: keyof ScheduleSession
  label: string
  options: string[]
  enabledOptions?: Set<string> | null
}

export const FilterCategoryConfig = {
  fromFields: (
    fields: Partial<Record<keyof ScheduleSession, string /* label */>>,
    scheduleData: ScheduleSession[],
  ) => {
    return Object.entries(fields).map(
      ([field, label]): FilterCategoryConfig => ({
        property: field as keyof ScheduleSession,
        label,
        options: Array.from(
          new Set(
            scheduleData.map(
              session => session[field as keyof ScheduleSession],
            ),
          ),
        ).filter((x): x is string => !!x && typeof x === "string"),
      }),
    )
  },
}

export type CategoryName = keyof ScheduleSession

export interface FilterStates extends Partial<Record<CategoryName, string[]>> {}
export const FilterStates = {
  initial: (fields: Array<keyof ScheduleSession>) =>
    Object.fromEntries(fields.map(field => [field, []])),
}

type FiltersProps = {
  categories: FilterCategoryConfig[]
  filterState: Record<string, string[]>
  enabledOptions: Record<string, Set<string> | null>
  onFilterChange: (category: string, newSelectedOptions: string[]) => void
}

export function Filters({
  categories,
  filterState,
  enabledOptions,
  onFilterChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap justify-stretch gap-x-2 gap-y-4 pb-10">
      {categories.map(category => (
        <FiltersCombobox
          key={category.property}
          label={category.label}
          options={category.options}
          enabledOptions={enabledOptions[category.property]}
          value={filterState[category.property] || []}
          onChange={newSelectedOptions => {
            onFilterChange(category.property, newSelectedOptions)
          }}
          placeholder={`Any ${category.label.toLowerCase()}`}
          className="flex-1"
        />
      ))}
    </div>
  )
}

export function ResetFiltersButton({
  onReset,
  className,
  filters,
}: {
  filters: Record<string, string[]>
  onReset: () => void
  className?: string
}) {
  const hasFilters = Object.values(filters).flat().length > 0

  if (!hasFilters) {
    return null
  }

  return (
    <Button
      variant="tertiary"
      title="Reset filters"
      onClick={onReset}
      disabled={!hasFilters}
      className={clsx(
        "h-fit items-center gap-x-2 bg-neu-100 !p-2 text-neu-700 transition-opacity hover:bg-neu-200/80 hover:text-neu-900",
        className,
      )}
    >
      Clear filters
      <CloseIcon className="inline-block size-4" />
    </Button>
  )
}

interface FiltersComboboxProps {
  label: string
  options: string[]
  enabledOptions: Set<string> | null
  value: string[]
  onChange: (newSelectedOptions: string[]) => void
  placeholder: string
  className?: string
}
function FiltersCombobox({
  label,
  options,
  enabledOptions,
  value,
  onChange,
  placeholder,
  className,
}: FiltersComboboxProps) {
  const [query, setQuery] = useState("")

  const filteredOptions =
    query === ""
      ? options
      : options.filter(option =>
          option.toLowerCase().includes(query.toLowerCase()),
        )

  return (
    <Combobox immediate multiple value={value} onChange={onChange}>
      <div className={clsx("flex flex-col", className)}>
        {label && (
          <Label className="typography-menu mb-1 block font-mono font-medium uppercase text-neu-900">
            {label}
          </Label>
        )}
        <label className="relative w-full border border-neu-500 bg-neu-0 p-2 focus-within:outline-none focus-within:ring focus-within:ring-neu-300 dark:border-neu-200 dark:focus-within:ring-neu-200">
          <ComboboxInput
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={clsx(
              "typography-body-sm bg-transparent leading-none text-neu-800 !outline-offset-0 [text-box:trim-both_cap_alphabetic] max-lg:typography-body-md placeholder:text-neu-600 focus:outline-none",
            )}
            placeholder={placeholder}
            autoComplete="true"
          />
          <ComboboxButton
            className={clsx(
              "absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none",
            )}
          >
            <CaretDownIcon
              className="ui-open:rotate-180 size-5 text-neu-400 transition-transform duration-150 group-hover:text-neu-500"
              aria-hidden="true"
            />
          </ComboboxButton>
          {value.length > 0 && (
            <div className="inset-y-0 left-0 z-[1] mt-1 flex items-center overflow-x-auto pr-8">
              <div className="flex flex-wrap items-center gap-1">
                {value.map(item => (
                  <Tag
                    key={item}
                    color={eventsColors[item] || "hsl(var(--color-neu-400))"}
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </label>

        <div className="relative">
          <ComboboxOptions
            className={clsx(
              "absolute z-10 -mt-px max-h-60 w-full overflow-auto border border-neu-500 bg-neu-0 p-1 text-base",
            )}
          >
            {filteredOptions.map(option => (
              <ComboboxOption
                key={option}
                value={option}
                disabled={enabledOptions ? !enabledOptions.has(option) : false}
              >
                {({ active, selected }) => (
                  <FilterComboboxOption
                    active={active}
                    selected={selected}
                    option={option}
                  />
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </div>
    </Combobox>
  )
}

interface CheckboxIconProps extends React.SVGProps<SVGSVGElement> {
  checked: boolean
}
function CheckboxIcon({ checked, ...rest }: CheckboxIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...rest}
    >
      {!checked ? (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 2.5H4.16667H15.8333H17.5V17.5H15.8333H4.16667H2.5V2.5ZM15.8333 15.8333V4.16667H4.16667V15.8333H15.8333Z"
          />
        </>
      ) : (
        <g className="[&>path]:fill-neu-0">
          <rect x="2" y="3" width="15" height="15" />
          <path d="M6 10.3333H7.66667V12H6V10.3333Z" />
          <path d="M7.66667 12H9.33333V13.6667H7.66667V12Z" />
          <path d="M9.33333 10.3333H11V12H9.33333V10.3333Z" />
          <path d="M11 8.66667H12.6667V10.3333H11V8.66667Z" />
          <path d="M12.6667 7H14.3333V8.66667H12.6667V7Z" />
        </g>
      )}
    </svg>
  )
}

function FilterComboboxOption({
  active,
  selected,
  option,
}: {
  active: boolean
  selected: boolean
  option: string
}) {
  return (
    <div
      className={clsx(
        "typography-body-sm relative flex cursor-default select-none items-center p-1 font-sans",
        active && "bg-neu-100 dark:bg-neu-50",
        "[[data-disabled]_&]:line-through [[data-disabled]_&]:opacity-40",
      )}
    >
      <CheckboxIcon
        className={clsx("size-5 shrink-0", active && "text-neu-700")}
        checked={selected}
      />
      <div className="min-w-0 flex-1 overflow-hidden pl-1 [container-type:inline-size]">
        <span
          // eslint-disable-next-line tailwindcss/no-contradicting-classname
          className={clsx(
            "relative block w-fit min-w-full whitespace-nowrap pt-px transition-all [--delta-x:calc(-100%+100cqi)]",
            active && "animate-show-overflow",
          )}
        >
          {option}
        </span>
      </div>
    </div>
  )
}
