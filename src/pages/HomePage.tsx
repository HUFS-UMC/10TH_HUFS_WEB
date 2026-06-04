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
    console.log("검색 필터:", filters);
    setFilters(filters);
  }, []);

  const handleMovieClick = useCallback((movie: Movie): void => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setSelectedMovie(null);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <MovieFilter onChange={handleMovieFilters} />

      <div className="mt-8">
        {isLoading ? (
          <div>로딩 중 입니다...</div>
        ) : (
          <MovieList
            movies={data?.results || []}
            onMovieClick={handleMovieClick}
          />
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}