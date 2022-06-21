import React from 'react'
import PropTypes from 'prop-types'

function MovieDetail (props) {
  const movie = props.selectedMovie
  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  )
}

MovieDetail.propTypes = {
  selectedMovie: PropTypes.object
}

export default MovieDetail
