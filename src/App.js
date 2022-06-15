import React, { useState, useEffect } from 'react'
import './App.css'
import Discover from './components/discover/Discover'
import GenreFilter from './components/filters/GenreFilter'
import StarFilter from './components/filters/StarFilter'
import SelectedMovie from './components/movie/SelectedMovie'
import { getMovieDiscover, init, initMovieService } from './services/MovieService'

function App () {
  const [movies, setMovies] = useState([])
  const [selectdMovie, setSelectedMovie] = useState({})
  const [moviesPage, setMoviesPage] = useState(1)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    initMovieService()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieDiscover(moviesPage, filters)
      setSelectedMovie(data.results[0])
      setMovies(data.results)
    }
    getData()
  }, [moviesPage, filters])

  const setStarsFilter = (number) => {
    setFilters({ ...filters, stars: number })
  }

  const setGenresFilter = (genres) => {
    setFilters({ ...filters, genres })
  }

  return (
    <div className="App">
      <SelectedMovie movie={selectdMovie} />
      <StarFilter setStarsFilter={setStarsFilter}/>
      <GenreFilter setGenresFilter={setFilters}/>
      <Discover movies={movies} setSelectedMovie={setSelectedMovie}/>
      <button type="button" onClick={() => setMoviesPage(moviesPage + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Next</button>
      <button type="button" onClick={() => setMoviesPage(moviesPage - 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Prev</button>
    </div>
  )
}

export default App
