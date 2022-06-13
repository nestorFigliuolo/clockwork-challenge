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

export async function getMovieDiscover (page) {
  try {
    const response = await client.get('/discover/movie', {
      params: { page }
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export async function getImageUrl (imagePath) {
  if (!configuration) {
    await initMovieService()
  }
  return `${configuration.images.secure_base_url}${configuration.images.poster_sizes[3]}${imagePath}?api_key=${apiKey}`
}
