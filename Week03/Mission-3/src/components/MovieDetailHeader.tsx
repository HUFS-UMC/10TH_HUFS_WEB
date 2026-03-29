import type { MovieDetailResponse } from '../types/MovieDetail';

interface MovieDetailHeaderProps {
  movie: MovieDetailResponse;
}

const MovieDetailHeader = ({ movie }: MovieDetailHeaderProps) => {
  return (
    <div className='relative h-64'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black'></div>
      </div>
    </div>
  );
};

export default MovieDetailHeader;
