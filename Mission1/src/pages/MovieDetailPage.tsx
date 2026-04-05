import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import type { MovieDetails, Credits } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { 
    data: movie, 
    isLoading: isMovieLoading, 
    isError: isMovieError 
  } = useCustomFetch<MovieDetails>(`/movie/${movieId}?language=ko-KR`);

  const { 
    data: credits, 
    isLoading: isCreditsLoading, 
    isError: isCreditsError 
  } = useCustomFetch<Credits>(`/movie/${movieId}/credits?language=ko-KR`);

  if (isMovieLoading || isCreditsLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isMovieError || isCreditsError || !movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        영화를 찾을 수 없거나 에러가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <div 
        className="relative h-112.5 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent flex flex-col justify-center px-10 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <div className="flex gap-4 text-sm font-semibold mb-4">
            <span className="text-yellow-400">평점 {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date.split('-')[0]}</span>
            <span>{movie.runtime}분</span>
          </div>
          <p className="text-lg italic text-gray-300 mb-4">{movie.tagline}</p>
          <p className="max-w-2xl text-base leading-relaxed text-gray-200 line-clamp-5">
            {movie.overview || "상세 줄거리가 없습니다."}
          </p>
        </div>
      </div>

      <div className="px-10 md:px-20 mt-12">
        <h2 className="text-2xl font-bold mb-8">감독/출연진</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-y-10 gap-x-4">
          {credits?.cast.map((person) => (
            <div key={person.id} className="flex flex-col items-center group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-800 transition-transform group-hover:scale-105 bg-gray-900">
                {person.profile_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 text-center px-2">No Image</div>
                )}
              </div>
              <p className="text-sm font-bold text-center line-clamp-1 w-full px-1">{person.name}</p>
              <p className="text-xs text-gray-400 text-center line-clamp-1 w-full px-1">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;