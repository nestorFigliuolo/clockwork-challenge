import React, { useState } from 'react'
import PropTypes from 'prop-types'

function SearchBar (props) {
  const [searchValue, setSearchValue] = useState('')

  const onSearch = () => {
    props.setSearchFilter(searchValue)
  }

  return (
        <div>
            <input type='search' placeholder="Search..." value={searchValue} onChange={(event) => setSearchValue(event.target.value)}></input>
            <button onClick={() => onSearch()}>Search</button>
        </div>
  )
}

SearchBar.propTypes = {
  setSearchFilter: PropTypes.func
}

export default SearchBar
