import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch';
import type { Movie } from '../types/movie';

interface MovieResponse {
    results: Movie[];
    total_pages: number;
}

const MoviePage = () => {
    const location = useLocation();
    const category = location.pathname.split('/').pop() || 'popular';
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [category]);

    const { data, isLoading, isError } = useCustomFetch<MovieResponse>(
        `/movie/${category}`, 
        { page }
    );

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 text-white p-8">
                <p className="text-2xl font-bold mb-4 text-red-500">
                    데이터를 불러오는 중 에러가 발생했습니다.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
                >
                    다시 시도하기
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="flex justify-center items-center gap-4 my-8">
                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-30 cursor-pointer hover:bg-gray-300 transition-colors text-black font-bold"
                >
                    &lt;
                </button>
                
                <span className="font-bold text-lg text-white">{page} 페이지</span>
                
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!!(data && page >= data.total_pages)}
                    className="px-4 py-2 bg-purple-300 text-white rounded-lg cursor-pointer hover:bg-purple-400 transition-colors font-bold disabled:opacity-30"
                >
                    &gt;
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-100">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {data?.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MoviePage;