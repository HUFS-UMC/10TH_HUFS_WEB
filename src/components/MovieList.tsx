import { memo } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  if (movies.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
};

export default memo(MovieList);