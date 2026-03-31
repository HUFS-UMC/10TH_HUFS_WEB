import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzMxMjMzZjljZWVmYWNhNzVmZTIwYWU4OTdmMmM2YyIsIm5iZiI6MTc3NDgzMzA4Ni4zNDgsInN1YiI6IjY5YzljZGJlMTQ3OTU5YjhkMTVhZWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZdWNsGdsSav47-DBmpT7sBonaaw-Kij-8uZgWcQc7ik';

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };

      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
          options
        );
        const data = await response.json();
        console.log("TMDB 데이터 로드 성공:", data.results);
        setMovies(data.results);
      } catch (err) {
        console.error("API 호출 에러:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen p-8">
      <h1 className="text-white text-2xl font-bold mb-8">인기 영화</h1>
      
      {/* [ ]그리드 레이아웃*/}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;