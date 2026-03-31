import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LodingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]); //Movie만 들어갈 수 있는 배열
    //1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    //2. 에러 상태
    const [isError, setIsError] = useState(false);
    //3. 페이지
    const [page, setPage] = useState(1);

    const { category } = useParams<{
    category: string
    }>();
    

    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);

        try {
            const { data } = await axios.get<MovieResponse>(
                // url
                `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );

            setMovies(data.results);
        } catch{
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    };

        fetchMovies();
    }, [page, category]);

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">영화 데이터를 불러오는 데 실패했습니다.</span>
            </div>
        );
    }

    return (
        <>
        <div className="flex items-center justify-center gap-6 my-5">
            <button
            className="bg-[#b2bab1] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={page === 1} // 페이지가 1일 때 버튼 비활성화
            onClick={() => setPage((prev) => prev - 1)}>
                {'<'}</button>

                <span>{page} 페이지</span>

            <button
            className="bg-[#b2bab1] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}>
                {'>'}</button>
        </div>
        {isPending && (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        )}

        {!isPending && (
            <div 
            // 양옆 간격-5/ 간격-3/ 작은 화면- 2개/ 중간 화면- 3개/ 큰 화면- 4개/ 더 큰 화면- 5개/ 가장 큰 화면- 6개/ 그 이상- 7개
            className="p-5 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
        ))}
        </div>
        )}
        </>
    );
}