import { useState } from 'react'
import type { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Pagenation from '../components/Pagenation';
import { useParams } from 'react-router-dom';
import { useCustomFetch } from '../hooks/useCustomFetch';

const MoviePage = () => {
    const [page, setPage] = useState<number>(1);
    const { category } = useParams<{ category: string }>();

    const url = category 
        ? `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
        : '';
    
    const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);
    
    const movies = data?.results || [];

    if (isError) {
        return (
            <ErrorMessage 
                message='영화 데이터를 불러오는 데 실패했습니다. 네트워크 연결을 확인해주세요.'
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'>
            {/* 페이지네이션 - 상단 */}
            <div className='sticky top-16 z-40 py-4'>
                <div className='max-w-7xl mx-auto px-6'>
                    <Pagenation page={page} setPage={setPage} />
                </div>
            </div>

            {/* 로딩 상태 */}
            {isPending && (
                <div className='flex justify-center items-center py-20'>
                    <LoadingSpinner />
                </div>
            )}

            {/* 영화 그리드 */}
            {!isPending && (
                <div className='max-w-7xl mx-auto px-6 py-12'>
                    <div className='grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                        {movies.map(movie => (
                            <div key={movie.id} className='transform transition-transform duration-300 hover:scale-105'>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default MoviePage
