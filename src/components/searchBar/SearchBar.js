import React, { useState } from 'react'
import PropTypes from 'prop-types'

function SearchBar (props) {
  return (
    <div className='flex flex-row'>
        <input className={`${(props.searchString === '') ? 'searchBarInputEmpty' : 'searchBarInputWithText'} searchBarInput w-full h-12 p-8`} type='search' placeholder="Search..." value={props.searchString} onChange={(event) => props.setSearchString(event.target.value)}></input>
        <button className='searcBarIcon' onClick={() => props.onSearch()}><img src={(props.searchString === '') ? '/search-icon.svg' : '/search-icon-inverted.svg'} /></button>
    </div>
  )
}

SearchBar.propTypes = {
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
  onSearch: PropTypes.func
}

export default SearchBar
