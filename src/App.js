import React, { useState, useEffect } from 'react'
import './App.scss'
import Discover from './components/lists/Discover'
import SearchBar from './components/searchBar/SearchBar'
import SelectedMovie from './components/movie/SelectedMovie'
import { getMovieDiscover, initMovieService, searchMovies } from './services/MovieService'
import MyList from './components/lists/MyList'
import FiltersContainers from './components/filters/FiltersContainer'
import MovieDetail from './components/movie/MovieDetail'

function App () {
  const [myMovies, setMyMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [selectdMovie, setSelectedMovie] = useState({})
  const [showDetails, setShowDetails] = useState(false)
  const [moviesPage, setMoviesPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [searchString, setSearchString] = useState('')
  const [enabledFilters, setEnabledFilters] = useState(true)

  useEffect(() => {
    initMovieService()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieDiscover(moviesPage, filters)
      setSelectedMovie(data[0])
      setMovies(data)
    }
    getData()
  }, [moviesPage, filters])

  useEffect(() => {
    if (searchString !== '') {
      setEnabledFilters(false)
    } else {
      setEnabledFilters(true)
    }
  }, [searchString])

  const setStarsFilter = (number) => {
    const newFilters = { ...filters }
    newFilters.stars = number
    setFilters(newFilters)
  }

  const setGenresFilter = (genres) => {
    const newFilters = { ...filters }
    newFilters.genres = genres
    setFilters(newFilters)
  }

  const search = async () => {
    setMovies(await searchMovies(moviesPage, searchString))
  }

  const addToFavourites = (movie) => {
    setMyMovies([...myMovies, movie])
  }

  const closeDetail = () => {
    setShowDetails(false)
  }

  const openDetail = (movie) => {
    setSelectedMovie(movie)
    setShowDetails(true)
  }

  return (
    <div className="App">
          <SelectedMovie movie={selectdMovie} closeDetail={closeDetail} />

          { !showDetails &&
          <div className='grid grid-cols-5 gap-4'>
            <FiltersContainers
              setGenresFilter={setGenresFilter}
              setStarsFilter={setStarsFilter}
              enabledFilters={enabledFilters}
            />
            <div className='grow col-span-4'>
              <SearchBar onSearch={search} searchString={searchString} setSearchString={setSearchString}/>
              <MyList myMovies={myMovies} openDetail={openDetail}/>
              <Discover movies={movies} addToFavourites={addToFavourites} openDetail={openDetail}/>
              <button type="button" onClick={() => setMoviesPage(moviesPage + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Next</button>
              <button type="button" onClick={() => setMoviesPage(moviesPage - 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Prev</button>
            </div>
          </div>
          }
          {
            showDetails &&
            <MovieDetail selectedMovie={selectdMovie} />
          }
    </div>
  )
}

export default App
