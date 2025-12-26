"use client"

import { NavigationMenu } from "@base-ui-components/react/navigation-menu"

import clsx from "clsx"
// eslint-disable-next-line no-restricted-imports -- since we don't need newWindow prop
import NextLink from "next/link"
import { Button } from "nextra/components"
import type * as normalizePages from "nextra/normalize-pages"
import React, { useEffect, type ReactElement, type ReactNode } from "react"
import { Anchor } from "@/app/conf/_design-system/anchor"

import MenuIcon from "@/app/conf/_design-system/pixelarticons/menu.svg?svgr"
import CloseIcon from "@/app/conf/_design-system/pixelarticons/close.svg?svgr"
import { GraphQLWordmarkLogo } from "../../icons"
import { ThemeSwitch } from "../theme-switch"
import { Flexsearch } from "../flexsearch"
import { NavLink, navLinkClasses } from "./nav-link"
import { useMenu } from "../use-menu"

type Item = normalizePages.PageItem | normalizePages.MenuItem
export interface NavBarProps {
  items: Item[]
}

function NavbarMenu({
  menu,
  children,
}: {
  menu: normalizePages.MenuItem
  children: ReactNode
}): ReactElement {
  const routes = Object.fromEntries(
    (menu.children || []).map(route => [route.name, route]),
  )
  return (
    <NavigationMenu.Item className="max-md:hidden">
      <NavigationMenu.Trigger
        className={clsx(
          navLinkClasses,
          "focus-visible:nextra-focusable flex items-center gap-1.5 whitespace-nowrap data-[popup-open]:underline max-md:hidden",
        )}
      >
        {children}
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="flex flex-col py-1 text-sm">
        {Object.entries(menu.items || {}).map(([key, item]) => (
          <NavigationMenu.Link
            key={key}
            href={item.href || routes[key]?.route}
            target={item.newWindow ? "_blank" : undefined}
            className="block py-3.5 pl-2 pr-9"
            closeOnClick
            render={(
              props: React.ComponentPropsWithoutRef<"a">,
              state: NavigationMenu.Link.State,
            ) => (
              <Anchor {...props} href={props.href!}>
                <span
                  className={clsx(
                    "typography-menu px-3 py-1 underline-offset-2 hover:underline focus-visible:underline",
                    state.active && "underline",
                  )}
                >
                  {item.title}
                </span>
              </Anchor>
            )}
          />
        ))}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

export interface NavbarProps extends NavBarProps {}
export function Navbar({ items }: NavbarProps): ReactElement {
  const { menu, setMenu } = useMenu()

  useEffect(
    () => () => {
      document.body.style.overflow = "auto"
    },
    [],
  )

  return (
    <div className="nextra-nav-container sticky top-0 z-20 w-full bg-transparent print:hidden">
      <BackdropBlur />
      <nav className="mx-auto flex h-[var(--nextra-navbar-height)] max-w-[120rem] items-center justify-end pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <NextLink
          href={"/"}
          className="nextra-focus flex items-center hover:opacity-75"
        >
          <GraphQLWordmarkLogo className="nextra-logo h-6" title="GraphQL" />
        </NextLink>
        <div className="flex-1" />
        <NavigationMenu.Root
          onValueChange={(value: string | null) => {
            document.body.style.overflow = value != null ? "hidden" : "auto"
          }}
          className="-mx-2 flex overflow-x-auto px-2 py-1.5 xl:absolute xl:left-1/2 xl:-translate-x-1/2"
        >
          <NavigationMenu.List className="flex w-full items-center gap-2">
            {items.map(pageOrMenu => {
              if (pageOrMenu.display === "hidden") return null

              if (pageOrMenu.type === "menu") {
                const menu = pageOrMenu as normalizePages.MenuItem
                return (
                  <NavbarMenu key={menu.title} menu={menu}>
                    {menu.title}
                  </NavbarMenu>
                )
              }
              const page = pageOrMenu as normalizePages.PageItem
              let href = page.href || page.route || "#"

              // If it's a directory
              if (page.children) {
                href =
                  (page.withIndexPage ? page.route : page.firstChildRoute) ||
                  href
              }

              return (
                <NavigationMenu.Item key={href} className="max-md:hidden">
                  <NavLink href={href} page={page} />
                </NavigationMenu.Item>
              )
            })}
          </NavigationMenu.List>
          <NavigationMenu.Portal keepMounted>
            <NavigationMenu.Backdrop className="fixed inset-0 top-[calc(var(--nextra-navbar-height)+1px)] !block bg-[rgb(var(--nextra-bg),.4)] opacity-100 backdrop-blur-[6.4px] transition-opacity data-[closed]:pointer-events-none data-[closed]:opacity-0" />
            <NavigationMenu.Positioner
              side="bottom"
              align="start"
              sideOffset={4}
              alignOffset={-8}
            >
              <NavigationMenu.Popup className="data-[closed]:animate-fade-out data-[open]:animate-fade-in">
                <NavigationMenu.Viewport className="nextra-scrollbar !max-h-[min(calc(100vh-5rem),256px)] overflow-visible transition-opacity focus-visible:outline-none motion-reduce:transition-none" />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        <Flexsearch
          className={
            "block select-none text-sm max-md:hidden [&>input::placeholder]:text-neu-700 [&>input]:bg-neu-0/[.55] [&>input]:text-neu-900"
          }
          setMenu={setMenu}
        />

        <ThemeSwitch lite className="max-lg:hidden [&_span]:hidden" />

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
