import { Button } from "@/app/conf/_design-system/button"
import { clsx } from "clsx"
import { GET_TICKETS_LINK } from "../../links"

export interface TicketPeriodProps {
  price: string
  date: Date | [Date, Date]
  isLoading?: boolean
  soldOut?: boolean
  comingSoon?: boolean
  name: string
}

export function TicketPeriod({
  price,
  date,
  isLoading,
  soldOut,
  comingSoon,
  name,
}: TicketPeriodProps) {
  const disabled = soldOut || comingSoon || isLoading

  return (
    <article
      data-disabled={disabled}
      className={clsx(
        "flex flex-col border border-pri-lighter bg-pri-light/[0.24] backdrop-blur-md transition @container/card max-md:[&+&]:border-t-0 md:[&+&]:border-l-0",
        disabled
          ? "opacity-50 max-md:[&:has(+article[data-disabled=false])]:border-b-0 md:[&:has(+article[data-disabled=false])]:border-r-0"
          : "!border",
      )}
    >
      <header className="border-b border-pri-lighter p-6">
        <h3 className="typography-h3 text-white">{name}</h3>
      </header>
      <div className="flex h-full flex-col justify-end gap-6 p-6">
        <div className="flex items-end justify-between gap-2">
          <span className="typography-h3 text-white @[356px]:typography-h2">
            {price}
          </span>
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <span className="ticket-period--date typography-body-md text-right text-white">
            {Array.isArray(date) ? (
              <>
                <Time date={date[0]} />
                {" - "}
                <Time date={date[1]} />
              </>
            ) : (
              <>
                <span>Through </span>
                <Time date={date} />
              </>
            )}
          </span>
        </div>
        <Button
          variant="primary"
          disabled={disabled}
          className="light w-full"
          href={GET_TICKETS_LINK}
        >
          {isLoading
            ? "Get a ticket"
            : soldOut
              ? "Sold out"
              : comingSoon
                ? "Coming soon"
                : "Get a ticket"}
        </Button>
      </div>
    </article>
  )
}

function Time({ date }: { date: Date }) {
  return (
    <time
      dateTime={date.toISOString()}
      dangerouslySetInnerHTML={{
        __html: date
          .toLocaleDateString("en-GB", {
            month: "long",
            day: "numeric",
          })
          .replace(" ", "&nbsp"),
      }}
    />
  )
}
