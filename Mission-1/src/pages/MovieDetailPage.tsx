import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { MovieDetailResponse, CreditsResponse, Cast } from '../types/MovieDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import MovieDetailHeader from '../components/MovieDetailHeader';
import MovieInfo from '../components/MovieInfo';
import CastList from '../components/CastList';
import ProductionInfo from '../components/ProductionInfo';
import { useCustomFetch } from '../hooks/useCustomFetch';


const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [isScrolled, setIsScrolled] = useState(false);

    const movieUrl = movieId 
        ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
        : '';
    
    const creditsUrl = movieId 
        ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
        : '';

    const { 
        data: movie, 
        isPending: isMoviePending, 
        isError: isMovieError 
    } = useCustomFetch<MovieDetailResponse>(movieUrl);
    
    const { 
        data: credits, 
        isPending: isCreditsPending, 
        isError: isCreditsError 
    } = useCustomFetch<CreditsResponse>(creditsUrl);

    const isPending = isMoviePending || isCreditsPending;
    const isError = isMovieError || isCreditsError;
    const topCast: Cast[] = credits?.cast.slice(0, 19) || [];

    // 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isError) {
        return (
            <ErrorMessage 
                message='영화 상세 정보를 불러오는 데 실패했습니다. 페이지를 새로고침 해주세요.'
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <>
            {isPending && (
                <div className='flex justify-center items-center h-screen bg-gradient-to-b from-slate-950 to-slate-900'>
                    <LoadingSpinner />
                </div>
            )}

            {!isPending && movie && (
                <div className='min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'>
                    <MovieDetailHeader movie={movie} />

                    <div className='relative -mt-20 px-6 lg:px-12 pb-12'>
                        <MovieInfo movie={movie} credits={credits} />
                        
                        {/* 구분선 */}
                        <div className='my-16 border-t border-slate-700'></div>
                        
                        <CastList cast={topCast} credits={credits} />
                        
                        {/* 구분선 */}
                        <div className='my-16 border-t border-slate-700'></div>
                        
                        <ProductionInfo movie={movie} />
                    </div>

                    {/* 맨 위로 가기 버튼 */}
                    {isScrolled && (
                        <button
                            onClick={scrollToTop}
                            className='fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50'
                            aria-label='맨 위로 가기'
                        >
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default MovieDetailPage;
