import React, { useEffect, useState } from "react"

const nextUntil = (elem: any, selector: string) => {
  const siblings = []
  let nextElement = elem.nextElementSibling

  while (nextElement) {
    if (nextElement.matches(selector)) break

    siblings.push(nextElement)

    nextElement = nextElement.nextElementSibling
  }

  return siblings
}

export const useFAQAccordion = () => {
  const [buttonCreated, setButtonCreated] = useState(false)
  const toggleChildrenClass = (element: React.ReactNode) => {
    Array.from(nextUntil(element, "button")).map(p =>
      p.classList.toggle("show")
    )
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash ? window.location.hash.split("#")[1] : ""

      if (hash && buttonCreated) {
        const anchor = document && document.getElementById(hash)
        const heading: any = anchor && anchor.parentNode

        if (heading) {
          heading.parentNode.classList.toggle("open")
          heading.classList.toggle("open")
          toggleChildrenClass(heading.parentNode)
        }
      }
    }
  }, [buttonCreated])

  useEffect(() => {
    const allH3 = document.querySelectorAll("h3")

    Array.from(allH3).forEach(h3 => {
      const button = document.createElement("button")
      button.classList.add("faq-button-question")
      h3.parentNode?.insertBefore(button, h3)
      button.appendChild(h3)
      setButtonCreated(true)
    })
  }, [])

  useEffect(() => {
    const toggleClasses = (e: any) => {
      if (e.target.localName !== "button" && e.target.localName !== "h3") return

      const element =
        e.target.localName === "button" ? e.target : e.target.parentNode

    
      if (typeof window !== 'undefined') {
        window.history.replaceState(
          {},
          "",
          "#" + e.target.getElementsByTagName("a")[0].id
        )
        window.history.scrollRestoration = "manual"
      }

      if (e.target.localName === "button") {
        e.target.classList.toggle("open")
        e.target.getElementsByTagName("h3")[0].classList.toggle("open")
      } else {
        e.target.classList.toggle("open")
        e.target.parentNode.classList.toggle("open")
      }

      toggleChildrenClass(element)
    }

    document.addEventListener("click", toggleClasses)

    return () => document.removeEventListener("click", toggleClasses)
  }, [typeof window !== 'undefined' ? window.location.hash : null])
}