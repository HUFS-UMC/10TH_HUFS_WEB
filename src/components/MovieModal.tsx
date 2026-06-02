import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `${imageBaseUrl}${movie.poster_path}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-2xl text-white hover:text-gray-300"
        >
          ✕
        </button>

        <div className="relative h-64 w-full bg-gray-900 sm:h-80">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <p className="mt-1 text-sm text-gray-300">{movie.original_title}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:flex-row">
          <div className="hidden w-1/3 shrink-0 sm:block">
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="flex w-full flex-col justify-between sm:w-2/3">
            <div className="space-y-4">
              <div>
                <span className="text-2xl font-bold text-blue-600">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({movie.vote_count} 평가)
                </span>
              </div>

              <div className="border-y border-gray-100 py-4">
                <p className="text-sm font-bold text-gray-800">개봉일</p>
                <p className="mt-1 text-sm text-gray-600">{movie.release_date}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-800">줄거리</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-6">
                  {movie.overview || "등록된 줄거리가 없습니다."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-600"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;