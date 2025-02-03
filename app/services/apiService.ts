import axios from "axios"

/* const MOVIES_ENDPOINT = "https://magic.div.cz/api/movie/?format=json&limit=10&offset=10"
const MOVIES_IMAGE_URL = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"

export async function fetchMovies() {
    const response = await axios.get(MOVIES_ENDPOINT)
    return response.data
} */

interface ApiConfig {
    baseUrl: string
    posterBaseUrl?: string
    query?: Record<string, string | number>
}

class ApiService {
    private config: ApiConfig

    constructor(config: ApiConfig) {
        this.config = config
    }

    async fetchMedia<T>(endpoint: string = ""): Promise<T> {
        try {
            const response = await axios.get(`${this.config.baseUrl}${endpoint}`, {params: this.config.query})

            return response.data
        } catch (error) {
            console.error('API fetch error:', error)
            throw error
        }
    }

    async fetchMediaDetails<T>(mediaID: string | number): Promise<T> {
        try {
            const response = await axios.get(`${this.config.baseUrl}${mediaID}/?format=json`)

            return response.data
        } catch (error) {
            console.error('API fetch details error:', error)
            throw error
        }
    }

    getImageUrl(path: string): string {
        return this.config.posterBaseUrl 
        ? `${this.config.posterBaseUrl}${path}`
        : path
    }
}

export default ApiService