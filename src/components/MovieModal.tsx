import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "http://via.placeholder.com/640x480";

  const handleImdbSearch = () => {
    window.open(
      `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`,
      "_blank",
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[430px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm font-bold text-white hover:bg-black"
        >
          닫기
        </button>

        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImage
          }
          alt={`${movie.title} 포스터`}
          className="h-[420px] w-full shrink-0 object-cover"
        />

        <div className="overflow-y-auto p-5">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {movie.title}
          </h2>

          <p className="mb-2 text-sm text-gray-600">
            개봉일: {movie.release_date}
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

export default MovieModal;