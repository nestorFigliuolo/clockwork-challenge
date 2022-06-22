import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getImageUrl } from '../../services/MovieService'

function Movie (props) {
  const movie = props.movie
  const [isHovering, setIsHovering] = useState(false)

  const onMouseEnter = () => {
    setIsHovering(true)
  }

  const onMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div className='movieContainer p-4' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className='flex flex-col'>
        <div className='relative flex flex-column justify-center'>
          <p className='movieCategory absolute p-2'>{props.movie.genres[0].toUpperCase() ?? ''}</p>
          <img className='moviePoster' src={ props.movie.poster_path} onClick={() => props.openDetail(props.movie)}/>
        </div>

        <p className='movieTitle'>{movie.original_title}</p>
        <div className='flex flex-row justify-center space-x-2'>
          <p className='movieInfo'>{movie.release_date.split('-')[0]}</p>
          <p className='movieInfo'> {`${(movie.runtime / 60).toFixed(0)}hs ${(movie.runtime % 60)}minutes`} </p>
        </div>
      </div>
      { isHovering &&
        <button onClick={() => props.addToFavourites(movie)}>
          <img src='/play-icon.svg' />
        </button>
      }
    </div>
  )
}

Movie.propTypes = {
  movie: PropTypes.object,
  openDetail: PropTypes.func,
  addToFavourites: PropTypes.func
}

export default Movie
