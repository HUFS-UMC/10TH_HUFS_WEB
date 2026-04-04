import axios from "axios";

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
});

export const getMovieDetail = (movieId: string) => {
  return API.get(`/movie/${movieId}?language=ko-KR`);
};

export const getMovieCredits = (movieId: string) => {
  return API.get(`/movie/${movieId}/credits`);
};