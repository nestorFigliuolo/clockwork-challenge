import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Movie (props) {
  const movie = props.movie
  const [isHovering, setIsHovering] = useState(true)

  const onMouseEnter = () => {
    setIsHovering(true)
  }

  const onMouseLeave = () => {
    setIsHovering(false)
  }

  const genStars = () => {
    const stars = []
    for (let i = 0; i < (movie.vote_average / 2); i++) {
      stars.push((<img src='/star-selected.svg' />))
    }
    return stars
  }

  const getTitle = () => {
    if (!isHovering) {
      return (movie.original_title.length > 20) ? `${movie.original_title.slice(0, 20)}...` : movie.original_title
    } else {
      return movie.original_title
    }
  }

  return (
    <div className='movieContainer p-4 relative'>
      <div className='flex flex-col gap-y-2'>
        <div className='relative flex flex-column justify-center'>
          <p className='movieCategory absolute p-2'>{props.movie.genres[0].toUpperCase() ?? ''}</p>
          <img className='moviePoster' src={ props.movie.poster_path} onClick={() => props.openDetail(props.movie)}/>
        </div>

        <p className='movieTitle'>{getTitle()}</p>
        <div className='flex flex-row justify-center space-x-2'>
          <p className='movieInfo'>{movie.release_date.split('-')[0]}</p>
          <p className='movieInfo'> {`${(movie.runtime / 60).toFixed(0)}hs ${(movie.runtime % 60)}minutes`} </p>
        </div>
        { isHovering &&
        <div className='flex flex-col gap-y-2'>
          <div className='flex flex-row gap-2 justify-center'>
            {genStars()}
          </div>
        </div>
        }
      </div>
      {
        isHovering &&
        <div className='movieHoverButtonsContainer flex flex-row gap-4 justify-center'>
          <button className='moviePlayButton flex justify-center items-center' onClick={() => props.addToFavourites(movie)}>
            <img src='/play-icon.svg' />
          </button>
          <button className='movieAddToListButton flex justify-center items-center' onClick={() => props.addToFavourites(movie)}>
            <img src='/add-to-list-blue-icon.svg' />
          </button>
        </div>
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
