import React from "react"
import { Menu, Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

type FiltersProps = {
  categories: Array<{ name: string; options: string[] }>
  filterState: Record<string, string[]>
  onFilterChange: (category: string, option: string, checked: boolean) => void
}

export default function Filters({
  categories,
  filterState,
  onFilterChange,
}: FiltersProps) {
  return (
    <div className="">
      <div aria-labelledby="filter-heading">
        <div className="border-b border-gray-200  pb-4">
          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {categories.map(option => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <span
                            className={clsx(
                              filterState[option.name].length > 0
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </span>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="">
              <div className="flow-root">
                <Popover.Group className="flex items-baseline space-x-8">
                  {categories.map((section, sectionIdx) => (
                    <Popover
                      as="div"
                      key={section.name}
                      id={`desktop-menu-${sectionIdx}`}
                      className="relative inline-block text-left"
                    >
                      <div>
                        <Popover.Button className="bg-inherit p-1 px-2 group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          <span>{section.name}</span>
                          {filterState[section.name].length ? (
                            <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                              {filterState[section.name].length}
                            </span>
                          ) : null}
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Popover.Button>
                      </div>

                      <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-lg border border-black focus:outline-none">
                        <form className="space-y-4 border border-black">
                          {section.options.map((option, optionIdx) => (
                            <div key={option} className="flex items-center">
                              <input
                                id={`filter-${section.name}-${optionIdx}`}
                                name={`${section.name}[]`}
                                defaultValue={option}
                                onChange={e => {
                                  const { checked, value } = e.target
                                  onFilterChange(section.name, value, checked)
                                }}
                                checked={filterState[section.name].includes(
                                  option
                                )}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.name}-${optionIdx}`}
                                className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
