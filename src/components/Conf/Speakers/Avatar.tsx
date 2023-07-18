import React, { FC } from "react"

interface Props {
  avatar?: string
  name: string
  className: string
  href: string
}
export const Avatar: FC<Props> = ({ avatar, name, className, href }) => {
  const nameInitialsAvatarFallback = name
    .split(" ")
    .map(e => e[0])
    .join("")
    .toUpperCase()

  return (
    <a href={href}>
      {avatar ? (
        <img
          className={`cursor-pointer ${className}`}
          src={avatar}
          alt={`${name} Profile Image`}
        />
      ) : (
        <div
          className={`text-[#202020] hover:underline cursor-pointer  ${className} flex justify-center items-center`}
        >
          <span className="text-4xl font-medium">
            {nameInitialsAvatarFallback}
          </span>
        </div>
      )}
    </a>
  )
}
