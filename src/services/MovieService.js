import axios from 'axios'

const baseURL = process.env.REACT_APP_TMDB_BASE_URL
const apiKey = process.env.REACT_APP_TMDB_API_KEY

const client = axios.create({
  baseURL,
  params: {
    api_key: apiKey
  }
})

// Guardo la configuracion de la API para evitar tener que pedirla en cada llamada que requiere datos
// de los tamaños de imagenes o generos de peliculas.
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

    // La app puntua a las peliculas de 1 a 5 estrellas, pero la API lo hace de 0 a 10, asi que se debe acomodar.
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

export async function getSimilarMovies (movieId) {
  try {
    return await fetchMovies(`/movie/${movieId}/similar`, {})
  } catch (err) {
    console.log(err)
  }
}

export async function getTopRatedMovies () {
  try {
    return await fetchMovies('/movie/top_rated', {})
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

    // Por cada pelicula genero las urls completas para los posters e imagen de fondo,
    // ademas mapeo los id de genero a los nombres completos.
    for (const movie of movies) {
      movie.backdrop_path = getBackdropPath(movie.backdrop_path)
      movie.poster_path = getPosterPath(movie.poster_path)
      movie.genres = configuration.genres.filter(genre => { return movie.genre_ids.indexOf(genre.id) !== -1 }).map(genre => genre.name)
    }

    // Cuando obtengo una lista de peliculas debo rellenar informacion faltante, como esta informacion se puede obtener para cada pelicula
    // creo un arreglo de promesas con la funcion que completa la informacion de la pelicula por cada una de las que obtuve.
    const promiseArr = []
    movies.forEach(movie => promiseArr.push(appendDetailsToMovie(movie)))
    return Promise.all(promiseArr)
  } catch (err) {
    console.log(err)
  }
}

// A las peliculas que vienen de las llamadas de la API le faltan algunos datos que estan solo en la llamada de detalles,
// esta funcion combina esos datos para tener toda la informacion necesaria de una pelicula
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
