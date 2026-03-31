import type {Movie} from "../types/movie";
import {useState} from "react";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard ({movie}: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(true);
return (
<>
<div
    className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
    w-44 transition transform duration-300 hover:scale-105'
    onMouseEnter={():void => setIsHovered(true)}
    onMouseLeave={():void => setIsHovered(false)}
    >
    <img
    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
    alt={`${movie.id}의 이미지`} 
    className =""
    />
    {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from black/50
         to transparent backdrop-blur-md flex flex-col justify-center imems-center 
         p-4 text-white"> {/*싱히죄우 처리. */}
            <h2 className="text-lg font-bold text-center leading-snug mt-2 line-clamp-3">{movie.title}</h2>
            <p className="text-sm text-gray-300">{movie.overview}</p>
        </div>
    )}
</div>
</>);

}