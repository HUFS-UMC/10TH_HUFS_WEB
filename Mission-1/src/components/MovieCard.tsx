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
      className='relative rounded-xl overflow-hidden cursor-pointer w-full aspect-[9/14] shadow-xl hover:shadow-2xl transition-all duration-300 group'
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} 영화의 이미지`} 
        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
      />
      
      {/* 그래디언트 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
      
      {isHovered && (
        <div className='absolute inset-0 flex flex-col justify-end p-4 text-white'>
          <h2 className='text-md font-bold leading-tight line-clamp-2 mb-2'>{movie.title}</h2>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <span className='text-yellow-400'>⭐</span>
              <span className='text-sm font-semibold'>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className='text-xs text-gray-300'>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <p className='text-xs text-gray-300 leading-relaxed mt-2 line-clamp-3'>{movie.overview}</p>
        </div>
      )}
    </div>
  )
}

export default MovieCard
