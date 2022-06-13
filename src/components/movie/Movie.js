import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getImageUrl } from '../../services/MovieService'

function Movie (props) {
  const movie = props.movie
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const getUrl = async () => {
      setImageUrl(await getImageUrl(movie.poster_path))
    }
    getUrl()
  })

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <p>{movie.id} - {movie.original_title}</p>
        <img src={imageUrl} onClick={() => props.setSelectedMovie(props.movie)}/>
    </div>
  )
}

Movie.propTypes = {
  movie: PropTypes.object,
  setSelectedMovie: PropTypes.func
}

export default Movie
