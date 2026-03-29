import { useState } from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    // 호버 상태 관리
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-50
            transition-transform duration-500 hover:scale-105" // relative-호버 시 절대 위치로 정보 표시
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >    
        <img
            // url w200 사이즈로 가져오기
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            // 예외 처리
            alt={`${movie.title} 영화의 이미지`}
            // 꾸미기
            className=""
        />
        {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
            backdrop-blur-md flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
                <p className="text-sm text-gray-300 leading-relaxed mt-2
                line-clamp-5">{movie.overview}</p>
            </div>
        )}
        </div>
    );
}
