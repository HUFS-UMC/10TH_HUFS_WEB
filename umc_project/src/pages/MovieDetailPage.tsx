import { useParams } from 'react-router-dom';
import type { MovieDetail, CreditsResponse } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';
import useCustomFetch from "../hooks/useCustomFetch";


const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const detailUrl = movieId
  ? `/movie/${movieId}?language=ko-KR`
  : null;

const creditsUrl = movieId
  ? `/movie/${movieId}/credits?language=ko-KR`
  : null;

const {
  data: movie,
  isLoading: movieLoading,
  isError: movieError,
  errorMessage: movieErrorMessage,
} = useCustomFetch<MovieDetail>(detailUrl);

const {
  data: credits,
  isLoading: creditsLoading,
  isError: creditsError,
  errorMessage: creditsErrorMessage,
} = useCustomFetch<CreditsResponse>(creditsUrl);

const isLoading = movieLoading || creditsLoading;
const isError = movieError || creditsError;
const errorMessage = movieErrorMessage || creditsErrorMessage;
const cast = credits?.cast.slice(0, 10) ?? [];




  if (isLoading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (isError || !movie) {
  return (
    <div className="text-white text-center mt-20">
      {errorMessage ?? "데이터 로딩에 실패했습니다."}
    </div>
  );
}

  return (
    <div className="bg-black min-h-screen text-white">
      <div 
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to right, black 10%, transparent 90%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="max-w-6xl mx-auto h-full flex items-center px-10 gap-10">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
            className="hidden md:block w-72 rounded-lg shadow-2xl"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">{movie.title}</h1>
            <div className="flex gap-4 text-sm font-semibold">
              <span className="text-yellow-400 font-bold">평점 {movie.vote_average.toFixed(1)}</span>
              <span>{movie.release_date.split('-')[0]}년</span>
              <span>{movie.runtime}분</span>
            </div>
            <p className="italic text-gray-400 text-xl">"{movie.tagline}"</p>
            <p className="max-w-2xl text-lg leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-10 py-10">
        <h2 className="text-2xl font-bold mb-6 underline decoration-[#dda5e3] underline-offset-8">출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-6">
          {cast.map(person => (
            <div key={person.id} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-600 mb-2 shadow-lg">
                <img 
                  src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200'} 
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] font-bold text-center truncate w-full">{person.name}</p>
              <p className="text-[10px] text-gray-400 text-center truncate w-full">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;