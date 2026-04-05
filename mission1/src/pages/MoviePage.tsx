import {useState } from "react";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";

export default function MoviePage() {
    // 3. 페이지
    const [page, setPage] = useState(1);

    const {category} = useParams<{
        category: string;
    }>();

    const { data, loading, error } = useCustomFetch<{ results: Movie[] }>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
    );    

    // 2번
    if (error) {
        return (
            <div className="text-red-500 text-2xl">
                <p>에러가 발생했습니다.</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 disabled:bg-red-400 cursor-pointer disabled:cursor-not-allowed" disabled={page===1} onClick={():void => setPage((prev):number => prev-1)}>{`<`}</button>
                <span>{page} 페이지</span>
                <button className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 cursor-pointer" onClick={():void => setPage((prev):number => prev+1)}>{`>`}</button>
            </div>
            {loading && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner/>
                </div>
            )}

            {!loading && (
                <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                    {data?.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
}