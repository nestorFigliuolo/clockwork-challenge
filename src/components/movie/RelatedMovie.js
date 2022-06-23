import React from 'react'
import PropTypes from 'prop-types'

// Este componente podria haberse hecho como una generalizacion de Movie por su comportamiento similar
// pero por temas de tiempo preferi hacerl uno nuevo
function RelatedMovie (props) {
  const movie = props.movie
  return (
    <div className='flex flex-col gap-4'>
      <img className='moviePoster' src={movie.poster_path}/>
      <p className='relatedMovieTitle text-left'>{(movie.original_title.length > 20) ? `${movie.original_title.slice(0, 20)}...` : movie.original_title}</p>
      <div className='flex flex-row gap-4'>
        <p className='movieInfo'>{movie.release_date.split('-')[0]}</p>
        <p className='movieInfo'> {`${(movie.runtime / 60).toFixed(0)}hs ${(movie.runtime % 60)}minutes`} </p>
      </div>
    </div>
  )
}

RelatedMovie.propTypes = {
  movie: PropTypes.object
}

export default RelatedMovie
