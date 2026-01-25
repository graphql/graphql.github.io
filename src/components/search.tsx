/* eslint-disable tailwindcss/no-custom-classname */
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react"
import { clsx } from "clsx"
import NextLink from "next/link"
import { useRouter } from "next/compat/router"
import { useMounted } from "nextra/hooks"
import { InformationCircleIcon, SpinnerIcon } from "nextra/icons"
import type {
  FocusEventHandler,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from "react"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { Kbd } from "../_design-system/kbd"

export type SearchResult = {
  children: ReactNode
  id: string
  prefix?: ReactNode
  route: string
}

type SearchProps = {
  className?: string
  value: string
  onChange: (newValue: string) => void
  onActive?: () => void
  loading?: boolean
  error?: boolean
  results: SearchResult[]
  setMenu: (state: false) => void
}

const INPUTS = new Set(["input", "select", "button", "textarea"])

export function Search({
  className,
  value,
  onChange,
  onActive,
  loading,
  error,
  results,
  setMenu,
}: SearchProps): ReactElement {
  const router = useRouter()
  const [focused, setFocused] = useState(false)
  const mounted = useMounted()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function down(event: globalThis.KeyboardEvent) {
      const input = inputRef.current
      const activeElement = document.activeElement as HTMLElement
      const tagName = activeElement?.tagName.toLowerCase()
      if (
        !input ||
        !tagName ||
        INPUTS.has(tagName) ||
        activeElement?.isContentEditable
      )
        return
      if (
        event.key === "/" ||
        (event.key === "k" &&
          (event.metaKey /* for Mac */ || /* for non-Mac */ event.ctrlKey))
      ) {
        event.preventDefault()
        // prevent to scroll to top
        input.focus({ preventScroll: true })
      }
    }

    window.addEventListener("keydown", down)
    return () => {
      window.removeEventListener("keydown", down)
    }
  }, [])

  const icon = mounted && !focused && (
    <Kbd className="absolute right-1.5 my-1.5 select-none max-sm:hidden rtl:left-1.5">
      {navigator.userAgent.includes("Mac") ? (
        <>
          <span className="text-xs">⌘</span>K
        </>
      ) : (
        "CTRL K"
      )}
    </Kbd>
  )

  const handleFocus = useCallback<FocusEventHandler>(
    event => {
      const isFocus = event.type === "focus"
      if (isFocus) onActive?.()
      setFocused(isFocus)
    },
    [onActive],
  )

  const handleChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget
      onChange(value)
    },
    [onChange],
  )

  const handleSelect = useCallback(
    async (searchResult: SearchResult | null) => {
      if (!searchResult) return
      // Calling before navigation so selector `html:not(:has(*:focus))` in styles.css will work,
      // and we'll have padding top since input is not focused
      inputRef.current?.blur()
      await router?.push(searchResult.route)
      // Clear input after navigation completes
      setMenu(false)
      onChange("")
    },
    [router, setMenu, onChange],
  )

  return (
    <Combobox onChange={handleSelect}>
      <div
        className={clsx(
          "not-prose", // for blog
          "relative flex items-center",
          "text-neu-900",
          className,
        )}
      >
        <ComboboxInput
          ref={inputRef}
          spellCheck={false}
          className={({ focus }) =>
            clsx(
              "px-3 py-2 transition-colors",
              "w-full md:w-64",
              "text-base leading-tight md:text-sm",
              focus
                ? "bg-transparent focus-visible:gql-focus-outline focus-visible:outline-offset-1"
                : "bg-black/[.05] dark:bg-neu-100/10",
              "placeholder:text-neu-500",
              "contrast-more:border contrast-more:border-current",
              "[&::-webkit-search-cancel-button]:_appearance-none",
            )
          }
          autoComplete="off"
          type="search"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleFocus}
          value={value}
          placeholder="Search..."
        />
        {icon}
      </div>
      <ComboboxOptions
        transition
        anchor={{ to: "top end", gap: 10, padding: 16 }}
        className={({ open }) =>
          clsx(
            "nextra-scrollbar max-md:h-full",
            "border border-neu-300 text-neu-700 dark:border-neu-50",
            "z-20 py-2.5 shadow-xl",
            "contrast-more:border contrast-more:border-neu-900 contrast-more:dark:border-neu-100",
            "bg-neu-0/70 backdrop-blur-lg",
            "transition-opacity motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
            error || loading || !results.length
              ? "md:h-[100px]"
              : // headlessui adds max-height as style, use !important to override
                "md:!max-h-[min(calc(100vh-5rem),400px)]",
            "w-full md:w-[576px]",
            "empty:invisible",
          )
        }
      >
        {error ? (
          <span className="flex select-none justify-center gap-2 p-8 text-center text-sm text-red-500">
            <InformationCircleIcon className="size-5" />
            Failed to load search index.
          </span>
        ) : loading ? (
          <span className="flex select-none justify-center gap-2 p-8 text-center text-sm text-neu-500">
            <SpinnerIcon className="size-5 animate-spin" />
            Loading…
          </span>
        ) : results.length ? (
          results.map(searchResult => (
            <Fragment key={searchResult.id}>
              {searchResult.prefix}
              <ComboboxOption
                as={NextLink}
                value={searchResult}
                href={searchResult.route}
                className={({ focus }) =>
                  clsx(
                    "mx-2.5 break-words",
                    "contrast-more:border",
                    focus
                      ? "bg-pri-base/10 text-pri-base contrast-more:border-current dark:text-pri-light"
                      : "text-neu-800",
                    "block scroll-m-12 px-2.5 py-2",
                  )
                }
              >
                {searchResult.children}
              </ComboboxOption>
            </Fragment>
          ))
        ) : (
          value && (
            <span className="block select-none p-8 text-center text-sm text-neu-700">
              No results found.
            </span>
          )
        )}
      </ComboboxOptions>
    </Combobox>
  )
}
