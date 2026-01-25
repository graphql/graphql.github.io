import { type SVGProps } from "react"

export function DesktopIcon(props: SVGProps<SVGPathElement>) {
  return <path d="M22 4V18H16V20H8V18H2V4H22ZM4 6V16H20V6H4Z" {...props} />
}

export function PhoneIcon(props: SVGProps<SVGPathElement>) {
  return (
    <path
      d="M18 21H6V3H18V21ZM8 19H16V5H14V7H10V5H8V19ZM13 17H11V15H13V17Z"
      {...props}
    />
  )
}

export function TelevisionIcon(props: SVGProps<SVGPathElement>) {
  return (
    <path
      d="M9 2H7V4H9V2ZM17 2H15V4H17V2ZM22 20V6H15V4H13V6H11V4H9V6H2V20H22ZM4 18V8H20V18H4Z"
      {...props}
    />
  )
}

export function TabletIcon(props: SVGProps<SVGPathElement>) {
  return (
    <path d="M20 22H4V2H20V22ZM6 20H18V4H6V20ZM13 18H11V16H13V18Z" {...props} />
  )
}

export function WristwatchIcon(props: SVGProps<SVGPathElement>) {
  return (
    <path
      d="M16 22H8V18H3V6H8V2H16V6H21V18H16V22ZM5 16H19V8H5V16Z"
      {...props}
    />
  )
}

export function LabirynthIcon(props: SVGProps<SVGPathElement>) {
  return (
    <path
      d="M13 10H14V14H10V10H11V8H8V16H16V8H18V18H6V6H11V4H4V20H20V4H22V22H2V2H13V10Z"
      {...props}
    />
  )
}

export function ServerIcon(props: SVGProps<SVGPathElement>) {
  return (
    <path
      d="M21 21H3V3H21V21ZM5 19H19V13H5V19ZM9 17H7V15H9V17ZM5 11H19V5H5V11ZM9 9H7V7H9V9Z"
      {...props}
    />
  )
}

export function ModemIcon(props: SVGProps<SVGPathElement>) {
  return (
    <>
      <path
        d="M16 7H22V23H20V16H4V23H2V7H14V5H16V7ZM4 14H20V9H4V14ZM14 13H12V11H14V13ZM18 13H16V11H18V13ZM13 5H11V3H13V5ZM19 5H17V3H19V5ZM17 3H13V1H17V3Z"
        {...props}
      />
      <path
        d="M16 7H22V23H2V7H14V5H16V7ZM4 21H20V16H4V21ZM14 20H12V18H14V20ZM18 20H16V18H18V20ZM4 14H20V9H4V14ZM14 13H12V11H14V13ZM18 13H16V11H18V13ZM13 5H11V3H13V5ZM19 5H17V3H19V5ZM17 3H13V1H17V3Z"
        {...props}
      />
    </>
  )
}

export function CloudIcon(props: SVGProps<SVGPathElement>) {
  return (
    <path
      d="M22 20H2V18H22V20ZM2 18H0V12H2V18ZM24 18H22V12H24V18ZM18 12V14H16V12H18ZM4 12H2V10H4V12ZM10 12H8V10H10V12ZM20 10H22V12H18V8H20V10ZM8 10H4V8H8V10ZM10 8H8V6H10V8ZM18 8H16V6H18V8ZM16 6H10V4H16V6Z"
      {...props}
    />
  )
}
