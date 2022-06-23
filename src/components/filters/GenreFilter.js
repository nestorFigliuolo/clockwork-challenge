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

  const onGenreChange = (genreId) => {
    const newSelectedGenres = [...selectedGenres]
    if (!newSelectedGenres.includes(genreId)) {
      newSelectedGenres.push(genreId)
    } else {
      newSelectedGenres.splice(newSelectedGenres.indexOf(genreId), 1)
    }
    setSelectedGenres(newSelectedGenres)
    props.setGenresFilter(newSelectedGenres)
  }

  return (
    <div className='filterContainerBubble p-8'>
      <p className='genreFilterTitle text-left pb-6'>Category</p>
      <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4'>
        {genres.map((genre, index) => {
          return (
            <label className='genreFilterLabel flex flex-row gap-4' key={index}>
              <div className='h-full min-h-full' onClick={() => onGenreChange(genre.id)}>
                <img src={(selectedGenres.indexOf(genre.id) !== -1) ? '/genre-checked.svg' : '/genre-unchecked.svg'} />
              </div>
              {genre.name}
            </label>
          )
        })}
      </div>
    </div>
  )
}

GenreFilter.propTypes = {
  setGenresFilter: PropTypes.func
}

export default GenreFilter
