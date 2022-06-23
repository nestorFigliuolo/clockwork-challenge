import React from 'react'
import PropTypes from 'prop-types'

function SelectedMovie (props) {
  const movie = props.movie || {}

  const isHidden = () => {
    return !props.isShowingDetails && (window.innerWidth < 1024)
  }

  return (
    <div className='selectedMovieBackground' style={{ background: `linear-gradient(90deg, #070707 13.01%, rgba(0, 0, 0, 0.69) 75.59%), url(${movie.backdrop_path}) no-repeat center` }}>
      <div className='flex flex-col lg:flex-row items-center moviesDetailContainer'>
        {
          props.isShowingDetails &&
            <img className='selectedMovieDetailMiniPoster self-start lg:self-center mr-20 ' src={movie.poster_path} />
        }
        <div className='py-14 flex flex-col justify-start space-y-6'>
          <p className='selectedMovieTitle text-left text-5xl'>{movie.original_title}</p>

          <p className={`text-left selectedMovieOverview ${isHidden() ? 'hidden' : ''}`}>{movie.overview}</p>

          <div className='flex flex-row flex-initial lg:order-first lg:mb-8 space-x-10 lg:pb-4' >
            <p className='selectedMovieInfo'>{(movie.genres) ? movie.genres[0] : ''}</p>
            <p className='selectedMovieInfo'>{(movie.release_date) ? movie.release_date.split('-')[0] : ''}</p>
            <p className='selectedMovieInfo'> {(movie.runtime) ? `${(movie.runtime / 60).toFixed(0)}hs ${(movie.runtime % 60)}minutes` : ''} </p>
          </div>
          <div className='flex flex-col sm:space-y-4 lg:flex-row lg:justify-start lg:space-x-4 lg:space-y-0'>
            <button
              className='selectedMovieButton selectedMovieWatchNowButton p-4 flex flex-row justify-between'
            >
              <p>Watch Now</p>
              <img className='pr-4' src='/play-icon.svg' />
            </button>
            <button
              className='selectedMovieButton selectedMovieAddToListButton p-4 flex flex-row justify-between'
              onClick={() => props.addToFavourites(movie)}
            >
              <p>Add To List</p>
              <img className='pr-4' src='/add-to-list-icon.svg' />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

SelectedMovie.propTypes = {
  movie: PropTypes.object,
  addToFavourites: PropTypes.func,
  isShowingDetails: PropTypes.bool
}

export default SelectedMovie
