import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../movie/Movie'

function Discover (props) {
  return (
    <div>
      <p className='discoverTitle text-left mt-6 mb-6'>Discover</p>
      <div className='grid grid-cols-4 gap-4'>
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
  addToFavourites: PropTypes.func
}

export default Discover
