import { MenuItem, Menu, MenuButton, MenuItems } from "@headlessui/react"
import clsx from "clsx"
// eslint-disable-next-line no-restricted-imports -- since we don't need newWindow prop
import NextLink from "next/link"
import { Button } from "nextra/components"
import { useFSRoute } from "nextra/hooks"
import type * as normalizePages from "nextra/normalize-pages"
import { Fragment, useState, type ReactElement, type ReactNode } from "react"
import { useMenu, useThemeConfig } from "nextra-theme-docs"
import { Anchor } from "@/app/conf/_design-system/anchor"
import { renderComponent } from "@/components/utils/render-component"

import MenuIcon from "@/app/conf/_design-system/pixelarticons/menu.svg?svgr"
import CloseIcon from "@/app/conf/_design-system/pixelarticons/close.svg?svgr"

type Item = normalizePages.PageItem | normalizePages.MenuItem
export interface NavBarProps {
  items: Item[]
}

const classes = {
  link: "typography-menu flex items-center text-neu-900 px-3 py-1 nextra-focus [text-box:trim-both_cap_alphabetic] leading-none hover:underline underline-offset-2",
}

function NavbarMenu({
  menu,
  children,
  onSubmenuOpen,
}: {
  menu: normalizePages.MenuItem
  children: ReactNode
  onSubmenuOpen: (open: boolean) => void
}): ReactElement {
  const routes = Object.fromEntries(
    (menu.children || []).map(route => [route.name, route]),
  )
  return (
    <Menu>
      <MenuButton as={Fragment}>
        {({ focus, open }) => {
          // I'm sorry, I know this is so cursed.
          // I need to migrate out of HeadlessUI to something with change handlers.
          onSubmenuOpen(open)

          return (
            <button
              onClick={() => onSubmenuOpen(open)}
              className={clsx(
                classes.link,
                "flex items-center gap-1.5 whitespace-nowrap max-md:hidden",
                focus && "nextra-focusable",
              )}
            >
              {children}
            </button>
          )
        }}
      </MenuButton>
      <MenuItems
        transition
        modal={false}
        className={({ open }) =>
          // eslint-disable-next-line tailwindcss/no-custom-classname
          clsx(
            "gql-navbar-menu-items",
            "motion-reduce:transition-none",
            "focus-visible:outline-none",
            open ? "opacity-100" : "opacity-0",
            "nextra-scrollbar overflow-visible transition-opacity",
            "z-20 rounded-md py-1 text-sm",
            // headlessui adds max-height as style, use !important to override
            "!max-h-[min(calc(100vh-5rem),256px)]",
          )
        }
        anchor={{ to: "top start", gap: 21, padding: 16, offset: -8 }}
      >
        {Object.entries(menu.items || {}).map(([key, item]) => (
          <MenuItem key={key}>
            <Anchor
              href={item.href || routes[key]?.route}
              className="block py-1.5 pl-2 pr-9"
              target={item.newWindow ? "_blank" : undefined}
            >
              <span className="typography-menu px-3 py-1 underline-offset-2 [[data-active]>&]:underline">
                {item.title}
              </span>
            </Anchor>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

export function Navbar({ items }: NavBarProps): ReactElement {
  const themeConfig = useThemeConfig()

  const activeRoute = useFSRoute()
  const { menu, setMenu } = useMenu()
  const [submenuOpen, setSubmenuOpen] = useState(false)

  return (
    <div
      className={clsx(
        "nextra-nav-container top-0 z-20 w-full bg-transparent print:hidden",
        activeRoute === "/" ? "fixed" : "sticky",
      )}
    >
      <BackdropBlur />
      <nav className="mx-auto flex h-[var(--nextra-navbar-height)] max-w-[120rem] items-center justify-end pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        {themeConfig.logoLink ? (
          <NextLink
            href={
              typeof themeConfig.logoLink === "string"
                ? themeConfig.logoLink
                : "/"
            }
            className="nextra-focus flex items-center hover:opacity-75"
          >
            {renderComponent(themeConfig.logo)}
          </NextLink>
        ) : (
          <div className="flex items-center">
            {renderComponent(themeConfig.logo)}
          </div>
        )}
        <div className="flex-1" />
        <div className="-mx-2 flex overflow-x-auto px-2 py-1.5 lg:gap-2 xl:absolute xl:left-1/2 xl:-translate-x-1/2">
          {items.map(pageOrMenu => {
            if (pageOrMenu.display === "hidden") return null

            if (pageOrMenu.type === "menu") {
              const menu = pageOrMenu as normalizePages.MenuItem
              return (
                <NavbarMenu
                  key={menu.title}
                  menu={menu}
                  onSubmenuOpen={open => {
                    if (typeof window !== "undefined") {
                      if (open) {
                        document.body.style.overflow = "hidden"
                      } else {
                        document.body.style.overflow = "auto"
                      }
                    }
                    setSubmenuOpen(open)
                  }}
                >
                  {menu.title}
                </NavbarMenu>
              )
            }
            const page = pageOrMenu as normalizePages.PageItem
            let href = page.href || page.route || "#"

            // If it's a directory
            if (page.children) {
              href =
                (page.withIndexPage ? page.route : page.firstChildRoute) || href
            }

            const isActive =
              page.route === activeRoute ||
              activeRoute.startsWith(page.route + "/")

            return (
              <Anchor
                href={href}
                key={href}
                className={clsx(
                  classes.link,
                  "whitespace-nowrap max-md:hidden",
                  isActive && !page.newWindow && "underline",
                )}
                target={page.newWindow ? "_blank" : undefined}
                aria-current={!page.newWindow && isActive}
              >
                {page.title}
              </Anchor>
            )
          })}
        </div>

        {process.env.NEXTRA_SEARCH &&
          renderComponent(themeConfig.search.component, {
            className:
              "max-md:_hidden [&>input]:bg-neu-0/[.55] [&>input::placeholder]:text-neu-700 [&>input]:text-neu-900",
          })}

        {themeConfig.project.link ? (
          <Anchor href={themeConfig.project.link}>
            {renderComponent(themeConfig.project.icon)}
          </Anchor>
        ) : null}

        {themeConfig.chat.link ? (
          <Anchor href={themeConfig.chat.link}>
            {renderComponent(themeConfig.chat.icon)}
          </Anchor>
        ) : null}

        {renderComponent(themeConfig.navbar.extraContent)}

        <Button
          aria-label="Menu"
          className={({ active }) =>
            clsx(
              "nextra-hamburger p-2 text-pri-base md:hidden",
              active && "bg-neu-400/20",
            )
          }
          onClick={() => setMenu(!menu)}
        >
          {menu ? (
            <CloseIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </Button>
      </nav>
      <SubmenuBackdrop className={submenuOpen ? "opacity-100" : "opacity-0"} />
    </div>
  )
}

function BackdropBlur() {
  const thickness = "1px"

  const mask = "linear-gradient(to bottom, #000 0% 50%, transparent 50% 100%)"
  const edgeMask = `linear-gradient(to bottom, black 0, black ${thickness}, transparent ${thickness})`
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10 h-[200%] backdrop-blur-[6.4px]"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          background:
            "linear-gradient(to bottom,rgb(var(--nextra-bg),.97) 0%, rgb(var(--nextra-bg),.5) 50% 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 h-full translate-y-full bg-white/10"
        style={{
          backdropFilter: "blur(8px) brightness(120%) saturate(113%)",
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
        }}
      />
    </>
  )
}

export function NavbarPlaceholder({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // placeholder: the colors here on `before` must match the ones on Hero `before` strip
      className={clsx(
        "absolute h-[calc(var(--nextra-navbar-height)+1px)] w-full before:absolute before:top-0 before:h-[calc(var(--nextra-navbar-height)+1px)] before:w-full",
        className,
      )}
      {...rest}
    />
  )
}

function SubmenuBackdrop({ className }: { className: string }) {
  return (
    <div
      className={clsx(
        "pointer-events-none fixed inset-0 top-[calc(var(--nextra-navbar-height)+1px)] bg-[rgb(var(--nextra-bg),.4)] backdrop-blur-[6.4px] transition-opacity",
        className,
      )}
    />
  )
}
