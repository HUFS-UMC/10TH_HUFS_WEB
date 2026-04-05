import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LodingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    setPage(1);
  }, [category]);

  const requestUrl = useMemo(() => {
    if (!category) return null;
    return `https://api.themoviedb.org/3/movie/${category}?page=${page}`;
  }, [category, page]);

  const { data, isLoading, isError, errorMessage } = useCustomFetch<MovieResponse>(
    requestUrl,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
      params: {
        language: "ko-KR",
      },
    },
    [category, page]
  );

  const movies: Movie[] = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  if (isError) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="rounded-2xl bg-red-50 px-6 py-5 text-center shadow">
        <p className="text-lg font-semibold text-red-600">
          영화 데이터를 불러오는 데 실패했다.
        </p>
        <p className="mt-2 text-sm text-red-500">
          {errorMessage ?? "잠시 후 다시 시도해라."}
        </p>
      </div>
    </div>
  );
}

if (isLoading) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <LoadingSpinner />
      <p className="text-gray-500">영화 목록을 불러오는 중이다...</p>
    </div>
  );
}

  return (
    <>
      <div className="flex items-center justify-center gap-6 my-5">
        <button
          className="bg-[#b2bab1] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {"<"}
        </button>

        <span>{page} 페이지</span>

        <button
          className="bg-[#b2bab1] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
          <LoadingSpinner />
          <p className="text-gray-500">영화 목록을 불러오는 중이다...</p>
        </div>
      )}

      {!isLoading && (
        <div className="p-5 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}