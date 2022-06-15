import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getGenres, initMovieService } from '../../services/MovieService'

function GenreFilter (props) {
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])

  useEffect(() => {
    const initGenres = async () => {
      setGenres(await getGenres())
    }
    initGenres()
  }, [])

  const onGenreChange = (isChecked, genreId) => {
    const newSelectedGenres = [...selectedGenres]
    if (isChecked) {
      newSelectedGenres.push(genreId)
    } else {
      newSelectedGenres.splice(newSelectedGenres.indexOf(genreId), 1)
    }
    setSelectedGenres(newSelectedGenres)
    props.setGenresFilter(newSelectedGenres)
  }

  return (
    <div>
      {genres.map((genre, index) => {
        return <label key={index}>
          <input type='checkbox' value={selectedGenres.indexOf(genre.id) !== -1} onChange={(event) => onGenreChange(event.target.checked, genre.id)}/>
          {genre.name}
        </label>
      })}
    </div>
  )
}

GenreFilter.propTypes = {
  setGenresFilter: PropTypes.func
}

export default GenreFilter
