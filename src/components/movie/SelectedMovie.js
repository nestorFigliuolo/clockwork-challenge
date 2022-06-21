import React from 'react'
import PropTypes from 'prop-types'

function SelectedMovie (props) {
  const movie = props.movie || {}
  return (
    <div className='selectedMovieBackground px-40 py-14 flex flex-col justify-start space-y-6' style={{ background: `linear-gradient(90deg, #070707 13.01%, rgba(0, 0, 0, 0.69) 75.59%), url(${movie.backdrop_path}) center center` }}>
      {/* <button onClick={() => props.closeDetail()}>X</button> */}
      <div className='flex flex-row flex-initial space-x-10'>
        <p className='selectedMovieInfo'>{(movie.genres) ? movie.genres[0] : ''}</p>
        <p className='selectedMovieInfo'>{(movie.release_date) ? movie.release_date.split('-')[0] : ''}</p>
        <p className='selectedMovieInfo'> {(movie.runtime) ? `${(movie.runtime / 60).toFixed(0)}hs ${(movie.runtime % 60)}minutes` : ''} </p>
      </div>
      <p className='selectedMovieTitle text-left text-5xl'>{movie.original_title}</p>
      <p className='text-left selectedMovieOverview'>{movie.overview}</p>
      <div className='flex flex-row justify-start space-x-4'>
        <button className='selectedMovieButton selectedMovieWatchNowButton p-4'>Watch Now</button>
        <button className='selectedMovieButton selectedMovieAddToListButton p-4'>Watch Now</button>
      </div>
    </div>
  )
}

SelectedMovie.propTypes = {
  movie: PropTypes.object,
  closeDetail: PropTypes.func
}

export default SelectedMovie
