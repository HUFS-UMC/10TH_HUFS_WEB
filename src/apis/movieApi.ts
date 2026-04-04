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
// API 요청을 관리하기 쉽게 하기 위해 한 곳에 모아 관리하자는 리뷰에 맞춰 새 ts파일 생성