import { FC } from "react"

interface Props {
  avatar?: string
  name: string
  className: string
  href?: string
}
export const Avatar: FC<Props> = ({ avatar, name, className, href }) => {
  const nameInitialsAvatarFallback = name
    .split(" ")
    .map(e => e[0])
    .join("")
    .toUpperCase()

  const Component = () =>
    avatar ? (
      <img
        className={`${className}`}
        src={avatar}
        alt={`${name} Profile Image`}
        style={{
          margin: 0,
        }}
      />
    ) : (
      <div
        className={`cursor-pointer text-[#202020] hover:underline ${className} flex items-center justify-center`}
      >
        <span className="text-4xl font-medium">
          {nameInitialsAvatarFallback}
        </span>
      </div>
    )

  if (href)
    return (
      <a href={href}>
        <Component />
      </a>
    )

  return <Component />
}
