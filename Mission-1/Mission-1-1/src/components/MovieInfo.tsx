import type { MovieDetailResponse, CreditsResponse } from '../types/MovieDetail';

interface MovieInfoProps {
  movie: MovieDetailResponse;
  credits: CreditsResponse | null;
}

const MovieInfo = ({ movie, credits }: MovieInfoProps) => {
  const getDirector = (): string => {
    return credits?.crew.find(person => person.job === 'Director')?.name || '정보 없음';
  };

  return (
    <div className='flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto'>
      {/* 포스터 */}
      <div className='flex-shrink-0'>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className='w-64 h-auto rounded-lg shadow-2xl'
        />
      </div>

      {/* 기본 정보 */}
      <div className='flex-1 pt-4'>
        <h1 className='text-5xl font-bold mb-2'>{movie.title}</h1>
        {movie.tagline && <p className='text-lg text-gray-300 italic mb-4'>{movie.tagline}</p>}

        {/* 메타 정보 */}
        <div className='flex gap-6 mb-6 flex-wrap'>
          <div>
            <p className='text-gray-400'>평점</p>
            <p className='text-3xl font-bold text-yellow-400'>⭐ {movie.vote_average.toFixed(1)} / 10</p>
          </div>
          <div>
            <p className='text-gray-400'>개봉일</p>
            <p className='text-2xl font-bold'>{movie.release_date}</p>
          </div>
          <div>
            <p className='text-gray-400'>러닝타임</p>
            <p className='text-2xl font-bold'>{movie.runtime}분</p>
          </div>
        </div>

        {/* 장르 */}
        <div className='mb-6'>
          <p className='text-gray-400 mb-2'>장르</p>
          <div className='flex flex-wrap gap-2'>
            {movie.genres.map(genre => (
              <span key={genre.id} className='bg-gray-700 px-3 py-1 rounded-full text-sm'>
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* 감독 */}
        <div className='mb-6'>
          <p className='text-gray-400'>감독</p>
          <p className='text-xl font-semibold'>{getDirector()}</p>
        </div>

        {/* 줄거리 */}
        <div>
          <p className='text-gray-400'>줄거리</p>
          <p className='text-gray-200 leading-relaxed'>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
