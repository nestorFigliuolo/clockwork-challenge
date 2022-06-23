import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Movie (props) {
  const movie = props.movie
  const [isHovering, setIsHovering] = useState(false)

  const onMouseEnter = () => {
    setIsHovering(true)
  }

  const onMouseLeave = () => {
    setIsHovering(false)
  }

  const genStars = () => {
    const stars = []
    for (let i = 0; i < (Math.floor(movie.vote_average / 2)); i++) {
      stars.push((<img key={i} src='/star-selected.svg' />))
    }
    // Caso borde donde si los votos estan en el limite superior se pone una estrella de mas, entonces debo removerla.
    if (Math.floor(movie.vote_average / 2) === movie.vote_average / 2) {
      stars.pop()
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

  const showExtra = () => {
    return isHovering || (window.innerWidth < 1024)
  }

  return (
    <div className={`${isHovering ? 'movieContainerHover' : 'movieContainer'} p-4 mb-12 lg:mb-0`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className='flex flex-col gap-y-2 mb-8' onClick={() => props.openDetail(props.movie)}>
        <div className='relative flex flex-column justify-center'>
          {/* No siempre las peliculas tienen genero, en particular las que tienen 1 estrella */}
          <p className='movieCategory absolute p-2'>{(props.movie.genres.length > 0) ? props.movie.genres[0].toUpperCase() : ''}</p>
          <img className='moviePoster' src={props.movie.poster_path}/>
        </div>

        <p className='movieTitle'>{getTitle()}</p>
        <div className='flex flex-row justify-center space-x-2'>
          <p className='movieInfo'>{movie.release_date.split('-')[0]}</p>
          <p className='movieInfo'> {`${(movie.runtime / 60).toFixed(0)}hs ${(movie.runtime % 60)}minutes`} </p>
        </div>
        { showExtra() &&
        <div className='flex flex-col gap-y-2'>
          <div className='flex flex-row gap-2 justify-center'>
            {genStars()}
          </div>
        </div>
        }
      </div>
      {
        showExtra() &&
        <div className='movieButtonsContainer flex flex-row gap-4 justify-center'>
          <button className='moviePlayButton flex justify-center items-center' onClick={() => props.addToFavourites(movie)}>
            <img src='/play-icon.svg' />
          </button>
          <button className='movieAddToListButton flex justify-center items-center' onClick={() => props.addToFavourites(movie)} disabled={!props.addToFavourites}>
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
