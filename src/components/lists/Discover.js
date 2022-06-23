import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../movie/Movie'

function Discover (props) {
  return (
    <div>
      <p className={`discoverTitle text-left mt-6 mb-6 ${(props.isSearching) ? 'hidden' : ''}`}>Discover</p>
      <div className='flex flex-col lg:grid lg:grid-cols-4 gap-6'>
          {
          props.movies.map((movie, index) => {
            return <Movie key={index} movie={movie} openDetail={props.openDetail} addToFavourites={props.addToFavourites}/>
          })
          }
      </div>
    </div>
  )
}

Discover.propTypes = {
  movies: PropTypes.array,
  openDetail: PropTypes.func,
  addToFavourites: PropTypes.func,
  isSearching: PropTypes.bool
}

export default Discover
