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
  const [searchedMovies, setSearchedMovies] = useState(false)

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
    setSearchedMovies(false)
  }

  const setGenresFilter = (genres) => {
    const newFilters = { ...filters }
    newFilters.genres = genres
    setFilters(newFilters)
    setSearchedMovies(false)
  }

  const search = async () => {
    if (searchString !== '') {
      setSearchedMovies(true)
      setMovies(await searchMovies(moviesPage, searchString))
    }
  }

  const addToFavourites = (movie) => {
    if (myMovies.map(movie => movie.id).indexOf(movie.id) === -1) {
      setMyMovies([...myMovies, movie])
    }
  }

  const openDetail = (movie) => {
    setSelectedMovie(movie)
    setShowDetails(true)
  }

  return (
    <div className="App">
          <SelectedMovie movie={selectdMovie} addToFavourites={addToFavourites} isShowingDetails={showDetails} />
          <div className='moviesContainer'>
            {/* Usé rendering condicional en vez de algo mas extensible como rutas por una cuestion de tiempo, pero para una app de mayor escala esta solucion no es optima. */}
            {
              !showDetails &&
              <div className=' mainGrid flex flex-col'>
                <div className='lg:row-span-2'>
                  <FiltersContainers className='flex-none'
                    setGenresFilter={setGenresFilter}
                    setStarsFilter={setStarsFilter}
                    enabledFilters={enabledFilters}
                  />
                </div>

                <div className='order-first mb-6 lg:mb-0 lg:col-span-3 lg:col-start-2 lg:row-start-1'>
                  <SearchBar onSearch={search} searchString={searchString} setSearchString={setSearchString}/>
                </div>
                <div className='lg:col-span-3 lg:col-start-2 lg:row-start-2'>
                  <MyList
                    myMovies={myMovies}
                    openDetail={openDetail}
                  />
                  <Discover
                    movies={movies}
                    addToFavourites={addToFavourites}
                    openDetail={openDetail}
                    isSearching={searchedMovies}
                  />
                  <div className='flex flex-row justify-center lg:justify-end gap-4 mt-16 mb-16'>
                    <button
                      type="button"
                      className={`pageButton ${(moviesPage === 1) ? 'pageButtonDisabled' : ''} flex flex-row justify-center items-center gap-4`}
                      disabled={moviesPage === 1}
                      onClick={() => setMoviesPage(moviesPage - 1)}
                    >
                      <img src='/chevron-left.svg' /> Previous
                    </button>
                    <button type="button" onClick={() => setMoviesPage(moviesPage + 1)} className='pageButton flex flex-row justify-center items-center gap-4'>Next <img src='/chevron-right.svg' /></button>
                  </div>

                </div>
              </div>
            }
            {
              showDetails &&
              <MovieDetail selectedMovie={selectdMovie} />
            }
          </div>

    </div>
  )
}

export default App
