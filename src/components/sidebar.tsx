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
  useMenu,
  useThemeConfig,
  Collapse,
  LocaleSwitch,
} from "nextra-theme-docs"

import ArrowBarLeft from "@/app/conf/_design-system/pixelarticons/arrow-bar-left.svg?svgr"
import { Anchor } from "@/app/conf/_design-system/anchor"

import { renderComponent } from "./utils/render-component"
import { ThemeSwitch } from "./theme-switch"

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
    "_flex _px-2 _py-1.5 _text-sm _transition-colors [word-break:break-word]",
    "_cursor-pointer contrast-more:border contrast-more:hover:underline gql-focus-visible focus-visible:outline-offset-1",
  ),
  inactive: cn(
    "text-neu-800 hover:bg-neu-100 hover:text-neu-900 hover:bg-neu-100 dark:hover:bg-neu-50/50",
    "contrast-more:border-transparent",
  ),
  active: cn(
    "bg-pri-lighter/25 text-pri-dark dark:bg-pri-light/10 dark:text-pri-light",
    "contrast-more:_border-primary-500 contrast-more:dark:_border-primary-500",
  ),
  list: cn("_flex _flex-col _gap-1"),
  border: cn(
    "_relative before:_absolute before:_inset-y-1",
    'before:_w-px before:bg-neu-100 before:_content-[""] dark:before:bg-neu-50',
    "ltr:_pl-3 ltr:before:_left-0 rtl:_pr-3 rtl:before:_right-0",
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
      const route = routes[key] || {
        name: key,
        route: menu.route + "/" + key,
      }
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
          "_items-center _justify-between _gap-2",
          !isLink && "_text-left _w-full",
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
        <ArrowRightIcon
          height="18"
          className={cn(
            "_shrink-0",
            "_p-0.5 hover:bg-neu-100/5",
            "motion-reduce:*:_transition-none *:_origin-center *:_transition-transform *:rtl:_-rotate-180",
            open && "*:ltr:_rotate-90 *:rtl:_rotate-[-270deg]",
          )}
        />
      </ComponentToUse>
      {Array.isArray(item.children) && (
        <Collapse isOpen={open}>
          <Menu
            className={cn(classes.border, "_pt-1 ltr:_ml-3 rtl:_mr-3")}
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
          ? "typography-body-sm mb-2 px-2 py-1.5 font-semibold text-neu-800 [&:not(:first-child)]:mt-5"
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
}): ReactElement {
  const route = useFSRoute()

  // It is possible that the item doesn't have any route - for example an external link.
  const active = item.route && [route, route + "/"].includes(item.route + "/")
  const activeAnchor = useActiveAnchor()
  const { setMenu } = useMenu()

  if (item.type === "separator") {
    return <Separator title={item.title} />
  }

  return (
    <li className={cn(classes.list, { active })}>
      <Anchor
        href={(item as PageItem).href || item.route}
        className={cn(classes.link, active ? classes.active : classes.inactive)}
        onClick={() => {
          setMenu(false)
        }}
        onFocus={onFocus}
      >
        {item.title}
      </Anchor>
      {active && anchors.length > 0 && (
        <ul className={cn(classes.list, classes.border, "ltr:_ml-3 rtl:_mr-3")}>
          {anchors.map(({ id, value }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  classes.link,
                  '_flex _gap-2 before:_opacity-25 before:_content-["#"]',
                  activeAnchor[id]?.isActive
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
  const [showToggleAnimation, setToggleAnimation] = useState(false)

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
        <div className="max-xl:_hidden _h-0 _w-64 _shrink-0" />
      )}
      <div
        className={cn(
          "[transition:background-color_1.5s_ease]",
          menu
            ? "max-md:_bg-black/80 max-md:dark:_bg-black/60 _fixed _inset-0 _z-10"
            : "_bg-transparent",
        )}
        onClick={() => setMenu(false)}
      />
      <aside
        className={cn(
          "nextra-sidebar-container _flex _flex-col",
          "md:_top-16 md:_shrink-0 motion-reduce:_transform-none motion-reduce:_transition-none",
          "[.resizing_&]:_transition-none",
          "_transform-gpu _transition-all _ease-in-out",
          "print:_hidden",
          showSidebar ? "md:_w-64" : "md:_w-20",
          asPopover ? "md:_hidden" : "md:_sticky md:_self-start",
          menu
            ? "max-md:[transform:translate3d(0,0,0)]"
            : "max-md:[transform:translate3d(0,-100%,0)]",
        )}
        ref={containerRef}
      >
        {process.env.NEXTRA_SEARCH && (
          <div className="_px-4 _pt-4 md:_hidden">
            {renderComponent(themeConfig.search.component)}
          </div>
        )}
        <FocusedItemContext.Provider value={focused}>
          <OnFocusItemContext.Provider value={setFocused}>
            <div
              className={cn(
                "_overflow-y-auto",
                "_p-4 _grow md:_h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))]",
                showSidebar ? "nextra-scrollbar" : "no-scrollbar",
              )}
              ref={sidebarRef}
            >
              {/* without asPopover check <Collapse />'s inner.clientWidth on `layout: "raw"` will be 0 and element will not have width on initial loading */}
              {(!asPopover || !showSidebar) && (
                <Collapse isOpen={showSidebar} horizontal>
                  <Menu
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className="nextra-menu-desktop max-md:_hidden"
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
                  className="nextra-menu-mobile md:_hidden"
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
            showToggleAnimation={showToggleAnimation}
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
  showToggleAnimation = false,
  hasI18n = false,
  setToggleAnimation,
  className,
  hiddenOnMobile = true,
}: {
  showSidebar: boolean
  setSidebar: (show: boolean) => void
  showToggleAnimation?: boolean
  hasI18n?: boolean
  setToggleAnimation?: (show: boolean) => void
  className?: string
  hiddenOnMobile?: boolean
}) {
  const themeConfig = useThemeConfig()

  return (
    <div
      className={cn(
        "nextra-sidebar-footer sticky bottom-0",
        "flex items-center gap-2 py-4",
        "mx-3 px-1", // to hide focused sidebar links
        showSidebar
          ? hasI18n && "justify-end"
          : "flex-col flex-wrap justify-center py-4",
        className,
      )}
      data-toggle-animation={
        showToggleAnimation ? (showSidebar ? "show" : "hide") : "off"
      }
    >
      <LocaleSwitch
        lite={!showSidebar}
        className={showSidebar ? "_grow" : "max-md:_grow"}
      />
      <div className={showSidebar && !hasI18n ? "_grow _flex _flex-col" : ""}>
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
            setToggleAnimation?.(true)
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
