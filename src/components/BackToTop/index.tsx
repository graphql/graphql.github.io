import React, { useEffect, useState } from "react"

interface Props {
  scrollThreshold: number
}

const BackToTop: React.FC<Props> = ({ scrollThreshold }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.body.scrollHeight
      const currentPosition = window.pageYOffset
      if (pageHeight < 6000) {
        setIsVisible(false)
      } else {
        if (currentPosition > scrollThreshold) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrollThreshold])

  const handleBackToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button
          className={`bg-[#fb86cd] fixed bottom-10 right-5 cursor-pointer no-underline font-bold inline-flex text-center w-[fit-content] border-0 py-2 px-6 no-underline hover:no-underline focus:outline-none hover:drop-shadow-md hover:[transform:scale(1.05)] rounded text-sm sm:text-base whitespace-nowrap `}
          onClick={handleBackToTopClick}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </>
  )
}

export default BackToTop
