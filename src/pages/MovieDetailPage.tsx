import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

/* 타입 정의 */
interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface Credits {
  cast: Cast[];
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsPending(true);

      try {
        // 1. 영화 상세
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        // 2. 크레딧
        const creditRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isPending) {
    return <div className="text-center mt-10">로딩중...</div>;
  }

  if (isError || !movie) {
    return (
      <div className="text-red-500 text-center mt-10">
        에러가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* 배경 */}
      <div
        className="h-[400px] bg-cover bg-center flex items-end p-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <h1 className="text-4xl font-bold">{movie.title}</h1>
      </div>

      {/* 내용 */}
      <div className="p-10">
        <div className="flex gap-10">
          {/* 포스터 */}
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            className="rounded-xl shadow-lg"
          />

          {/* 정보 */}
          <div>
            <p className="text-yellow-400 text-xl">
              ⭐ {movie.vote_average}
            </p>

            <p className="mt-4 text-gray-300 max-w-xl">
              {movie.overview}
            </p>

            {/* 장르 */}
            <div className="mt-4 flex gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 출연진 */}
        <h2 className="text-2xl font-bold mt-10 mb-4">출연진</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {credits?.cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                className="rounded-lg"
              />
              <p className="mt-2">{actor.name}</p>
              <p className="text-gray-400 text-sm">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}