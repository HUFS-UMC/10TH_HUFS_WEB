import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetail } from "../types/MovieDetail";
import type { Credits } from "../types/Credits";

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);

    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);

            try {
                const [movieRes, creditsRes] = await Promise.all([
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                ]);

                setMovie(movieRes.data);
                setCredits(creditsRes.data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, [movieId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movieId]);

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-dvh">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-center mt-10">에러가 발생했습니다.</span>
            </div>
        );
    }

    if (!movie || !credits) return null;

    const director = credits.crew.find(
        (person) => person.job === "Director"
    );

    return (
        <div className="text-white">
            <div
                className="h-[500px] bg-cover bg-center relative flex items-end"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                <div className="relative z-10 p-10 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        {movie.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-300 items-center">
                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                        <span>📅 {movie.release_date.slice(0, 4)}</span>
                        <span>⏱ {movie.runtime}분</span>
                        <span>🎬 {director?.name}</span>

                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-gray-700 px-2 py-1 rounded text-xs"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {movie.tagline && (
                        <p className="mt-4 italic text-gray-200">
                            "{movie.tagline}"
                        </p>
                    )}

                    <p className="mt-4 text-sm md:text-base text-gray-300 line-clamp-3">
                        {movie.overview}
                    </p>
                </div>
            </div>

            <div className="px-10 py-10">
                <h2 className="text-2xl font-bold mb-4 text-black">출연진</h2>

                <div className="flex gap-4 overflow-x-auto pb-4">
                    {credits.cast.slice(0, 20).map((actor) => (
                        <div
                            key={actor.id}
                            className="min-w-[120px] text-center flex-shrink-0"
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : "https://via.placeholder.com/200x300"
                                }
                                alt={actor.name}
                                className="w-24 h-24 object-cover rounded-full mx-auto"
                            />
                            <p className="mt-2 text-sm font-semibold text-black">
                                {actor.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {actor.character}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;