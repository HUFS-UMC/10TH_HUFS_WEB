import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/movie';

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzMxMjMzZjljZWVmYWNhNzVmZTIwYWU4OTdmMmM2YyIsIm5iZiI6MTc3NDgzMzA4Ni4zNDgsInN1YiI6IjY5YzljZGJlMTQ3OTU5YjhkMTVhZWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZdWNsGdsSav47-DBmpT7sBonaaw-Kij-8uZgWcQc7ik` 
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1', options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("영화 데이터를 불러오지 못했어요 😭", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-white p-10">영화 목록 로딩 중...</div>;

  return (
    <div className="bg-black min-h-screen p-8">
      <h1 className="text-2xl font-bold text-white mb-8">현재 상영 중인 영화</h1>
      
      {/* 영화 카드들을 그리드 형태로 배치 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;