import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import useFetch from "../hooks/useFetch";
import type { Movie, MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const axiosRequestConfig = useMemo(
    () => ({
      params: {
        query: filters.query,
        include_adult: filters.include_adult,
        language: filters.language,
      },
    }),
    [filters],
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleMovieFilters = useCallback((filters: MovieFilters): void => {
    setFilters(filters);
  }, []);

  const handleMovieClick = useCallback((movie: Movie): void => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setSelectedMovie(null);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <MovieFilter onChange={handleMovieFilters} />

        <div className="mt-10">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <MovieList
              movies={data?.results || []}
              onMovieClick={handleMovieClick}
            />
          )}
        </div>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}