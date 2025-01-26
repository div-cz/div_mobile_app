import axios from "axios"

const MOVIES_ENDPOINT = "http://monitoring.ekultura.eu/div/json/movies.php?limit=5"

export async function fetchMovies() {
    const response = await axios.get(MOVIES_ENDPOINT)
    return response.data
}