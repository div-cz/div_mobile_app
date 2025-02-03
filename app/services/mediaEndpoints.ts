import ApiService from './apiService'

const moviesApi = new ApiService({
    baseUrl: "https://magic.div.cz/api/movie/",
    posterBaseUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/",
    query: {
      format: 'json',
      limit: 10,
      offset: 10
    }
  });

  const topMoviesApi = new ApiService({
    baseUrl: "https://magic.div.cz/api/top_movies/?format=json",
    posterBaseUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"
  })

  export { moviesApi, topMoviesApi }