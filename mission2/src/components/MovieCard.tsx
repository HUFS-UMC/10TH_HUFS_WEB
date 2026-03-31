import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-900 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
      {/* 영화 포스터 */}
      <img 
        src={imageUrl} 
        alt={movie.title} 
        className="w-full h-auto rounded-md object-cover"
      />
      
      {/* 영화 제목 및 정보 */}
      <div className="mt-1">
        <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
        <p className="text-gray-400 text-xs mt-1">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="text-gray-500 text-[10px] truncate">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;