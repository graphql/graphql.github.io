import React from "react"

const Search = (): JSX.Element => {
  return (
    <div className="algolia-search-wrapper">
      <input
        id="algolia-search-input"
        type="text"
        placeholder="Search docs..."
        aria-label="Search docs"
      />
    </div>
  )
}

export default Search
