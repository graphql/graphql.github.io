"use client"

import { clsx } from "clsx"
// @ts-expect-error we use a transitive-dependency and this one is vulnerable to context clash
import { useTheme } from "next-themes"
import { Select } from "@base-ui-components/react/select"
import { useMounted } from "nextra/hooks"

import MoonIcon from "@/app/conf/_design-system/pixelarticons/moon.svg?svgr"
import SunIcon from "@/app/conf/_design-system/pixelarticons/sun.svg?svgr"
import SystemIcon from "@/app/conf/_design-system/pixelarticons/system.svg?svgr"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"

const THEME_OPTIONS = ["light", "dark", "system"] as const
export type ThemeOption = (typeof THEME_OPTIONS)[number]

const OPTION_ICONS = {
  light: SunIcon,
  dark: MoonIcon,
  system: SystemIcon,
} as const

const isThemeOption = (value: unknown): value is ThemeOption =>
  value === "light" || value === "dark" || value === "system"

export interface ThemeSwitchProps {
  lite?: boolean
  className?: string
}

export function ThemeSwitch({ lite, className }: ThemeSwitchProps) {
  const { setTheme, resolvedTheme, theme } = useTheme()
  const mounted = useMounted()

  const selectedTheme = isThemeOption(theme) ? theme : "light"
  const currentTheme = mounted ? selectedTheme : "light"
  const resolved = mounted && resolvedTheme === "dark" ? "dark" : "light"
  const ResolvedThemeIcon = OPTION_ICONS[resolved]

  return (
    <Select.Root
      value={currentTheme}
      onValueChange={value => {
        if (isThemeOption(value)) {
          setTheme(value)
        }
      }}
    >
      <Select.Trigger
        aria-label="Change theme"
        title="Change theme"
        className={clsx(
          "gql-focus-visible relative cursor-pointer text-neu-800 transition-colors before:absolute before:-inset-2 hover:bg-neu-100 hover:text-neu-900 focus-visible:!-outline-offset-2 dark:text-neu-700 dark:hover:bg-neu-50/50",
          className,
        )}
      >
        <div className="flex items-center gap-2 border border-transparent p-[5px] [[aria-expanded=true]>&]:border-neu-300 [[aria-expanded=true]>&]:bg-neu-0 [[aria-expanded=true]>&]:dark:border-neu-100">
          <ResolvedThemeIcon height="16" />
          <Select.Value
            className={clsx(
              "text-sm capitalize leading-none",
              lite ? "sr-only" : "text-neu-800",
            )}
          />
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          className="z-20 outline-none"
          align="end"
          sideOffset={4}
        >
          <Select.Popup className="w-[120px] min-w-[var(--anchor-width)] border border-neu-200 bg-[rgb(var(--nextra-bg))] bg-neu-0 text-neu-900 shadow-sm outline-none dark:border-neu-100">
            <Select.List>
              {THEME_OPTIONS.map(option => {
                const Icon = OPTION_ICONS[option]
                return (
                  <Select.Item
                    key={option}
                    value={option}
                    style={{
                      paddingBlock: lite ? "10px" : "9px",
                    }}
                    className="mt-px flex cursor-pointer items-center gap-2 px-2 text-xs text-neu-800 first:mt-0 focus-visible:outline-none focus-visible:ring-0 data-[highlighted]:bg-neu-100 data-[highlighted]:text-neu-900 dark:text-neu-700 dark:data-[highlighted]:bg-neu-50/50"
                  >
                    <Icon height={14} />
                    <Select.ItemText className="capitalize leading-none">
                      {option}
                    </Select.ItemText>
                    <CheckIcon
                      height={16}
                      className="ml-auto hidden text-pri-base dark:text-pri-light [[data-selected]_&]:block"
                    />
                  </Select.Item>
                )
              })}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
