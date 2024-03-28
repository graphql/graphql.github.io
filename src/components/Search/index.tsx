import React, { useEffect } from "react"

// Added to the global runtime by the script tag further down the file.
declare const docsearch: any | undefined

// Runs the new docsearch function over possible search inputs
const runDocsearchIfPossible = () => {
  if (typeof docsearch !== "undefined") {
    const searches = ["algolia-search-input", "hero-search-input"]
    for (const searchID of searches) {
      if (!document.getElementById(searchID)) continue

      docsearch({
        apiKey: "d103541f3e6041148aade2e746ed4d61",
        indexName: "graphql",
        inputSelector: `#${searchID}`,
      })
    }
  }
}

const Search = ({ searchID }: { searchID?: string }): JSX.Element => {
  const searchInputID = searchID || "algolia-search-input"

  // This extra bit of mis-direction ensures that non-essential code runs after
  // the page is loaded
  useEffect(() => {
    runDocsearchIfPossible()

    const handleSearchTrigger = (event: KeyboardEvent) => {
      const slashKeyPressed = event.key === "/" || event.code === "Slash"
      if (!slashKeyPressed) {
        return
      }
      event.preventDefault()
      const searchInput = document.querySelector<HTMLInputElement>(
        `#${searchInputID}`,
      )

      if (searchInput) {
        searchInput.focus()
      }
    }

    window.addEventListener("keypress", handleSearchTrigger)

    if (document.getElementById("algolia-search")) return

    const searchScript = document.createElement("script")
    searchScript.id = "algolia-search"
    const searchCSS = document.createElement("link")

    searchScript.src =
      "https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"
    searchScript.async = true
    searchScript.onload = () => {
      if (typeof docsearch !== "undefined") {
        runDocsearchIfPossible()

        searchCSS.rel = "stylesheet"
        searchCSS.href =
          "https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css"
        searchCSS.type = "text/css"
        document.body.appendChild(searchCSS)
      }
    }

    document.body.appendChild(searchScript)

    return () => {
      window.removeEventListener("keypress", handleSearchTrigger)
    }
  }, [])

  return (
    <div className="algolia-search-wrapper">
      <input
        id={searchInputID}
        type="text"
        placeholder="Search docs..."
        aria-label="Search docs"
      />
    </div>
  )
}

export default Search
