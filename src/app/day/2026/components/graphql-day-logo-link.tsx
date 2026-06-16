import { clsx } from "clsx"
import NextLink from "next/link"

function GraphQLDayLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 18.1409c4.8712 0 8.82-3.9488 8.82-8.82 0-4.87115-3.9488-8.82-8.82-8.82s-8.82 3.94885-8.82 8.82c0 4.8712 3.9488 8.82 8.82 8.82Zm35.2292 20.3396c4.8712 0 8.82-3.9488 8.82-8.82s-3.9488-8.82-8.82-8.82c-4.8711 0-8.82 3.9488-8.82 8.82s3.9489 8.82 8.82 8.82Zm0 40.6791c4.8712 0 8.82-3.9488 8.82-8.82s-3.9488-8.82-8.82-8.82c-4.8711 0-8.82 3.9488-8.82 8.82s3.9489 8.82 8.82 8.82ZM50 99.4991c4.8712 0 8.82-3.9488 8.82-8.82s-3.9488-8.82-8.82-8.82-8.82 3.9488-8.82 8.82 3.9488 8.82 8.82 8.82ZM14.7659 79.1596c4.8712 0 8.82-3.9488 8.82-8.82s-3.9488-8.82-8.82-8.82c-4.87115 0-8.82 3.9488-8.82 8.82s3.94885 8.82 8.82 8.82Zm0-40.6791c4.8712 0 8.82-3.9488 8.82-8.82s-3.9488-8.82-8.82-8.82c-4.87115 0-8.82 3.9488-8.82 8.82s3.94885 8.82 8.82 8.82ZM49.82 58.64c4.8712 0 8.82-3.9488 8.82-8.82S54.6912 41 49.82 41 41 44.9488 41 49.82s3.9488 8.82 8.82 8.82Z" />
    </svg>
  )
}

export function GraphQLDayLogoLink({
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <NextLink
      href="/day"
      className={clsx(
        "-m-2 flex items-center gap-2 p-2 text-xl/none uppercase underline-offset-4 hover:underline",
        className,
      )}
      {...rest}
    >
      <GraphQLDayLogo className="h-6" />
      GraphQL Day
    </NextLink>
  )
}
