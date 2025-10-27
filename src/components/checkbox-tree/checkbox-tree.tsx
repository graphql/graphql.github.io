import type { ReactNode } from "react"
import { clsx } from "clsx"
import { CheckboxIcon } from "@/app/conf/_design-system/pixelarticons/checkbox-icon"

export interface CheckboxTreeItem {
  id: string
  label: string
  value?: string
  count?: number
  disabled?: boolean
  children?: CheckboxTreeItem[]
}

interface CheckboxTreeProps {
  items: CheckboxTreeItem[]
  selectedValues: string[]
  onSelectionChange: (next: string[]) => void
  depth?: number
}

export function CheckboxTree({
  items,
  selectedValues,
  onSelectionChange,
  depth = 0,
}: CheckboxTreeProps) {
  return (
    <div>
      {items.map(item => {
        const isSelectable = Boolean(item.value)
        const isDisabled = item.disabled || item.count === 0
        const isChecked = isSelectable
          ? selectedValues.includes(item.value!)
          : false
        const checkboxId = `checkbox-tree-${item.id}`

        const toggleValue = (value: string) => {
          const next = selectedValues.includes(value)
            ? selectedValues.filter(tag => tag !== value)
            : [...selectedValues, value]
          onSelectionChange(next)
        }

        return (
          <div
            className="[*:has(_:focus-visible)>&:not(:focus-within)]:text-neu-700"
            key={item.id}
          >
            <div
              className={clsx(
                "relative flex items-start gap-2 py-1 before:absolute before:inset-0 before:-inset-x-2",
                isSelectable &&
                  !isDisabled &&
                  "select-none hover:before:bg-neu-100/50 dark:hover:before:bg-neu-400/5",
              )}
              style={{ paddingInlineStart: (depth - 1) * 16 }}
            >
              {isSelectable ? (
                <label
                  htmlFor={checkboxId}
                  className={clsx(
                    "relative flex grow cursor-pointer items-center gap-2 hover:text-neu-900",
                    isDisabled
                      ? "pointer-events-none text-neu-500 dark:text-neu-500/80 dark:hover:text-neu-900"
                      : "",
                  )}
                  aria-disabled={isDisabled}
                >
                  <span className="flex shrink-0 items-center">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => {
                        toggleValue(item.value!)
                      }}
                      className="peer sr-only"
                    />
                    <CheckboxIcon
                      checked={isChecked}
                      className={clsx(
                        "size-5 translate-y-[-0.25px] opacity-90 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-neu-900",
                      )}
                      aria-hidden
                    />
                  </span>
                  <span className="min-w-0 grow truncate text-left">
                    {item.label}
                  </span>
                  {item.count ? ( // we intentionally don't display 0
                    <span className="ml-auto shrink-0 text-xs">
                      {item.count}
                    </span>
                  ) : null}
                </label>
              ) : (
                <div
                  className={clsx(
                    "typography-menu mt-4 select-none text-sm xl:mt-10",
                    isDisabled ? "text-neu-500" : "text-neu-900",
                  )}
                  aria-disabled={isDisabled}
                >
                  {item.label}
                </div>
              )}
            </div>

            {item.children && item.children.length > 0 ? (
              <CheckboxTree
                items={item.children}
                selectedValues={selectedValues}
                onSelectionChange={onSelectionChange}
                depth={depth + 1}
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
