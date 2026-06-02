import { useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import type { Movie } from "../types/movie";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="cursor-pointer"
            onClick={() => {
              console.log("영화 카드 클릭:", movie.title);
              setSelectedMovie(movie);
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

export default MovieList;