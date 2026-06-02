import { useState, useMemo, useCallback } from "react";

import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const fetchOptions = useMemo(() => {
    return { params: filters };
  }, [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie", fetchOptions);

  const handleFilterChange = useCallback((newFilters: MovieFilters) => {
    setFilters(newFilters);
  }, []);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <MovieFilter onChange={handleFilterChange} />
      </div>

      {isLoading ? (
        <div className="flex h-60 items-center justify-center font-bold text-gray-500">
          로딩 중 입니다...
        </div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}