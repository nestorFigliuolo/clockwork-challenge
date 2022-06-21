import axios from 'axios'

const baseURL = process.env.REACT_APP_TMDB_BASE_URL
const apiKey = process.env.REACT_APP_TMDB_API_KEY

const client = axios.create({
  baseURL,
  params: {
    api_key: apiKey
  }
})

let configuration

export async function initMovieService () {
  const response = await client.get('/configuration')
  const genres = await getGenres()

  configuration = response.data
  configuration.genres = genres
}

export async function getMovieDiscover (page, rawFilters) {
  try {
    const params = { page }

    if (rawFilters.stars) {
      params['vote_average.gte'] = (rawFilters.stars * 2) - 2
      params['vote_average.lte'] = (rawFilters.stars * 2)
    }
    if (rawFilters.genres) {
      params.with_genres = rawFilters.genres.reduce((str, genre) => {
        return `${genre},${str}`
      }, '')
    }

    return await fetchMovies('/discover/movie', params)
  } catch (err) {
    console.log(err)
  }
}

export async function searchMovies (page, searchStr) {
  try {
    const params = { page, query: encodeURI(searchStr) }
    const data = await fetchMovies('/search/movie', params)
    return data
  } catch (err) {
    console.log(err)
  }
}

async function fetchMovies (url, params) {
  try {
    const movies = (await client.get(url, {
      params
    })).data.results
    if (!configuration) {
      await initMovieService()
    }

    for (const movie of movies) {
      movie.backdrop_path = getBackdropPath(movie.backdrop_path)
      movie.poster_path = getPosterPath(movie.poster_path)
      movie.genres = configuration.genres.filter(genre => { return movie.genre_ids.indexOf(genre.id) !== -1 }).map(genre => genre.name)
    }
    const promiseArr = []
    movies.forEach(movie => promiseArr.push(appendDetailsToMovie(movie)))
    return Promise.all(promiseArr)
  } catch (err) {
    console.log(err)
  }
}

async function appendDetailsToMovie (movie) {
  const details = (await client.get(`/movie/${movie.id}`)).data
  return { ...details, ...movie }
}

function getPosterPath (imagePath) {
  return `${configuration.images.secure_base_url}original${imagePath}?api_key=${apiKey}`
}

function getBackdropPath (imagePath) {
  return `${configuration.images.secure_base_url}original${imagePath}?api_key=${apiKey}`
}

export async function getGenres () {
  try {
    const genres = (await client.get('/genre/movie/list')).data.genres
    return genres
  } catch (err) {
    console.log(err)
  }
}
