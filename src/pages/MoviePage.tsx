import useCustomFetch from "../hooks/useCustomFetch";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function MoviePage() {
   

    const [page, setPage] = useState(1);
    const { category } = useParams<{ category: string }>();

    const { data, loading, error } = useCustomFetch<{ results: Movie[] }>(
        category
            ? `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`
            : "",
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
        },
        [page, category] 
    );

    // 에러 화면
    if (error) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <>
            {/* 페이지 버튼 */}
            <div className="flex items-center justify-center gap-6 mt-5">
                <button
                    className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 disabled:bg-red-400 cursor-pointer disabled:cursor-not-allowed"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    {"<"}
                </button>

                <span>{page} 페이지</span>

                <button
                    className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200 cursor-pointer"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    {">"}
                </button>
            </div>

            {/* 로딩 */}
            {loading && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}

            {/* 영화 목록 */}
            {!loading && (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {data?.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
}