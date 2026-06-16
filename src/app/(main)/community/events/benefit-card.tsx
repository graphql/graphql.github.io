import { ReactNode } from "react"

export function BenefitCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <article className="flex h-full flex-col gap-6 border border-neu-200 bg-neu-0 p-6 text-left dark:border-neu-100">
      {icon}
      <div className="flex flex-col gap-3 text-neu-900">
        <h3 className="text-[20px] font-normal leading-tight">{title}</h3>
        <p className="typography-body-md text-neu-800">{description}</p>
      </div>
    </article>
  )
}
