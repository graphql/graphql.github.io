import clsx from "clsx"
import { HTMLAttributes } from "react"
import Image from "next-image-export-optimizer"
import type { StaticImageData } from "next/image"

import { Button } from "@/app/conf/_design-system/button"
import { BECOME_A_SPEAKER_LINK } from "../../links"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import {
  SocialIconType,
  SocialIcon,
  urlForUser,
} from "@/app/conf/_design-system/social-icon"

const previousConfSpeakers = {
  benjie: {
    name: "Benjie Gillam",
    title: "GraphQL TSC & Spec",
    src: "https://avatars.sched.co/b/99/18743846/avatar.jpg.320x320px.jpg",
    socials: {
      twitter: "benjie",
      linkedin: "benjiegillam",
    },
  },
  kewei: {
    name: "Kewei Qu",
    title: "Meta, Senior Staff Engineer",
    src: "https://avatars.sched.co/9/1a/18743864/avatar.jpg.320x320px.jpg",
    socials: {
      twitter: "kewei_qu",
      linkedin: "keweiqu",
    },
  },
  donna: {
    name: "Donna Zhou",
    title: "Atlassian, GraphQL Java",
    src: "https://avatars.sched.co/0/1d/18743879/avatar.jpg.320x320px.jpg?e1f",
    socials: {
      linkedin: "donnazhou",
    },
  },
  uri: {
    name: "Uri Goldshtein",
    title: "The Guild, Founder",
    src: "https://avatars.sched.co/8/2b/14900013/avatar.jpg.320x320px.jpg?9f1",
    socials: {
      twitter: "UriGoldshtein",
      linkedin: "urigo",
    },
  },
  alessia: {
    name: "Alessia Bellisario",
    title: "Apollo, Staff Engineer",
    src: "https://avatars.sched.co/a/c6/18743837/avatar.jpg.320x320px.jpg?847",
    socials: {
      twitter: "alessbell",
      linkedin: "alessiabellisario",
    },
  },
}

interface TopMindsSectionProps extends HTMLAttributes<HTMLElement> {
  hasSpeakersPage?: boolean
}

export default function TopMindsSection({
  className,
  hasSpeakersPage,
  ...rest
}: TopMindsSectionProps) {
  return (
    <section
      className={clsx(
        "gql-conf-section flex justify-center max-md:flex-col [@media(767px<width<807px)]:px-6 [@media(807px<=width<858px)]:px-12",
        className,
      )}
      {...rest}
    >
      <div className="flex grid-cols-2 flex-wrap [@media(444px<width<743px)]:grid [@media(width<=444px)]:flex-col [@media(width<=743px)]:justify-center [@media(width>=970px)]:*:border-b-0">
        <h3 className="typography-h2 mr-auto flex w-full grow text-pretty pb-6 pr-6 [@media(width>857px)]:basis-0">
          Meet the top industry minds
        </h3>
        <TopMindCard
          {...previousConfSpeakers.benjie}
          stripes="linear-gradient(80deg, hsl(var(--color-pri-base)) 0%, hsl(var(--color-pri-base)) 5%, transparent 40%, transparent)"
        />
        <TopMindCard
          {...previousConfSpeakers.kewei}
          className="[@media(width<=742px)]:border-l"
          stripes="radial-gradient(circle at bottom right, hsl(var(--color-pri-base)) 0%, hsl(var(--color-pri-base)) 10%, transparent 40%, transparent)"
        />
        <div className="flex grow border-sec-dark [@media(width<970px)]:contents [@media(width>=970px)]:border-t [@media(width>=970px)]:*:border-t-0">
          <TopMindCard
            {...previousConfSpeakers.donna}
            className="[@media(744px<=width<=970px)]:first-of-type:border-l-0"
            stripes="radial-gradient(ellipse at top left, hsl(var(--color-pri-base)) 0%, hsl(var(--color-pri-base)) 5%, transparent 40%, transparent, transparent 85%, black 100%)"
          />
          <TopMindCard
            {...previousConfSpeakers.uri}
            className="[@media(639px<=width<=970px)]:border-l"
            stripes="linear-gradient(-40deg, hsl(var(--color-pri-base)) 0%, hsl(var(--color-pri-base)) 5%, transparent 40%, transparent)"
          />
          <TopMindCard
            {...previousConfSpeakers.alessia}
            className="[@media(width<744px)]:border-l"
            stripes="radial-gradient(circle at top left, transparent 0%, transparent 65%, black 90%)"
          />
          <div className="mt-6 flex shrink-0 basis-[content] items-end justify-stretch max-lg:w-full [@media(640px<=width<=855px)]:basis-[236px] [@media(width<=444px)]:*:w-full [@media(width>742px)]:justify-end [@media(width>742px)]:pl-6 [@media(width>855px)]:grow">
            {hasSpeakersPage ? (
              <Button variant="secondary" href="/conf/2025/speakers/">
                View all speakers
              </Button>
            ) : (
              <Button variant="secondary" href={BECOME_A_SPEAKER_LINK}>
                Become a speaker
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export interface TopMindCardProps {
  name: string
  title: string
  src: string | StaticImageData
  className?: string
  stripes?: string
  socials: Partial<Record<SocialIconType, string>>
}

function TopMindCard({
  name,
  title,
  src,
  className,
  stripes,
  socials,
}: TopMindCardProps) {
  return (
    <article
      className={clsx(
        "flex shrink-0 flex-col border-y border-r border-sec-dark first-of-type:border-l max-sm:border-l",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-[1] bg-sec-light opacity-90 mix-blend-multiply" />
        <Image
          src={src}
          alt=""
          width={312}
          height={312}
          className="aspect-square size-[312px] w-full object-cover saturate-[0.1] transition-transform sm:h-[236px]"
        />
        <Stripes mask={stripes} />
      </div>
      <div className="flex flex-1 items-stretch border-t border-sec-dark">
        <div className="flex grow flex-col justify-center gap-1 p-3 sm:h-[80px]">
          <h4 className="typography-body-md">{name}</h4>
          <p className="typography-body-xs text-neu-700">{title}</p>
        </div>
        <div className="flex border-l border-sec-dark max-sm:divide-x sm:flex-col sm:items-center sm:divide-y sm:border-l">
          {SocialIconType.all.map(type => {
            if (!socials[type]) return null
            return (
              <a
                key={type}
                href={urlForUser(type, socials[type])}
                target="_blank"
                rel="noopener noreferrer"
                className="flex grow items-center justify-center border-sec-dark p-4 transition-colors hover:bg-neu-900/10 hover:text-neu-700 sm:p-2"
              >
                <SocialIcon type={type} className="size-6" />
              </a>
            )
          })}
        </div>
      </div>
    </article>
  )
}

function Stripes({ mask }: { mask?: string }) {
  return (
    <div
      role="presentation"
      className="pointer-events-none absolute inset-0 inset-y-[-20px]"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <StripesDecoration evenClassName="bg-gradient-to-b from-sec-darker to-sec-dark" />
    </div>
  )
}
