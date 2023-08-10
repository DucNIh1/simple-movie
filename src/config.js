export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "95f2419536f533cdaa1dadf83c606027";
const tmdbEnpoint = `https://api.themoviedb.org/3/movie`;
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEnpoint}/${type}?api_key=${apiKey}`,
  getSimilarMovies: (movieId) =>
    `${tmdbEnpoint}/${movieId}/similar?api_key=${apiKey}`,
  getMovieDetails: (movieId) => `${tmdbEnpoint}/${movieId}?api_key=${apiKey}`,
  getMovieCredits: (movieId) =>
    `${tmdbEnpoint}/${movieId}/credits?api_key=${apiKey}`,
  getVideoCard: (movieId) =>
    `${tmdbEnpoint}/${movieId}/videos?api_key=${apiKey}`,
};
