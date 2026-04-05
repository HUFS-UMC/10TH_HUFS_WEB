import { useState } from "react";
import type { Movie } from "../types/movie";
console.log(" MovieCard 실행됨");
interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={() => (window.location.href = `/movie/${movie.id}`)}
            className="relative w-44 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={`${movie.title}`}
                className="w-full h-64 object-cover"
            />

            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm flex flex-col justify-center items-center text-white p-4">
                    <h2 className="text-sm font-bold text-center">
                        {movie.title}
                    </h2>

                    <p className="text-xs text-gray-300 mt-2 line-clamp-4 text-center">
                        {movie.overview}
                    </p>
                </div>
            )}
        </div>
    );
}