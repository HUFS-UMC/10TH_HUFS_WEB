import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { MovieDetailResponse, CreditsResponse, Cast } from '../types/MovieDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieDetailHeader from '../components/MovieDetailHeader';
import MovieInfo from '../components/MovieInfo';
import CastList from '../components/CastList';
import ProductionInfo from '../components/ProductionInfo';


const MovieDetailPage = () => {
    const [movie, setMovie] = useState<MovieDetailResponse | null>(null);
    const [credits, setCredits] = useState<CreditsResponse | null>(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);

    const { movieId } = useParams<{ movieId: string }>();

    useEffect(() => {
        const fetchMovieData = async () => {
            setIsPending(true);
            setIsError(false);
            try {
                if (!movieId) return;

                const movieRes = await axios.get<MovieDetailResponse>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }
                );
                setMovie(movieRes.data);

                const creditsRes = await axios.get<CreditsResponse>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }
                );
                setCredits(creditsRes.data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        
        fetchMovieData();
    }, [movieId]);

    const topCast: Cast[] = credits?.cast.slice(0, 19) || [];

    if (isError) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <span className='text-red-500 text-2xl'>영화 데이터를 불러오는 데 실패했습니다.</span>
            </div>
        );
    }

    return (
        <>
            {isPending && (
                <div className='flex justify-center items-center h-screen'>
                    <LoadingSpinner />
                </div>
            )}

            {!isPending && movie && (
                <div className='min-h-screen bg-black text-white'>
                    <MovieDetailHeader movie={movie} />

                    <div className='relative -mt-20 px-6 lg:px-12 pb-12'>
                        <MovieInfo movie={movie} credits={credits} />
                        <CastList cast={topCast} credits={credits} />
                        <ProductionInfo movie={movie} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieDetailPage;
