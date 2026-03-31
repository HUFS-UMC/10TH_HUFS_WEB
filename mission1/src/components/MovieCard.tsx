import React from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="relative group overflow-hidden rounded-lg cursor-pointer bg-black aspect-2/3">
      {/* [ ] 각 영화의 포스터 이미지 표시 및 호버 시 blur 처리 */}
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:blur-md"
      />

      {/* [ ] 호버 시 영화의 제목과 간단한 줄거리가 보이도록 UI 구성 */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 p-4 text-center">
        <h3 className="text-white text-lg font-bold mb-2">{movie.title}</h3>
        <p className="text-gray-200 text-xs line-clamp-5 leading-relaxed">
          {movie.overview || "상세 정보가 없습니다."}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;