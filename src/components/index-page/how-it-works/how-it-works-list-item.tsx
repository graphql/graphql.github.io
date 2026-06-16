export function HowItWorksListItem({
  text,
  code,
  icon,
}: {
  text: React.ReactNode
  code: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <li className="flex flex-col [counter-increment:list-item]">
      <div className="typography-body-md flex items-center bg-neu-0 py-4 pr-2 before:typography-body-sm before:mr-2 before:inline-flex before:size-5 before:translate-y-[-0.5px] before:items-center before:justify-center before:bg-neu-200 before:p-1 before:text-neu-800 before:content-[counter(list-item)] dark:before:bg-neu-50 md:p-6">
        {text}
        {icon}
      </div>
      <div className="mt-px flex-1 bg-neu-0 text-sm/[21px] [--cm-background:transparent] md:[&_:is(.cm-line,.nextra-code>span)]:!pl-5 md:[&_:is(pre,.cm-content)]:!pt-5 max-md:[&_code>span]:!pl-0 [&_pre]:border-none [&_pre]:ring-0">
        {code}
      </div>
    </li>
  )
}
