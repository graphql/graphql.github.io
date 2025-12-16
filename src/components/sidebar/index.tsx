"use client"

/**
 * @file sidebar module extracted from Nextra 3.3.1
 */

import cn, { clsx } from "clsx"
import type { Heading } from "nextra"
import { Button } from "nextra/components"
import { useFSRoute, useMounted } from "nextra/hooks"
import { ArrowRightIcon } from "nextra/icons"
import type { Item, MenuItem, PageItem } from "nextra/normalize-pages"
import type { FocusEventHandler, ReactElement } from "react"
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import scrollIntoView from "scroll-into-view-if-needed"
import {
  useActiveAnchor,
  useThemeConfig,
  Collapse,
  ActiveAnchor,
} from "nextra-theme-docs"

import ArrowBarLeft from "@/app/conf/_design-system/pixelarticons/arrow-bar-left.svg?svgr"
import { Anchor } from "@/app/conf/_design-system/anchor"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import CaretDownIcon from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"

import { renderComponent } from "../utils/render-component"
import { ThemeSwitch } from "../theme-switch"
import { Flexsearch } from "../flexsearch"
import { useMenu } from "../use-menu"

const TreeState: Record<string, boolean> = Object.create(null)

const FocusedItemContext = createContext("")
FocusedItemContext.displayName = "FocusedItem"
const OnFocusItemContext = createContext<(route: string) => void>(() => {})
OnFocusItemContext.displayName = "OnFocusItem"
const FolderLevelContext = createContext(0)
FolderLevelContext.displayName = "FolderLevel"

const Folder = memo(function FolderInner(props: FolderProps) {
  const level = useContext(FolderLevelContext)
  return (
    <FolderLevelContext.Provider value={level + 1}>
      <FolderImpl {...props} />
    </FolderLevelContext.Provider>
  )
})

const classes = {
  link: cn(
    "flex px-2 capitalize py-1.5 text-sm transition-colors [word-break:break-word]",
    "cursor-pointer contrast-more:border contrast-more:hover:underline gql-focus-visible focus-visible:outline-offset-1",
  ),
  inactive: cn(
    "text-neu-800 hover:bg-neu-100 hover:text-neu-900 hover:bg-neu-100 dark:hover:bg-neu-50/50",
    "contrast-more:border-transparent",
  ),
  active: cn(
    "bg-pri-lighter/25 text-pri-dark dark:bg-pri-light/10 dark:text-pri-light",
    "contrast-more:border-primary-500 contrast-more:dark:border-primary-500",
  ),
  list: cn("flex flex-col gap-1"),
  border: cn(
    "relative before:absolute before:inset-y-1",
    'before:w-px before:bg-neu-100 before:content-[""] dark:before:bg-neu-50',
    "pl-3 before:left-0",
  ),
}

type FolderProps = {
  item: PageItem | MenuItem | Item
  anchors: Heading[]
  onFocus: FocusEventHandler
}

function FolderImpl({ item, anchors, onFocus }: FolderProps): ReactElement {
  const routeOriginal = useFSRoute()
  const [route] = routeOriginal.split("#")
  const hasRoute = !!item.route // for item.type === 'menu' will be ''
  const active = hasRoute && [route, route + "/"].includes(item.route + "/")
  const activeRouteInside =
    active || (hasRoute && route.startsWith(item.route + "/"))

  const focusedRoute = useContext(FocusedItemContext)
  const focusedRouteInside = focusedRoute.startsWith(item.route + "/")
  const level = useContext(FolderLevelContext)

  const { setMenu } = useMenu()
  const { theme } = item as Item
  const themeConfig = useThemeConfig()

  const open =
    TreeState[item.route] === undefined
      ? active ||
        activeRouteInside ||
        focusedRouteInside ||
        (theme && "collapsed" in theme
          ? !theme.collapsed
          : level < themeConfig.sidebar.defaultMenuCollapseLevel)
      : TreeState[item.route] || focusedRouteInside

  const rerender = useState({})[1]

  useEffect(() => {
    function updateTreeState() {
      if (activeRouteInside || focusedRouteInside) {
        TreeState[item.route] = true
      }
    }

    function updateAndPruneTreeState() {
      if (activeRouteInside && focusedRouteInside) {
        TreeState[item.route] = true
      } else {
        delete TreeState[item.route]
      }
    }

    if (themeConfig.sidebar.autoCollapse) {
      updateAndPruneTreeState()
    } else {
      updateTreeState()
    }
  }, [
    activeRouteInside,
    focusedRouteInside,
    item.route,
    themeConfig.sidebar.autoCollapse,
  ])

  if (item.type === "menu") {
    const menu = item as MenuItem
    const routes = Object.fromEntries(
      (menu.children || []).map(route => [route.name, route]),
    )
    item.children = Object.entries(menu.items || {}).map(([key, item]) => {
      if (typeof item === "string") item = { title: item }
      if (!item.title) item.title = key

      const route = routes[key] || {
        name: key,
        route: menu.route + "/" + key,
      }

      if (key === "index") route.route = menu.route

      return {
        ...route,
        ...item,
      }
    })
  }

  const isLink = "withIndexPage" in item && item.withIndexPage
  // use button when link don't have href because it impacts on SEO
  const ComponentToUse = isLink ? Anchor : Button

  return (
    <li className={cn({ open, active })}>
      <ComponentToUse
        href={
          isLink
            ? item.route
            : // at this point we know the component is Button
              (undefined as unknown as string)
        }
        data-href={isLink ? undefined : item.route}
        className={cn(
          "items-center justify-between gap-2",
          !isLink && "w-full text-left",
          classes.link,
          active ? classes.active : classes.inactive,
        )}
        onClick={e => {
          const clickedToggleIcon = ["svg", "path"].includes(
            (e.target as HTMLElement).tagName.toLowerCase(),
          )
          if (clickedToggleIcon) {
            e.preventDefault()
          }
          if (isLink) {
            // If it's focused, we toggle it. Otherwise, always open it.
            if (active || clickedToggleIcon) {
              TreeState[item.route] = !open
            } else {
              TreeState[item.route] = true
              setMenu(false)
            }
            rerender({})
            return
          }
          if (active) return
          TreeState[item.route] = !open
          rerender({})
        }}
        onFocus={onFocus}
      >
        {item.title}
        <CaretDownIcon
          className={cn(
            "size-5 shrink-0 fill-neu-800 p-0.5 hover:bg-neu-100/5",
            "origin-center transition-transform motion-reduce:*:transition-none",
            !open && "-rotate-90",
          )}
        />
      </ComponentToUse>
      {Array.isArray(item.children) && (
        <Collapse isOpen={open}>
          <Menu
            className={cn(classes.border, "ml-3 pt-1")}
            directories={item.children}
            base={item.route}
            anchors={anchors}
          />
        </Collapse>
      )}
    </li>
  )
}

function Separator({ title }: { title: string }): ReactElement {
  return (
    <li
      className={cn(
        "[word-break:break-word]",
        title
          ? "typography-body-sm mb-2 px-2 py-1.5 font-semibold text-neu-800 max-md:first:hidden [&:not(:first-child)]:mt-5"
          : "my-4",
      )}
    >
      {title ? (
        renderComponent(title)
      ) : (
        <hr className="mx-2 border-t border-neu-200 dark:border-neu-50" />
      )}
    </li>
  )
}

function File({
  item,
  anchors,
  onFocus,
}: {
  item: PageItem | Item
  anchors: Heading[]
  onFocus: FocusEventHandler
}) {
  const route = useFSRoute()

  // It is possible that the item doesn't have any route - for example an external link.
  const active = item.route && [route, route + "/"].includes(item.route + "/")
  /**
   * we don't have this bug in staging, but this crashed in prod
   * todo: clear this up when we investigate why that happened only in prod
   */
  const activeAnchor = useActiveAnchor() as ActiveAnchor | null
  const { setMenu } = useMenu()

  if (item.type === "hidden") {
    return null
  }

  if (item.type === "separator") {
    return <Separator title={item.title} />
  }

  return (
    <li className={cn(classes.list, { active })}>
      <Anchor
        href={(item as PageItem).href || item.route}
        className={cn(
          classes.link,
          active ? classes.active : classes.inactive,
          item.name === "index" && "flex items-center gap-2",
        )}
        onClick={() => {
          setMenu(false)
        }}
        onFocus={onFocus}
      >
        {item.name !== "index" ? (
          item.title
        ) : (
          <>
            Explore {item.title}
            <ArrowDownIcon className="ml-auto mr-0.5 size-4 -rotate-90" />
          </>
        )}
      </Anchor>
      {active && anchors.length > 0 && (
        <ul className={cn(classes.list, classes.border, "ml-3")}>
          {anchors.map(({ id, value }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  classes.link,
                  'flex gap-2 before:opacity-25 before:content-["#"]',
                  activeAnchor?.[id]?.isActive
                    ? classes.active
                    : classes.inactive,
                )}
                onClick={() => {
                  setMenu(false)
                }}
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

interface MenuProps {
  directories: PageItem[] | Item[]
  anchors: Heading[]
  base?: string
  className?: string
  onlyCurrentDocs?: boolean
}

function Menu({
  directories,
  anchors,
  className,
  onlyCurrentDocs,
}: MenuProps): ReactElement {
  const onFocus = useContext(OnFocusItemContext)

  const handleFocus: FocusEventHandler = useCallback(
    event => {
      const route =
        event.target.getAttribute("href") ||
        event.target.getAttribute("data-href") ||
        ""
      onFocus(route)
    },
    [onFocus],
  )

  return (
    <ul className={cn(classes.list, className)}>
      {directories.map(item => {
        if (onlyCurrentDocs && !item.isUnderCurrentDocsTree) return

        const ComponentToUse =
          item.type === "menu" ||
          (item.children && (item.children.length || !item.withIndexPage))
            ? Folder
            : File

        return (
          <ComponentToUse
            key={item.name}
            item={item}
            anchors={anchors}
            onFocus={handleFocus}
          />
        )
      })}
    </ul>
  )
}

interface SideBarProps {
  docsDirectories: PageItem[]
  fullDirectories: Item[]
  asPopover?: boolean
  toc: Heading[]
  includePlaceholder: boolean
}

export function Sidebar({
  docsDirectories,
  fullDirectories,
  asPopover = false,
  toc,
  includePlaceholder,
}: SideBarProps): ReactElement {
  const { menu, setMenu } = useMenu()
  const [focused, setFocused] = useState("")
  const [showSidebar, setSidebar] = useState(true)

  const anchors = useMemo(() => toc.filter(v => v.depth === 2), [toc])
  const sidebarRef = useRef<HTMLDivElement>(null!)
  const containerRef = useRef<HTMLDivElement>(null!)
  const mounted = useMounted()

  useEffect(() => {
    const activeElement = sidebarRef.current.querySelector("li.active")

    if (activeElement && (window.innerWidth > 767 || menu)) {
      const scroll = () => {
        scrollIntoView(activeElement, {
          block: "center",
          inline: "center",
          scrollMode: "always",
          boundary: containerRef.current,
        })
      }
      if (menu) {
        // needs for mobile since menu has transition transform
        setTimeout(scroll, 300)
      } else {
        scroll()
      }
    }
  }, [menu])

  const themeConfig = useThemeConfig()
  const hasI18n = themeConfig.i18n.length > 0
  const hasMenu =
    themeConfig.darkMode || hasI18n || themeConfig.sidebar.toggleButton

  return (
    <>
      {includePlaceholder && asPopover && (
        <div className="h-0 w-64 shrink-0 max-xl:hidden" />
      )}
      <div
        className={cn(
          "[transition:background-color_1.5s_ease]",
          menu
            ? "fixed inset-0 z-10 max-md:bg-black/80 max-md:dark:bg-black/60"
            : "bg-transparent",
        )}
        onClick={() => setMenu(false)}
      />
      <aside
        className={cn(
          "nextra-sidebar-container flex flex-col",
          "motion-reduce:transform-none motion-reduce:transition-none md:top-16 md:shrink-0",
          "[.resizing_&]:transition-none",
          "transition-gpu ease-in-out",
          "print:hidden",
          showSidebar ? "md:w-64" : "md:w-20",
          asPopover ? "md:hidden" : "md:sticky md:self-start",
          menu
            ? "max-md:[transform:translate3d(0,0,0)]"
            : "max-md:[transform:translate3d(0,-100%,0)]",
        )}
        ref={containerRef}
      >
        <div className="px-4 pt-4 md:hidden">
          <Flexsearch
            className="block select-none text-sm text-neu-500"
            setMenu={setMenu}
          />
        </div>
        <FocusedItemContext.Provider value={focused}>
          <OnFocusItemContext.Provider value={setFocused}>
            <div
              className={cn(
                "overflow-y-auto",
                "grow p-4 md:h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))] xl:pl-0",
                showSidebar ? "nextra-scrollbar" : "no-scrollbar",
              )}
              ref={sidebarRef}
            >
              {/* without asPopover check <Collapse />'s inner.clientWidth on `layout: "raw"` will be 0 and element will not have width on initial loading */}
              {(!asPopover || !showSidebar) && (
                <Collapse isOpen={showSidebar} horizontal>
                  <Menu
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className="nextra-menu-desktop max-md:hidden"
                    // The sidebar menu, shows only the docs directories.
                    directories={docsDirectories}
                    // When the viewport size is larger than `md`, hide the anchors in
                    // the sidebar when `floatTOC` is enabled.
                    anchors={themeConfig.toc.float ? [] : anchors}
                    onlyCurrentDocs
                  />
                </Collapse>
              )}
              {mounted && window.innerWidth < 768 && (
                <Menu
                  className="nextra-menu-mobile md:hidden"
                  // The mobile dropdown menu, shows all the directories.
                  directories={fullDirectories}
                  // Always show the anchor links on mobile (`md`).
                  anchors={anchors}
                />
              )}
            </div>
          </OnFocusItemContext.Provider>
        </FocusedItemContext.Provider>

        {hasMenu && (
          <SidebarFooter
            showSidebar={showSidebar}
            setSidebar={setSidebar}
            hasI18n={hasI18n}
          />
        )}
      </aside>
    </>
  )
}

export function SidebarFooter({
  showSidebar,
  setSidebar,
  hasI18n = false,
  className,
  hiddenOnMobile = true,
}: {
  showSidebar: boolean
  setSidebar: (show: boolean) => void
  hasI18n?: boolean
  className?: string
  hiddenOnMobile?: boolean
}) {
  const themeConfig = useThemeConfig()

  return (
    <div
      className={cn(
        "nextra-sidebar-footer sticky bottom-0 mx-3 flex items-center gap-2 px-1 py-4 xl:ml-0.5 xl:mr-0 xl:px-0",
        showSidebar
          ? hasI18n && "justify-end"
          : "flex-col flex-wrap justify-center py-4",
        className,
      )}
    >
      <div className={showSidebar && !hasI18n ? "flex grow flex-col" : ""}>
        <ThemeSwitch lite={!showSidebar} />
      </div>
      {themeConfig.sidebar.toggleButton && (
        <Button
          title={showSidebar ? "Hide sidebar" : "Show sidebar"}
          className={clsx(
            "p-2 text-neu-800 hover:bg-neu-100 hover:text-neu-900 dark:hover:bg-neu-500/5",
            hiddenOnMobile && "max-md:hidden",
          )}
          onClick={() => {
            setSidebar(!showSidebar)
          }}
        >
          <ArrowBarLeft
            className={cn("size-5", !showSidebar && "rotate-180")}
          />
        </Button>
      )}
    </div>
  )
}
