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
  configuration = response.data
  console.log(configuration)
}

export async function getMovieDiscover (page, rawFilters) {
  console.log(rawFilters)
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
  if (rawFilters.searchStr) {
    params.with_keywords = rawFilters.searchStr.split(' ').reduce((str, keyword) => {
      return `${keyword},${str}`
    }, '')
  }
  try {
    const data = (await client.get('/discover/movie', {
      params
    })).data
    if (!configuration) {
      await initMovieService()
    }
    for (const movie of data.results) {
      movie.backdrop_path = await getBackdropPath(movie.backdrop_path)
      movie.poster_path = await getPosterPath(movie.poster_path)
    }
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
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
    console.log(genres)
    return genres
  } catch (err) {
    console.log(err)
  }
}
