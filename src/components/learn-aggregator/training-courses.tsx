import { clsx } from "clsx"

import { Eyebrow } from "@/_design-system/eyebrow"
import { GraphQLLogo } from "@/app/conf/2025/components/graphql-conf-logo-link"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import ApolloLogo from "@/icons/apollo.svg?svgr"

export function TrainingCoursesSection(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <section
      {...props}
      className={clsx("gql-section gql-container lg:pb-24", props.className)}
    >
      <div className="mx-auto flex max-w-[960px] flex-col items-center">
        <Eyebrow>Tutorials</Eyebrow>
        <h2 className="typography-h2 mt-6">Training Courses</h2>
        <p className="typography-body-md mt-6">
          Get started or level up your GraphQL skills with these trusted
          tutorials.
        </p>
        <ul className="mt-4 flex flex-col gap-4 md:gap-8 lg:mt-8 lg:gap-12">
          <li>
            <TrainingCoursesCard
              title="GraphQL-JS tutorial"
              description="Step-by-step guide to building schemas and executing queries with GraphQL.js."
              icon={<GraphQLLogo />}
              href="https://www.graphql-js.org/docs/"
            />
          </li>
          <li>
            <TrainingCoursesCard
              title="Apollo Odyssey"
              description="Interactive courses for building GraphQL applications with Apollo's toolset."
              icon={<ApolloLogo />}
              href="https://www.apollographql.com/tutorials/"
            />
          </li>
          <li>
            <TrainingCoursesCard
              title="Yoga GraphQL Server Tutorial"
              description="Open source tutorial for creating modern GraphQL Servers in Node, CF Workers, Deno and others."
              icon={<YogaLogo />}
              href="https://the-guild.dev/graphql/yoga-server/tutorial/basic"
            />
          </li>
          <li>
            <TrainingCoursesCard
              title="GraphQL Tutorials"
              description="Real World Fullstack GraphQL tutorials for developers by Hasura."
              icon={<HasuraLogo />}
              href="https://hasura.io/learn/"
            />
          </li>
        </ul>
      </div>
    </section>
  )
}

interface TrainingCoursesCardProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  title: string
  description: string
  icon: React.ReactNode
}
function TrainingCoursesCard({
  title,
  description,
  icon,
  href,
  ...props
}: TrainingCoursesCardProps) {
  return (
    <a
      className={clsx(
        "grid grid-cols-[1fr_auto] grid-rows-[auto_auto] flex-col border border-neu-200 bg-neu-50 [grid-template-areas:'title_icon''desc_arrow'] hover:ring hover:ring-neu-100 dark:border-neu-100 dark:bg-neu-50/50 dark:hover:ring-neu-50 lg:[grid-template-areas:'icon_title_.''icon_desc_arrow'] lg:[grid-template-columns:142px_1fr_64px] lg:[grid-template-rows:1fr_auto]",
        props.className,
      )}
      href={href}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <p className="typography-h3 px-4 py-[18px] [grid-area:title] lg:px-4 lg:pb-2 lg:pt-6">
        {title}
      </p>
      <p className="typography-body-md px-4 pb-4 [grid-area:desc] lg:pb-6 lg:pt-2">
        {description}
      </p>
      <span className="flex items-center justify-center self-stretch border-inherit p-4 text-neu-600 [grid-area:icon] dark:text-neu-600 max-lg:border-l lg:border-r lg:p-10 [&>svg]:size-8 lg:[&>svg]:size-16">
        {icon}
      </span>
      <span className="flex place-content-center place-items-center place-self-stretch border-l border-t border-neu-200 p-4 [grid-area:arrow] dark:border-neu-100 lg:flex lg:place-self-end">
        <ArrowDownIcon className="size-8 shrink-0 -rotate-90" />
      </span>
    </a>
  )
}

function YogaLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path d="M21.3619 6.38176H16.2964L19.3384 3.33972L15.9999 0L12.6602 3.33972L15.7022 6.38176H10.6367C9.98473 6.38176 9.35861 6.64131 8.89732 7.1026L0 15.9999L3.33972 19.3396L14.2606 8.41881C15.2213 7.4581 16.7786 7.4581 17.7393 8.41881L28.6601 19.3396L31.9998 15.9999L23.1013 7.10137C22.64 6.64008 22.0139 6.38053 21.3619 6.38053V6.38176Z" />
      <path d="M16 25.3216L12.6607 28.6608L16 32L19.3392 28.6608L16 25.3216Z" />
      <path d="M10.6378 19.042C9.98584 19.042 9.35972 19.3015 8.89843 19.7628L6.33121 22.33L9.67094 25.6698L14.2617 21.079C15.2224 20.1183 16.7797 20.1183 17.7404 21.079L22.3311 25.6698L25.6709 22.33L23.1036 19.7628C22.6423 19.3015 22.0162 19.042 21.3643 19.042H10.6378Z" />
    </svg>
  )
}

function HasuraLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="currentColor"
    >
      <path d="M26.9074 0.23705C27.0924 -0.0477225 27.5073 -0.0844866 27.7301 0.173458C29.4047 2.10864 29.9427 7.29894 29.1215 10.007L29.0816 10.1341C28.7899 11.0215 28.7076 11.9592 28.8757 12.8702L28.9439 13.2408L29.0095 13.624C29.1263 14.3334 29.2185 15.0691 29.2185 15.6267C29.2185 23.4306 22.7405 29.7604 14.7466 29.7604C6.75605 29.7604 0.274442 23.4338 0.274442 15.6267C0.274442 15.0186 0.384138 14.1979 0.515892 13.4312L0.58326 13.0536C0.594521 12.9916 0.605915 12.9305 0.617441 12.8702C0.778805 12.0129 0.718393 11.1317 0.467801 10.2911L0.418517 10.1341C-0.459449 7.46805 0.0687614 2.14242 1.76985 0.17326C1.98069 -0.0677937 2.36423 -0.0505046 2.56157 0.194126L2.59257 0.23705L4.68792 3.44884C5.20918 4.08874 6.14199 4.23937 6.8415 3.79065C9.11551 2.33698 11.8317 1.49279 14.75 1.49279C17.6682 1.49279 20.3844 2.33678 22.658 3.79025C23.3377 4.22427 24.2319 4.10086 24.7587 3.51144L24.812 3.44864L26.9074 0.23705ZM14.7498 4.72167C13.0352 4.72167 11.4096 5.09667 9.9589 5.77333C6.34092 7.44778 3.78253 10.9612 3.55956 15.074C3.54872 15.2693 3.54302 15.4648 3.54247 15.6603C3.54247 21.6956 8.56664 26.6055 14.7464 26.6055C20.9261 26.6055 25.9535 21.6956 25.9571 15.6637C25.9571 15.4693 25.9503 15.2716 25.94 15.0774C25.717 10.9678 23.1586 7.45116 19.5406 5.77651C18.0866 5.09687 16.4644 4.72167 14.7498 4.72167ZM14.0055 10.8271C14.1045 10.8271 14.1983 10.8708 14.2593 10.9467L14.2832 10.9813L16.7392 15.0236L19.6026 19.8733C19.6314 19.9201 19.6466 19.9741 19.6466 20.0291C19.6466 20.0841 19.6314 20.138 19.6026 20.1849C19.5782 20.2271 19.5443 20.263 19.5036 20.2898C19.4629 20.3167 19.4165 20.3337 19.3681 20.3395L19.3248 20.3422H16.9961C16.897 20.3422 16.8034 20.2961 16.7424 20.2194L16.7183 20.1849L15.1887 17.5957L13.4845 20.1948C13.4588 20.2339 13.4249 20.2668 13.3851 20.2912C13.3453 20.3157 13.3006 20.3311 13.2542 20.3363L13.2134 20.3389H10.8506C10.7306 20.3389 10.6209 20.2753 10.566 20.1747C10.5421 20.1314 10.529 20.0831 10.5276 20.0337C10.5262 19.9843 10.5367 19.9353 10.5581 19.8907L10.5797 19.8532L13.7315 15.1575L11.3822 11.3026C11.3531 11.2554 11.3374 11.2011 11.3368 11.1456C11.3362 11.0901 11.3507 11.0355 11.3788 10.9877C11.4036 10.9448 11.438 10.9082 11.4793 10.8808C11.5206 10.8534 11.5677 10.8359 11.6169 10.8297L11.66 10.8269L14.0055 10.8271Z" />
    </svg>
  )
}
