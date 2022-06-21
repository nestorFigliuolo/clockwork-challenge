import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../movie/Movie'

function MyList (props) {
  return (
    <div>
      <h1>My List</h1>
      <div className='grid grid-cols-4 gap-4'>
      {
        props.myMovies.map((movie, index) => {
          return <Movie key={index} movie={movie} openDetail={props.openDetail} />
        })
      }
      </div>
    </div>
  )
}

MyList.propTypes = {
  myMovies: PropTypes.array,
  openDetail: PropTypes.func
}

export default MyList
