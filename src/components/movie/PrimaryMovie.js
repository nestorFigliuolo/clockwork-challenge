import React from 'react'
import PropTypes from 'prop-types'

function PrimaryMovie (props) {
  return (
        <div>{props.movie.original_title}</div>
  )
}

PrimaryMovie.propTypes = {
  movie: PropTypes.object
}

export default PrimaryMovie
