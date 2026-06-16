import Image, { StaticImageData } from "next/image"
import clsx from "clsx"

import { Marquee } from "@/app/conf/_design-system/marquee"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { Anchor } from "@/app/conf/_design-system/anchor"

import styles from "./speaker-card.module.css"

import benjieImg from "../assets/speakers/benjie-gillam.webp"
import michaelImg from "../assets/speakers/michael-staib.webp"
import ivanImg from "../assets/speakers/ivan-goncharov.webp"
import martinImg from "../assets/speakers/martin-bonnin.webp"
import benjaminImg from "../assets/speakers/benjamin-coenen.webp"
import jensImg from "../assets/speakers/jens-neuse.webp"
import pascalImg from "../assets/speakers/pascal-senn.webp"
import matthiasImg from "../assets/speakers/matthias-le-brun.webp"
import aurelienImg from "../assets/speakers/aurelien-david.webp"
import anImg from "../assets/speakers/an-ngo.webp"
import jonathanImg from "../assets/speakers/jonathan-rainer.webp"
import vanessaImg from "../assets/speakers/vanessa-johnson.webp"

interface PastSpeaker {
  name: string
  role: string
  avatar?: StaticImageData
  link: string
}

const PAST_SPEAKERS: PastSpeaker[] = [
  {
    name: "Benjie Gillam",
    role: "GraphQL TSC, GraphQL Foundation",
    avatar: benjieImg,
    link: "https://www.linkedin.com/in/benjiegillam/",
  },
  {
    name: "Michael Staib",
    role: "Co-Founder, ChilliCream",
    avatar: michaelImg,
    link: "https://www.linkedin.com/in/michael-staib-31519571/",
  },
  {
    name: "Ivan Goncharov",
    role: "Head of R&D, Keenethics",
    avatar: ivanImg,
    link: "https://www.linkedin.com/in/igoncharov/",
  },
  {
    name: "Martin Bonnin",
    role: "Android Engineer, Apollo GraphQL",
    avatar: martinImg,
    link: "https://www.linkedin.com/in/martinbonnin/",
  },
  {
    name: "Benjamin Coenen",
    role: "Sr Staff Engineer, Apollo GraphQL",
    avatar: benjaminImg,
    link: "https://www.linkedin.com/in/coenenbenjamin/",
  },
  {
    name: "Aurélien David",
    role: "Co-founder & CTO, Pennylane",
    avatar: aurelienImg,
    link: "https://www.linkedin.com/in/aurel-spyl/",
  },
  {
    name: "An Ngo",
    role: "Lead Engineer, bol",
    avatar: anImg,
    link: "https://www.linkedin.com/in/vliegveld5/",
  },
  {
    name: "Jens Neuse",
    role: "CEO, WunderGraph",
    avatar: jensImg,
    link: "https://www.linkedin.com/in/jens-neuse-706673195/",
  },
  {
    name: "Pascal Senn",
    role: "COO, ChilliCream",
    avatar: pascalImg,
    link: "https://www.linkedin.com/in/pascal-senn-90899a15a",
  },
  {
    name: "Matthias Le Brun",
    role: "Frontend Developer & Designer",
    avatar: matthiasImg,
    link: "https://www.linkedin.com/in/bloodyowl/",
  },
  {
    name: "Vanessa Johnson",
    role: "Android Engineer, The New York Times",
    avatar: vanessaImg,
    link: "https://www.linkedin.com/in/vanessa-johnson999/",
  },
  {
    name: "Jonathan Rainer",
    role: "Staff Engineer, Apollo GraphQL",
    avatar: jonathanImg,
    link: "https://www.linkedin.com/in/jonathan-rainer/",
  },
]

const ROW_1 = PAST_SPEAKERS.slice(0, 6)
ROW_1.push(...ROW_1)
const ROW_2 = PAST_SPEAKERS.slice(6)
ROW_2.push(...ROW_2)

export function PastSpeakersSection() {
  return (
    <section className="gql-container py-8 xl:py-12 3xl:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="px-4 lg:px-12 xl:px-24">
        <h3 className="typography-h2 mb-2">Past Speakers</h3>
        <p className="typography-body-md mb-8 text-neu-700">
          GraphQL Spec contributors, engineers from Apollo, ChilliCream, The New
          York Times, and more shared the stage at GraphQL Day Paris 2025.
        </p>
      </div>
      <div className="flex flex-col overflow-hidden">
        <Marquee speed={25} speedOnHover={12} gap={0}>
          {ROW_1.map((s, i) => (
            <PastSpeakerCard key={`${s.name}-${i}`} {...s} />
          ))}
        </Marquee>
        <Marquee speed={25} speedOnHover={12} gap={0} reverse>
          {ROW_2.map((s, i) => (
            <PastSpeakerCard
              key={`${s.name}-${i}`}
              {...s}
              className="border-t-0"
            />
          ))}
        </Marquee>
      </div>
    </section>
  )
}

function PastSpeakerCard({
  name,
  role,
  avatar,
  link,
  className,
}: PastSpeaker & { className?: string }) {
  return (
    <article
      className={clsx(
        "group relative w-[300px] shrink-0 overflow-hidden border border-r-0 border-neu-200 bg-neu-0 @container",
        className,
        styles.speakerCard,
      )}
    >
      <div className="flex h-full flex-col gap-4 p-4 @[420px]:flex-row md:gap-6 md:p-6">
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="Avatar relative aspect-square overflow-hidden @[420px]:w-[120px] @[420px]:shrink-0">
          <div className="absolute inset-0 z-[1] bg-sec-light mix-blend-multiply" />
          {avatar ? (
            <Image
              src={avatar}
              placeholder="blur"
              alt=""
              width={120}
              height={120}
              className="size-full object-cover saturate-[.1]"
            />
          ) : (
            <div
              className="size-full"
              style={{
                backgroundImage:
                  "linear-gradient(163deg, #759236 0%, hsl(var(--color-sec-lighter)) 100%)",
              }}
            />
          )}
          <Stripes />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <h4 className="typography-body-lg">{name}</h4>
          <p className="typography-body-sm line-clamp-2 text-neu-800">{role}</p>
        </div>
      </div>
      <Anchor
        href={link}
        className="absolute inset-0 z-[1] ring-inset ring-neu-400 hover:bg-sec-base/[.035] hover:ring-1 dark:ring-neu-100 dark:hover:bg-sec-base/[.05]"
        aria-label={`${name} on LinkedIn`}
      />
    </article>
  )
}

function Stripes() {
  return (
    <div
      role="presentation"
      className={clsx(
        "pointer-events-none absolute inset-0 inset-y-[-20px]",
        styles.stripes,
      )}
    >
      <StripesDecoration oddClassName="absolute inset-0 bg-gradient-to-b from-sec-dark to-[var(--end-color)]" />
    </div>
  )
}
