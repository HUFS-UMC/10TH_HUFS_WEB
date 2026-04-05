import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  // 클릭하면 해당 영화의 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="relative flex flex-col items-start gap-2 cursor-pointer group"
    >
      {/* 영화 포스터 */}
      <div className="relative w-full aspect-2/3 overflow-hidden rounded-lg bg-gray-800">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-50"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
      </div>

      {/* 영화 제목 및 정보 */}
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm font-bold text-white truncate w-full">
          {movie.title}
        </p>
        <div className="flex justify-between items-center text-[10px] text-gray-400">
          <span>{movie.release_date}</span>
          <span className="text-yellow-500 font-semibold">★ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;