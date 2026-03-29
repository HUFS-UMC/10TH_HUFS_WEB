import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]); //Movie만 들어갈 수 있는 배열

    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get<MovieResponse>(
                // url
                'https://api.themoviedb.org/3/movie/popular',
                {
                    // header
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );

            console.log(data);
        
            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
    <div 
        // 양옆 간격-5/ 간격-3/ 작은 화면- 2개/ 중간 화면- 3개/ 큰 화면- 4개/ 더 큰 화면- 5개/ 가장 큰 화면- 6개/ 그 이상- 7개
        className="p-5 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {movies && movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
    ))}</div>);
}