// import React from 'react'
import { useState } from 'react';
import type { Movie } from '../types/movie'
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie 
}

const MovieCard = ({ movie }: MovieCardProps) => {

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-40
      transition-transform duration-500 hover:scale-105' 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}` }
       alt={`${movie.title} 영화의 이미지`} 
       className=''
       />
       {isHovered && (
        <div className='absolute inset-0 text-white 
          from-black/50 to-transparent backdrop-blur-md flex flex-col
          justify-center items-center p-4'>
          <h2 className='text-lg font-bold leading-snug'>{movie.title}</h2>
          <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5'>{movie.overview}</p>
        </div>
      )}
    </div>
  )
}

export default MovieCard
