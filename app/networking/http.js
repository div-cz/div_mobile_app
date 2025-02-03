import axios from "axios"

const MOVIES_ENDPOINT = "https://magic.div.cz/api/movie/?format=json&limit=10&offset=10"
const MOVIES_IMAGE_URL = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"

export async function fetchMovies() {
    const response = await axios.get(MOVIES_ENDPOINT)
    return response.data
}