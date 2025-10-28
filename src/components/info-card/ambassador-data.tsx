import { ReactNode } from "react"
import {
  Bluesky2Icon,
  FacebookIcon,
  GitHubIcon,
  GlobeIcon,
  LinkedInIcon,
  ThreadsIcon,
  TwitterIcon,
  YouTube2Icon,
} from "../../icons"

export interface AmbassadorTag {
  label: string
  url: string
  icon?: ReactNode
}

export interface Ambassador {
  label: string
  imageUrl: string
  alt: string
  organization: string
  tags: AmbassadorTag[]
}

export const ambassadors: Ambassador[] = [
  {
    label: "Artur Czemiel",
    imageUrl: "https://github.com/aexol.png",
    alt: "Artur Czemiel",
    organization: "GraphQL Editor",
    tags: [
      {
        label: "Bluesky",
        url: "https://bsky.app/profile/arturcz.bsky.social",
        icon: <Bluesky2Icon className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/aexol/",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/arturczemiel/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Donna Zhou",
    imageUrl: "/img/ambassadors/donna-zhou.jpg",
    alt: "Donna Zhou",
    organization: "GraphQL Java",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/dondonz",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://linkedin.com/in/donnazhou",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Dotan Simha",
    imageUrl: "https://github.com/dotansimha.png",
    alt: "Dotan Simha",
    organization: "The Guild",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/dotansimha/",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "X",
        url: "https://x.com/dotansimha",
        icon: <TwitterIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Eddy Nguyen",
    imageUrl: "https://github.com/eddeee888.png",
    alt: "Eddy Nguyen",
    organization: "Code Generator",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/eddeee888",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/eddeee888/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "X",
        url: "https://x.com/eddeee888",
        icon: <TwitterIcon className="h-5 w-5" />,
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@eddeee888",
        icon: <YouTube2Icon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Erik Wrede",
    imageUrl: "https://github.com/erikwrede.png",
    alt: "Erik Wrede",
    organization: "Strawberry GraphQL",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/erikwrede/",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/erikwrede",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Itamar Kestenbaum",
    imageUrl: "/img/ambassadors/itamar-kestenbaum.jpg",
    alt: "Itamar Kestenbaum",
    organization: "Meta Platforms",
    tags: [
      {
        label: "Facebook",
        url: "https://www.facebook.com/profile.php?id=504330120",
        icon: <FacebookIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/itamarkestenbaum/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "Threads",
        url: "https://www.threads.com/@itamarok",
        icon: <ThreadsIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Jamie Barton",
    imageUrl: "/img/ambassadors/jamie-barton.jpg",
    alt: "Jamie Barton",
    organization: "CartQL",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/notrab",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/notrab/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "X",
        url: "https://x.com/notrab",
        icon: <TwitterIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "https://notrab.dev/blog",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Jeff Auriemma",
    imageUrl: "/img/ambassadors/jeff-auriemma.jpg",
    alt: "Jeff Auriemma",
    organization: "Apollo",
    tags: [
      {
        label: "Bluesky",
        url: "https://bsky.app/profile/jeff.auriemma.xyz",
        icon: <Bluesky2Icon className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/bignimbus",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jeffreyauriemma/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "https://jdauriemma.com/",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Jem Gillam",
    imageUrl: "https://github.com/jemgillam.png",
    alt: "Jem Gillam",
    organization: "Graphile",
    tags: [
      {
        label: "Bluesky",
        url: "https://bsky.app/profile/jem.graphile.org",
        icon: <Bluesky2Icon className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/jemgillam",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jem-gillam-92063b14/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Jordan Eldredge",
    imageUrl: "https://github.com/captbaritone.png",
    alt: "Jordan Eldredge",
    organization: "Meta",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/captbaritone",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jordaneldredge",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "Threads",
        url: "https://www.threads.com/@captbaritone",
        icon: <ThreadsIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "https://jordaneldredge.com/",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Jovi De Croock",
    imageUrl: "https://github.com/jovidecroock.png",
    alt: "Jovi De Croock",
    organization: "GraphQL.js",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/jovidecroock",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jovidecroock/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "X",
        url: "https://x.com/jovidecroock",
        icon: <TwitterIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "https://www.jovidecroock.com/blog/",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Marc-Andre Giroux",
    imageUrl: "https://github.com/xuorig.png",
    alt: "Marc-Andre Giroux",
    organization: "Netflix",
    tags: [
      {
        label: "BlueSky",
        url: "https://bsky.app/profile/xuorig.bsky.social",
        icon: <Bluesky2Icon className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/xuorig",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/magiroux/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "https://magiroux.com/",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Michael Watson",
    imageUrl: "https://github.com/michael-watson.png",
    alt: "Michael Watson",
    organization: "Apollo",
    tags: [
      {
        label: "BlueSky",
        url: "https://bsky.app/profile/michael-watson.bsky.social",
        icon: <Bluesky2Icon className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/michael-watson",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/michael-watson-%F0%9F%96%A5-85844442/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Patrick Arminio",
    imageUrl: "https://github.com/patrick91.png",
    alt: "Patrick Arminio",
    organization: "Strawberry GraphQL",
    tags: [
      {
        label: "BlueSky",
        url: "https://bsky.app/profile/patrick.wtf",
        icon: <Bluesky2Icon className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/patrick91",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/patrickarminio/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Phil Pluckthun",
    imageUrl: "https://github.com/kitten.png",
    alt: "Phil Pluckthun",
    organization: "urql & gql.tada",
    tags: [
      {
        label: "BlueSky",
        url: "https://bsky.app/profile/kitten.sh",
        icon: <Bluesky2Icon className="h-5 w-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/kitten",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "X",
        url: "http://x.com/_philpl",
        icon: <TwitterIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "https://kitten.sh/",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Sarah Sanders",
    imageUrl: "/img/ambassadors/sarah-sanders.jpg",
    alt: "Sarah Sanders",
    organization: "Docker",
    tags: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/sarah-s-42913121a/",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "https://www.sarahsanders.dev/",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Stephen Spalding",
    imageUrl: "https://github.com/fotoetienne.png",
    alt: "Stephen Spalding",
    organization: "Netflix",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/fotoetienne",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "X",
        url: "https://x.com/stephenspalding",
        icon: <TwitterIcon className="h-5 w-5" />,
      },
      {
        label: "Website",
        url: "http://stephenspalding.com/",
        icon: <GlobeIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Taz Singh",
    imageUrl: "https://github.com/tazsingh.png",
    alt: "Taz Singh",
    organization: "Guild",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/tazsingh",
        icon: <GitHubIcon className="h-5 w-5" />,
      },
      {
        label: "X",
        url: "https://x.com/tazsingh",
        icon: <TwitterIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Warren Day",
    imageUrl: "/img/ambassadors/warren-day.jpeg",
    alt: "Warren Day",
    organization: "Overstacked",
    tags: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/warren-day-86b0a15a",
        icon: <LinkedInIcon className="h-5 w-5" />,
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@overstacked_io",
        icon: <YouTube2Icon className="h-5 w-5" />,
      },
    ],
  },
]
