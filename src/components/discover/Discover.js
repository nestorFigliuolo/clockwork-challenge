import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../movie/Movie'

function Discover (props) {
  return (
        <div className='grid grid-cols-4 gap-4'>
            {
            props.movies.map((movie, index) => {
              return <Movie key={index} movie={movie} setSelectedMovie={props.setSelectedMovie}/>
            })
            }
        </div>
  )
}

Discover.propTypes = {
  movies: PropTypes.array,
  setSelectedMovie: PropTypes.func
}

export default Discover
