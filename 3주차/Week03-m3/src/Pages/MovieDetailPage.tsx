import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LodingSpinner";
import type {
  MovieDetail,
  CreditsResponse,
} from "../types/movie-detail";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!movieId) {
        setErrorMessage("잘못된 접근이다. 영화 정보를 찾을 수 없다.");
        return;
      }

      setIsPending(true);
      setErrorMessage(null);

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
            params: {
              language: "ko-KR",
            },
          }),
          axios.get<CreditsResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
              params: {
                language: "ko-KR",
              },
            }
          ),
        ]);

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setErrorMessage("해당 영화 정보를 찾을 수 없다.");
          } else if (error.response?.status === 401) {
            setErrorMessage("인증에 실패했다. TMDB 키 설정을 확인해야 한다.");
          } else {
            setErrorMessage("영화 정보를 불러오는 중 문제가 발생했다. 잠시 후 다시 시도해라.");
          }
        } else {
          setErrorMessage("알 수 없는 오류가 발생했다. 잠시 후 다시 시도해라.");
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const director = useMemo(() => {
    return credits?.crew.find((person) => person.job === "Director");
  }, [credits]);

  const producers = useMemo(() => {
    return (
      credits?.crew
        .filter(
          (person) =>
            person.job === "Producer" ||
            person.job === "Executive Producer" ||
            person.job === "Screenplay"
        )
        .slice(0, 6) ?? []
    );
  }, [credits]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-white">
        <LoadingSpinner />
        <p className="text-zinc-300 text-sm md:text-base">
          영화 상세 정보와 크레딧을 불러오는 중이다...
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl border border-red-400/20 bg-red-500/10 p-6 text-center shadow-xl">
          <h2 className="text-xl font-bold text-red-200">불러오기에 실패했다</h2>
          <p className="mt-3 text-sm leading-6 text-red-100">
            {errorMessage}
          </p>
          <p className="mt-2 text-xs text-red-200/80">
            URL, 네트워크 상태, API 키를 다시 확인해라.
          </p>
        </div>
      </div>
    );
  }

  if (!movie || !credits) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-300">
        표시할 데이터가 없다.
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/w1280${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative overflow-hidden">
        {backdropUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-zinc-950/70 to-zinc-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[320px_minmax(0,1fr)] md:gap-10">
            <div className="mx-auto w-full max-w-[320px]">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-zinc-100 backdrop-blur-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-3 text-base text-zinc-300 md:text-lg">
                  {movie.tagline}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-lg">
                  평점 {movie.vote_average.toFixed(1)}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                  개봉일 {movie.release_date || "정보 없음"}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                  러닝타임 {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <h2 className="mb-3 text-xl font-semibold">줄거리</h2>
                <p className="leading-7 text-zinc-200">
                  {movie.overview || "줄거리 정보가 없다."}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-5">
                  <p className="mb-2 text-sm text-zinc-400">감독</p>
                  <p className="text-lg font-semibold">
                    {director ? director.name : "정보 없음"}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-5">
                  <p className="mb-2 text-sm text-zinc-400">주요 제작진</p>
                  <div className="flex flex-wrap gap-2">
                    {producers.length > 0 ? (
                      producers.map((person) => (
                        <span
                          key={`${person.id}-${person.job}`}
                          className="rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200"
                        >
                          {person.name} · {person.job}
                        </span>
                      ))
                    ) : (
                      <span className="text-zinc-300">정보 없음</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="mb-6 mt-6">
          <h2 className="text-2xl font-bold md:text-3xl">출연진</h2>
          <p className="mt-1 text-sm text-zinc-400">
            영화의 주요 배우와 배역 정보
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {credits.cast.slice(0, 12).map((actor) => {
            const profileUrl = actor.profile_path
              ? `${IMAGE_BASE_URL}/w300${actor.profile_path}`
              : "https://via.placeholder.com/300x450?text=No+Image";

            return (
              <article
                key={actor.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
                  <img
                    src={profileUrl}
                    alt={actor.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-1 text-base font-semibold">
                    {actor.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                    {actor.character || "배역 정보 없음"}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MovieDetailPage;