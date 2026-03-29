import React, { useEffect, useState } from 'react'
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagenation from '../components/Pagenation';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
// 로딩 상태
    const [isPending, setIsPending] = useState(true);
// 에러 상태
    const [isError, setIsError] = useState(false);
// 페이지 처리
    const [page, setPage] = useState<number>(1);

    const {category} = useParams<{ category: string }>();


    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);
            try{
                const {data} = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }
            );
            setMovies(data.results);
            } catch {
                setIsError(true);
            } finally {
            setIsPending(false);
            }
        }; 
        
        fetchMovies();
    }, [page, category]);
    
    if (isError) {
        return <div>
            <span className='text-red-500 text-2xl'>영화 데이터를 불러오는 데 실패했습니다.</span>
            </div>
    }

    return (
        <>
        <Pagenation page={page} setPage={setPage} />

        {isPending && (
        <div className='flex justify-center items-center my-10 h-dvh'>
            <LoadingSpinner />
        </div>
        )}

        {!isPending && (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-5 xl:grid-cols-6'>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie ={movie} />
            ))}
        </div>
        )}
        
        </>
    )
}

export default MoviePage
