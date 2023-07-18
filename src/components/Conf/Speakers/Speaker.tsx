import React, { FC } from "react"
import { Avatar } from "./Avatar"

export interface SchedSpeaker {
  username: string
  name: string
  about: string
  company?: string
  position?: string
  avatar?: string
  url?: string
  role: string
  location?: string
}

const Speaker: FC<SchedSpeaker> = ({
  name,
  company,
  position,
  avatar,
  url,
  username,
}) => {
  return (
    <div className="flex flex-col w-max max-w-[250px] items-center mb-10">
      <Avatar
        href={username}
        className="border-2 border-solid border-gray-300 rounded-full w-[250px] h-[250px]"
        avatar={avatar}
        name={name}
      />
      <div className="flex flex-col justify-center items-center mt-4 max-w-[95%] text-center">
        <a
          href={username}
          className="text-2xl font-bold mt-0 text-[#181E26] hover:underline cursor-pointer"
        >
          {name || "-"}
        </a>
        <p className="mt-2 mb-0 text-sm font-medium text-[#212a35]">
          {company ? (
            url ? (
              <a href={url} target="_blank" className="text-[#212a35]">
                {company}
              </a>
            ) : (
              company
            )
          ) : (
            "-"
          )}
        </p>
        <p className="mt-1 mb-0 text-sm text-[#2A3544]">{position || "-"}</p>
      </div>
    </div>
  )
}

export default Speaker
