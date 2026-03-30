import { useState } from "react";
import { Link } from "react-router-dom"; 
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/movies/detail/${movie.id}`} className="block w-44">
      <div
        className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer
        transition transform duration-300 hover:scale-105 bg-[#1a1a1a]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title}의 포스터`}
          className="w-full h-auto object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center p-4 text-white animate-fadeIn">
            <h2 className="text-sm font-bold text-center leading-snug mb-2 line-clamp-3">
              {movie.title}
            </h2>
            <p className="text-[10px] text-gray-300 line-clamp-5 text-center px-1">
              {movie.overview}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}