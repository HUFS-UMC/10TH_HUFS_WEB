import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  type Credits, type MovieDetail, type Crew } from "../types/movie";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

//모든 API 요청에 공통으로 쓸 헤더, 토큰 인증 요청 
const axiosConfig = {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
    },
};

export default function MovieDetailPage () {
    const { movieId } = useParams<{movieId: string}>();

    const [movie, setMovie ] = useState<MovieDetail>();
    const [credits, setCredits] = useState<Credits>();
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError ] = useState(false);


    useEffect(() => {
        if(!movieId) return;

        const fetchData = async() => {
            setIsPending(true);

            try  {
                const[{ data : movieData}, {data: creditsData}] = await Promise.all([
                    axios.get<MovieDetail>(
                        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                        axiosConfig
                    ),
                    axios.get<Credits>(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                        axiosConfig
                    ),
                ]);
                setMovie(movieData);
                setCredits(creditsData);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
    }, [movieId]); //movieId 바뀔 때마다 재실행

    const directors: Crew[] = credits?.crew.filter((c) => c.job === "Director") ?? [];
    const allPeople =[...directors, ...(credits?.cast.slice(0, 20) ?? [])];

    if(isPending) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        );
    }

    if(isError || !movie) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        // 전체 페이지
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Hero 섹션 */}
            <div className="relative h-[420px] overflow-hidden">
                <img src={`${IMAGE_BASE}/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover" />

                {/* 왼->오 그라디언트, 왼쪽은 어둡고 오른쪽은 투명 */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-905/70 to-transparent" />
                {/* 아래->위 그라디언트 */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center px-10">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
                        <div className="flex text-4xl items-center font-bold gap-4 text-sm text-gray-300 mb-2">
                            <span>평점 {movie.vote_average.toFixed(1)}</span>
                            {/* 연도만 */}
                            <span>{movie.release_date.slice(0, 4)}</span> 
                            <span>{movie.runtime}분</span>
                        </div>

                    <div className="flex gap-2 mb-4">
                        {movie.genres.map((g)=> (
                            <span key={g.id}
                            className="px-2 py-0.5 bg-zinc-700 rounded text-us text-gray-300">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-5">
                        {movie.overview}
                    </p>
                </div>
            </div>
            </div>
            
            {/* 구분선 */}
            <div className="border-t border-zinc-700 mx-8 mt-2" />

            <div className="px-8 py-10">
                <h2 className="text-2xl font-bold mb-6">감독/출연</h2>

                <div className="flex gap-6 overflow-x-auto pb-4">
                    {allPeople.map((person, idx) => {
                        const isDirector ="job" in person &&person.job === "Director";
                        const subLabel = isDirector ? "감독" : "character" in person 
                        ? person.character : "";

                        return (
                            <div key={`${person.id}-${idx}`}
                            className="flex flex-col items-center gap-2 min-w-[88px]">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-700 ring-2 ring-zinc-600 flex-shrink-0">
                                    {person.profile_path ? (
                                        <img src ={`${IMAGE_BASE}/w185${person.profile_path}`}
                                        alt = {person.name}
                                        className="w-full h-full object-cover" />
                                    ): (
                                        <div className="w-full h-full flex items-center justify-center text-3xl text-zinc-400">
                                            👤
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm font-semibold text-center leading-tight">
                                    {person.name}
                                </p>
                                <p className="text-xs text-gray-400 text-center line-clamp-2">
                                    {subLabel}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
};

