import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getImageUrl } from '../../services/MovieService'

function Movie (props) {
  const movie = props.movie

  return (
    <div className='movieContainer p-4'>
      <div className='flex flex-col'>
        <img className='moviePoster' src={ props.movie.poster_path} onClick={() => props.openDetail(props.movie)}/>
        <p className='movieTitle'>{movie.original_title}</p>
        <div className='flex flex-row justify-center space-x-2'>
          <p className='movieInfo'>{movie.release_date.split('-')[0]}</p>
          <p className='movieInfo'> {`${(movie.runtime / 60).toFixed(0)}hs ${(movie.runtime % 60)}minutes`} </p>
        </div>
      </div>
      <button onClick={() => props.addToFavourites(movie)}>+</button>
    </div>
  )
}

Movie.propTypes = {
  movie: PropTypes.object,
  openDetail: PropTypes.func,
  addToFavourites: PropTypes.func
}

export default Movie
