import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../movie/Movie'

function MyList (props) {
  return (
    <div className={`${props.myMovies.length === 0 ? 'hidden' : ''}`}>
      <p className='myListTitle text-left mt-6 mb-6'>My List</p>
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
