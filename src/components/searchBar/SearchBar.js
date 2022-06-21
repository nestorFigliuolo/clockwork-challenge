import React, { useState } from 'react'
import PropTypes from 'prop-types'

function SearchBar (props) {
  return (
    <div>
        <input type='search' placeholder="Search..." value={props.searchString} onChange={(event) => props.setSearchString(event.target.value)}></input>
        <button onClick={() => props.onSearch()}>Search</button>
    </div>
  )
}

SearchBar.propTypes = {
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
  onSearch: PropTypes.func
}

export default SearchBar
