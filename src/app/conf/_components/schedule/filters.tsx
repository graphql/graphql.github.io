import { Menu, Popover, Transition } from "@headlessui/react"
import { clsx } from "clsx"
import { ChevronDown, X } from "lucide-react"

type FiltersProps = {
  categories: { name: string; options: string[] }[]
  filterState: Record<string, string[]>
  onFilterChange: (category: string, option: string, checked: boolean) => void
  onReset: () => void
}

export function Filters({
  categories,
  filterState,
  onFilterChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="flex justify-center gap-3 pb-10">
      {Object.values(filterState).flat().length > 0 && (
        <button
          onClick={onReset}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-900"
        >
          Reset filters <X className="inline-block size-4" />
        </button>
      )}
      <Menu as="div" className="relative inline-block text-left">
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md shadow-2xl ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              {categories.map(option => (
                <Menu.Item key={option.name}>
                  <span
                    className={clsx(
                      filterState[option.name].length > 0
                        ? "font-medium text-gray-900"
                        : "text-gray-500",
                    )}
                  >
                    {option.name}
                  </span>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Popover.Group className="flex items-baseline space-x-8">
        {categories.map((section, sectionIdx) => (
          <Popover
            as="div"
            key={section.name}
            id={`desktop-menu-${sectionIdx}`}
            className="relative inline-block text-left"
          >
            <Popover.Button className="group inline-flex cursor-pointer items-center justify-center bg-inherit p-1 px-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              <span>{section.name}</span>
              {filterState[section.name].length ? (
                <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                  {filterState[section.name].length}
                </span>
              ) : null}
              <ChevronDown
                className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Popover.Button>

            <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-lg focus:outline-none">
              <form className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option} className="flex items-center gap-3">
                    <input
                      id={`filter-${section.name}-${optionIdx}`}
                      name={`${section.name}[]`}
                      defaultValue={option}
                      onChange={e => {
                        const { checked, value } = e.target
                        onFilterChange(section.name, value, checked)
                      }}
                      checked={filterState[section.name].includes(option)}
                      type="checkbox"
                      className="size-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.name}-${optionIdx}`}
                      className="cursor-pointer whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </form>
            </Popover.Panel>
          </Popover>
        ))}
      </Popover.Group>
    </div>
  )
}
