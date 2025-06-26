import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { clsx } from "clsx"
import Image from "next-image-export-optimizer"

import maskBlur from "./mask.webp"

export interface TestimonialsProps extends React.HTMLAttributes<HTMLElement> {}

interface Testimonial {
  quote: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

const testimonials: Testimonial[] = [
  {
    quote:
      "GraphQL is evolving to new use cases every day and it's really a competitive advantage to experience them first hand with everyone that matters. I look forward the next edition!",
    author: {
      name: "Vincent Desmares",
      role: "Teamstarter, CTO",
      avatar:
        "https://avatars.sched.co/d/cc/21066875/avatar.jpg.320x320px.jpg?f80",
    },
  },
  {
    quote:
      "As a beginner in GraphQL, it was very helpful to see real use cases and honest accounts of the challenges along the way. I learned a lot about performance and security and had a great opportunity to network with other participants and potential vendors.",
    author: {
      name: "Nicolai Draslov",
      role: "Danish Agency for Digital Government",
      avatar:
        "https://media.licdn.com/dms/image/v2/C4E03AQGlrdt3GpJI9w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1528203207471?e=1753920000&v=beta&t=H6CMhDZFoXJxGUu4XYwC_rEX9Jjwh7OdPIDm8JaeXAU",
    },
  },
  {
    quote:
      "GraphQLConf 24 was well organized event which empowers new and existing organizations to adopt GraphQL and help navigate how to rollout within their organizations by building understanding of ecosystem.",
    author: {
      name: "Satish Chitnis",
      role: "Paramount, Principal Architect",
      avatar:
        "https://avatars.sched.co/1/c3/21496512/avatar.jpg.320x320px.jpg?0c2",
    },
  },
]

export function Testimonials({ className, ...rest }: TestimonialsProps) {
  return (
    <section
      className={clsx(
        "gql-conf-container py-8 max-md:px-4 md:pb-16 md:pt-24 md:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        className,
      )}
      {...rest}
    >
      <h2 className="typography-h2 text-center text-neu-800">
        How was the previous edition?
      </h2>
      <div className="flex w-full snap-x snap-mandatory flex-row gap-10 overflow-x-auto px-4 py-6 lg:mt-16 lg:py-16">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="flex shrink-0 snap-start flex-row-reverse items-center gap-6 max-md:flex-col md:px-10"
          >
            <div>
              <p className="typography-body-lg max-w-[calc(100vw-32px)] !leading-[1.1] max-md:text-center md:max-w-[544px]">
                {testimonial.quote}
              </p>
              <AuthorNameAndRole
                author={testimonial.author}
                className="mt-4 max-md:hidden"
              />
            </div>
            <TestimonialAuthor author={testimonial.author} />
          </div>
        ))}
      </div>
    </section>
  )
}

function TestimonialAuthor({ author }: { author: Testimonial["author"] }) {
  return (
    <div className="relative flex shrink-0 flex-col items-center justify-center whitespace-pre md:px-6 lg:h-full lg:px-8">
      <div className="relative bg-neu-500 dark:bg-neu-200 dark:opacity-90">
        <Image
          src={author.avatar}
          alt={author.name}
          width={128}
          height={128}
          className="size-16 saturate-0 xl:size-32"
        />
        <div className="absolute inset-0 z-[1] bg-pri-darker mix-blend-plus-lighter" />
        <Stripes />
      </div>
      <AuthorNameAndRole author={author} className="contents md:hidden" />
      <div
        // the separator
        className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-pri-lighter to-transparent max-md:hidden"
      />
    </div>
  )
}

function AuthorNameAndRole({
  author,
  className,
}: {
  author: Testimonial["author"]
  className?: string
}) {
  return (
    <div className={className}>
      <div className="typography-body-sm mt-3">{author.name}</div>
      <div className="typography-body-xs text-neu-700">{author.role}</div>
    </div>
  )
}

function Stripes() {
  const mask = `url(${maskBlur.src})`
  return (
    <div
      role="presentation"
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: "cover",
        WebkitMaskSize: "cover",
        maskPosition: "left",
        WebkitMaskPosition: "left",
      }}
    >
      <StripesDecoration
        evenClassName="bg-gradient-to-b from-pri-light/0 to-pri-lighter/25"
        stripeWidth="8px"
      />
    </div>
  )
}
