import React from 'react'
import PropTypes from 'prop-types'

function SelectedMovie (props) {
  return (
    <div>
      <div>{props.movie.original_title}</div>
      {/* <img src={props.movie.backdrop_path} /> */}
    </div>
  )
}

SelectedMovie.propTypes = {
  movie: PropTypes.object
}

export default SelectedMovie
