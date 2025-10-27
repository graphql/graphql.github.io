"use client"

import { clsx } from "clsx"
// @ts-expect-error we use a transitive-dependency and this one is vulnerable to context clash
import { useTheme } from "next-themes"
import { Select } from "@base-ui-components/react/select"
import { useMounted } from "nextra/hooks"

import MoonIcon from "@/app/conf/_design-system/pixelarticons/moon.svg?svgr"
import SunIcon from "@/app/conf/_design-system/pixelarticons/sun.svg?svgr"
import SystemIcon from "@/app/conf/_design-system/pixelarticons/system.svg?svgr"

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
          "gql-focus-visible -m-2 flex cursor-pointer items-center gap-2 p-2 text-neu-800 transition-colors hover:bg-neu-50 hover:text-neu-900 focus-visible:!-outline-offset-2 dark:text-neu-700 dark:hover:bg-neu-50/50",
          className,
        )}
      >
        <ResolvedThemeIcon height="16" />
        <Select.Value
          className={clsx(
            "text-sm capitalize leading-none",
            lite ? "sr-only" : "text-neu-700",
          )}
        />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="z-20 outline-none" sideOffset={4}>
          <Select.Popup className="min-w-[var(--anchor-width)] border border-neu-200 bg-[rgb(var(--nextra-bg))] p-1 text-neu-900 shadow-md outline-none dark:border-neu-100">
            <Select.List>
              {THEME_OPTIONS.map(option => {
                const Icon = OPTION_ICONS[option]
                const isSystem = Icon === SystemIcon
                return (
                  <Select.Item
                    key={option}
                    value={option}
                    className="mt-px flex cursor-pointer items-center gap-2 px-3 py-1.5 text-neu-800 first:mt-0 focus-visible:outline-none focus-visible:ring-0 data-[highlighted]:bg-neu-100 data-[highlighted]:text-neu-900 data-[selected]:text-neu-600 dark:text-neu-700 dark:data-[highlighted]:bg-neu-50"
                  >
                    <Icon
                      height={
                        // the icons are not fully proportional
                        isSystem ? "18" : "16"
                      }
                      className={isSystem ? "-mr-0.5 -translate-x-px" : ""}
                    />
                    <Select.ItemText className="capitalize leading-none">
                      {option}
                    </Select.ItemText>
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
