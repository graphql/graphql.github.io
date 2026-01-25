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

export const ambassadors202509: Ambassador[] = [
  {
    label: "Artur Czemiel",
    imageUrl: "https://github.com/aexol.png",
    alt: "Artur Czemiel",
    organization: "GraphQL Editor",
    tags: [
      {
        label: "Bluesky",
        url: "https://bsky.app/profile/arturcz.bsky.social",
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/aexol/",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/arturczemiel/",
        icon: <LinkedInIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://linkedin.com/in/donnazhou",
        icon: <LinkedInIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "X",
        url: "https://x.com/dotansimha",
        icon: <TwitterIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/eddeee888/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "X",
        url: "https://x.com/eddeee888",
        icon: <TwitterIcon className="size-5" />,
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@eddeee888",
        icon: <YouTube2Icon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/erikwrede",
        icon: <LinkedInIcon className="size-5" />,
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
        icon: <FacebookIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/itamarkestenbaum/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Threads",
        url: "https://www.threads.com/@itamarok",
        icon: <ThreadsIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/notrab/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "X",
        url: "https://x.com/notrab",
        icon: <TwitterIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://notrab.dev/blog",
        icon: <GlobeIcon className="size-5" />,
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
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/bignimbus",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jeffreyauriemma/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://jdauriemma.com/",
        icon: <GlobeIcon className="size-5" />,
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
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/jemgillam",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jemgillam/",
        icon: <LinkedInIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jordaneldredge",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Threads",
        url: "https://www.threads.com/@captbaritone",
        icon: <ThreadsIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://jordaneldredge.com/",
        icon: <GlobeIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jovidecroock/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "X",
        url: "https://x.com/jovidecroock",
        icon: <TwitterIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://www.jovidecroock.com/blog/",
        icon: <GlobeIcon className="size-5" />,
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
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/xuorig",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/magiroux/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://magiroux.com/",
        icon: <GlobeIcon className="size-5" />,
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
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/michael-watson",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/michael-watson-%F0%9F%96%A5-85844442/",
        icon: <LinkedInIcon className="size-5" />,
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
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/patrick91",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/patrickarminio/",
        icon: <LinkedInIcon className="size-5" />,
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
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/kitten",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "X",
        url: "http://x.com/_philpl",
        icon: <TwitterIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://kitten.sh/",
        icon: <GlobeIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Sarah Sanders",
    imageUrl: "/img/ambassadors/sarah-sanders.jpg",
    alt: "Sarah Sanders",
    organization: "PostHog",
    tags: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/sarah-s-42913121a/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://www.sarahsanders.dev/",
        icon: <GlobeIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "X",
        url: "https://x.com/stephenspalding",
        icon: <TwitterIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "http://stephenspalding.com/",
        icon: <GlobeIcon className="size-5" />,
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
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "X",
        url: "https://x.com/tazsingh",
        icon: <TwitterIcon className="size-5" />,
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
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@overstacked_io",
        icon: <YouTube2Icon className="size-5" />,
      },
    ],
  },
]

export const ambassadors202512: Ambassador[] = [
  {
    label: "An Ngo",
    imageUrl: "https://github.com/vliegveld5.png",
    alt: "An Ngo",
    organization: "bol",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/vliegveld5",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vliegveld5/",
        icon: <LinkedInIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Aurélien David",
    imageUrl: "https://github.com/spyl94.png",
    alt: "Aurélien David",
    organization: "Pennylane",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/spyl94/",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/aurel-spyl/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Twitter",
        url: "https://x.com/spyl94",
        icon: <TwitterIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Chanda Raj Kumar",
    imageUrl: "/img/ambassadors/chanda-raj-kumar.jpg",
    alt: "Chanda Raj Kumar",
    organization: "KL University Hyderabad",
    tags: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/chanda-raj-kumar-88799a1b3/",
        icon: <LinkedInIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Derek Kuc",
    imageUrl: "https://github.com/dariuszkuc.png",
    alt: "Derek Kuc",
    organization: "Apollo",
    tags: [
      {
        label: "Bluesky",
        url: "https://bsky.app/profile/dkuc.bsky.social",
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/dariuszkuc",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/dkuc/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Twitter",
        url: "https://x.com/derek_kuc",
        icon: <TwitterIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Gil Gardosh",
    imageUrl: "https://github.com/gilgardosh.png",
    alt: "Gil Gardosh",
    organization: "The Guild",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/gilgardosh/",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/gil-gardosh-9a5088a5/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Twitter",
        url: "https://x.com/gilgardosh",
        icon: <TwitterIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Giuseppe Abrignani",
    imageUrl: "/img/ambassadors/giuseppe-abrignani.jpg",
    alt: "Giuseppe Abrignani",
    organization: "Oranj Tech",
    tags: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/giuseppeabrignani/",
        icon: <LinkedInIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Jayant Acharya",
    imageUrl: "/img/ambassadors/jayant-acharya.jpg",
    alt: "Jayant Acharya",
    organization: "Techsophy",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/jayant99acharya",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jayantacharya/",
        icon: <LinkedInIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Laurin Quast",
    imageUrl: " https://github.com/n1ru4l.png",
    alt: "Laurin Quast",
    organization: "The Guild",
    tags: [
      {
        label: "GitHub",
        url: " https://github.com/n1ru4l",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/laurin-quast-a47b871b4/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Twitter",
        url: "https://x.com/n1rual",
        icon: <TwitterIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Lenz Weber-Tronic",
    imageUrl: "https://github.com/phryneas.png",
    alt: "Lenz Weber-Tronic",
    organization: "Apollo",
    tags: [
      {
        label: "Bluesky",
        url: "https://bsky.app/profile/phry.dev",
        icon: <Bluesky2Icon className="size-5" />,
      },
      {
        label: "GitHub",
        url: "https://github.com/phryneas",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/lenz-w-069040113/",
        icon: <LinkedInIcon className="size-5" />,
      },
      {
        label: "Website",
        url: "https://phryneas.de/",
        icon: <GlobeIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Rigin Oommen",
    imageUrl: "https://github.com/riginoommen.png",
    alt: "Rigin Oommen",
    organization: "Red Hat",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/riginoommen",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/riginoommen/",
        icon: <LinkedInIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Sabrina Wasserman",
    imageUrl: "/img/ambassadors/sabrina-wasserman.jpg",
    alt: "Sabrina Wasserman",
    organization: "Facebook",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/s3wasser",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/sabrina-wasserman-251045138/",
        icon: <LinkedInIcon className="size-5" />,
      },
    ],
  },
  {
    label: "Valentin Cocaud",
    imageUrl: "https://github.com/EmrysMyrddin.png",
    alt: "Valentin Cocaud",
    organization: "The Guild",
    tags: [
      {
        label: "GitHub",
        url: "https://github.com/EmrysMyrddin",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/valentin-cocaud/",
        icon: <LinkedInIcon className="size-5" />,
      },
    ],
  },
]

export const ambassadors = [...ambassadors202509, ...ambassadors202512].sort(
  (a, z) => a.label.localeCompare(z.label, "en-US"),
)
