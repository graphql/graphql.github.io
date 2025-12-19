import { clsx } from "clsx"
import { ReactNode } from "react"

export interface InfoCardLabelRow {
  type: "label"
  label: ReactNode
  hideInConciseMode?: boolean
}

export interface InfoCardTitleRow {
  type: "title"
  title: ReactNode
  hideInConciseMode?: boolean
}

export interface InfoCardImageRow {
  type: "image"
  imageUrl: string
  alt?: string
  hideInConciseMode?: boolean
}

export type InfoCardRow = InfoCardLabelRow | InfoCardTitleRow | InfoCardImageRow

export interface InfoCardProps {
  rows: InfoCardRow[]
  className?: string
  concise?: boolean
}

export function InfoCardRow({ row }: { row: InfoCardRow }) {
  switch (row.type) {
    case "label": {
      return (
        <div className="flex h-auto items-start justify-between gap-2 border-b border-neu-200 p-4 text-neu-700 dark:border-neu-100 dark:text-neu-600">
          {row.label}
        </div>
      )
    }
    case "title": {
      return (
        <div className="typography-h3 flex min-h-[124px] flex-1 flex-col justify-center px-4 py-6 text-neu-900">
          {row.title}
        </div>
      )
    }
    case "image": {
      return (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={row.imageUrl}
            alt={row.alt}
            className="size-full object-cover"
          />
        </div>
      )
    }
  }
}

export function InfoCard({ rows, concise, className }: InfoCardProps) {
  return (
    <div
      className={clsx(
        "gql-focus-visible group flex w-[240px] flex-col overflow-hidden border border-neu-200 bg-neu-0 text-left text-current no-underline ring-neu-400 dark:border-neu-100 dark:ring-neu-100",
        className,
      )}
    >
      <div className="flex flex-1 flex-col">
        {rows.map((row, i) =>
          !concise || !row.hideInConciseMode ? (
            <InfoCardRow key={i} row={row} />
          ) : null,
        )}
      </div>
    </div>
  )
}
