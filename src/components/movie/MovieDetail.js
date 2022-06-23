import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getSimilarMovies, getTopRatedMovies } from '../../services/MovieService'
import RelatedMovie from './RelatedMovie'

function MovieDetail (props) {
  const movie = props.selectedMovie
  const [similarMovies, setSimilarMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      // Tuve que usar un slice porque no hay forma de limitar el numero de resultados de la API
      setSimilarMovies((await getSimilarMovies(movie.id)).slice(0, 5))
      setTopRatedMovies((await getTopRatedMovies()).slice(0, 5))
    }
    getMovies()
  })

  return (
    <div className='flex flex-col gap-8'>
      <p className='movieDetailSimilarTitlesTitle text-left lg:mb-12'>Browse Similar Titles</p>
      <div className='flex flex-col lg:grid lg:grid-cols-5 gap-36'>
      {
        similarMovies.map((movie, index) => {
          return <RelatedMovie movie={movie} key={index} />
        })
      }
      </div>

      <p className='movieDetailBestRatedTitle text-left'>Best Rated</p>
      <div className='flex flex-col lg:grid lg:grid-cols-5 gap-36'>
      {
        topRatedMovies.map((movie, index) => {
          return <RelatedMovie movie={movie} key={index} />
        })
      }
      </div>
    </div>
  )
}

MovieDetail.propTypes = {
  selectedMovie: PropTypes.object
}

export default MovieDetail
