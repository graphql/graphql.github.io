import { friendAvatars } from "./friend-avatars"

interface FriendList {
  friends: FriendListItem[]
}

export function FriendList({ friends }: FriendList) {
  return (
    <section
      className="overflow-hidden rounded-lg border border-neu-200 dark:border-neu-100"
      data-sector="2"
    >
      <h3 className="typography-body-lg border-b border-neu-200 bg-neu-50 px-3 py-2 dark:border-neu-100 dark:bg-neu-50/50">
        Friends
      </h3>
      <ul className="flex flex-col gap-6 p-3 lg:p-6 max-md:[&>*:not(:first-child)]:hidden">
        {friends.map(friend => (
          <FriendListItem key={friend.name} {...friend} />
        ))}
      </ul>
    </section>
  )
}

interface FriendListItem extends FriendInfo {
  name: string
  profilePic: string
  mutualFriendsCount: number
  isSubscribed: boolean
}

export function FriendListItem({
  isSubscribed,
  mutualFriendsCount,
  name,
  profilePic,
  ...friendInfo
}: FriendListItem) {
  const avatar =
    friendAvatars[profilePic.replace(".webp", "") as keyof typeof friendAvatars]

  return (
    <li
      className="-m-1 flex items-start gap-2 rounded-[5px] p-1"
      data-sector="3"
    >
      <img
        src={avatar.src}
        alt=""
        width={avatar.width}
        height={avatar.height}
        className="shrink-0 dark:opacity-95"
      />
      <div className="flex-1">
        <div className="mb-2 flex justify-between gap-4">
          <div>
            <strong className="typography-body-md font-normal">{name}</strong>
            <div className="typography-body-sm leading-[1.35] text-neu-700">
              {mutualFriendsCount} mutual friends
            </div>
          </div>
          <SubscribeIconButton />
        </div>
        <FriendInfo {...friendInfo} />
      </div>
    </li>
  )
}

interface FriendInfo {
  username: string
  email: string
  location: string
}

const friendInfoKeys: (keyof FriendInfo)[] = ["username", "email", "location"]

export function FriendInfo(props: FriendInfo) {
  return (
    <dl
      className="flex flex-col gap-0.5 rounded-[4px] border border-neu-100 bg-neu-50 px-1.5 py-1 dark:border-neu-50 dark:bg-neu-50/50"
      data-sector="4"
    >
      {friendInfoKeys.map(key => (
        <div
          key={key}
          className="typography-body-xs flex justify-between gap-4"
        >
          <dt className="capitalize text-neu-900">{key}</dt>
          <dd className="text-neu-700">{props[key]}</dd>
        </div>
      ))}
    </dl>
  )
}

function SubscribeIconButton() {
  return (
    <div className="pointer-events-none size-8 bg-neu-50">
      <svg width="32" height="33" viewBox="0 0 32 33" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.2198 14.5H23.7486V15.8333H25.2198V14.5ZM20.8052 15.8332H19.334V17.1665H20.8052V15.8332ZM22.2771 17.1668H20.8058V18.5001H22.2771V17.1668ZM22.2768 15.8332H23.748V17.1665H22.2768V15.8332Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9991 9.8335H11.9992V11.1668H10.6661V15.1668H11.9994V11.1668H15.9991V9.8335ZM15.9991 15.1668H11.9992V16.5002H15.9991V15.1668ZM15.9993 11.1668H17.3326V15.1668H15.9993V11.1668ZM8.66602 19.1667H9.99931V17.8335H17.999V19.1668H9.99931V21.8335H17.9992V19.1667H19.3325V23.1667H19.3323V23.1668H8.66602V23.1667V21.8335V19.1667Z"
        />
      </svg>
    </div>
  )
}
