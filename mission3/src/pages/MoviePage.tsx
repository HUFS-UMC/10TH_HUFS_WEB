import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Movie } from '../types/movie';

const MoviePage = () => {
  const location = useLocation();
  const category = location.pathname.split('/').pop() || 'popular';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      
      const API_KEY = 'b331233f9ceefaca75fe20ae897f2c6c';
      const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.');
        const data = await response.json();
        
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  if (error) return <div className="text-red-500 text-2xl p-8 font-bold text-center">에러가 발생했습니다.</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      
      {/* --- 페이지네이션 컨트롤부  --- */}
      <div className="flex justify-center items-center gap-4 my-8">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-30 cursor-pointer hover:bg-gray-300 transition-colors"
        >
          &lt;
        </button>
        
        <span className="font-bold text-lg">{page} 페이지</span>
        
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-purple-300 text-white rounded cursor-pointer hover:bg-purple-400 transition-colors"
        >
          &gt;
        </button>
      </div>

      {/* --- 로딩 및 영화 목록 UI --- */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviePage;