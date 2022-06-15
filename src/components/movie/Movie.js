import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getImageUrl } from '../../services/MovieService'

function Movie (props) {
  const movie = props.movie

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <p>{movie.id} - {movie.original_title}</p>
        <img src={ props.movie.poster_path} onClick={() => props.setSelectedMovie(props.movie)}/>
    </div>
  )
}

Movie.propTypes = {
  movie: PropTypes.object,
  setSelectedMovie: PropTypes.func
}

export default Movie
