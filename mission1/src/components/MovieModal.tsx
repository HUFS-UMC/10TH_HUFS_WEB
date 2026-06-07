import { memo, useCallback, useMemo } from "react";
import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage =
    "https://placehold.co/500x750/e5e7eb/374151?text=No+Poster";

  const posterUrl = useMemo(
    () =>
      movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage,
    [movie.poster_path],
  );

  const imdbSearchUrl = useMemo(
    () => `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`,
    [movie.title],
  );

  const handleImdbSearch = useCallback(() => {
    window.open(imdbSearchUrl, "_blank", "noopener,noreferrer");
  }, [imdbSearchUrl]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-[430px] flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-md bg-black/70 px-3 py-1 text-sm font-bold text-white hover:bg-black"
        >
          닫기
        </button>

        <img
          src={posterUrl}
          alt={`${movie.title} 포스터`}
          className="h-[420px] w-full shrink-0 object-cover"
        />

        <div className="overflow-y-auto p-5">
          <h2
            id="movie-modal-title"
            className="mb-2 text-2xl font-bold text-gray-900"
          >
            {movie.title}
          </h2>

          <p className="mb-2 text-sm text-gray-600">
            개봉일: {movie.release_date || "미정"}
          </p>

          <p className="mb-2 text-sm font-bold text-yellow-600">
            평점: {movie.vote_average.toFixed(1)}
          </p>

          <p className="mb-4 text-sm leading-6 text-gray-700">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>

          <button
            type="button"
            onClick={handleImdbSearch}
            className="w-full rounded-lg bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-600"
          >
            IMDb에서 검색하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieModal);
