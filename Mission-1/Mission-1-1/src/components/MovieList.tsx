import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
    movies: Movie[];
    onSelectMovie?: (movie: Movie) => void;
}

const MovieList = ({ movies, onSelectMovie }: MovieListProps) => {
    if (movies.length === 0) {
        return (
            <div className='flex h-60 items-center justify-center'>
                <p className='font-bold text-slate-500'>검색 결과가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className='transform transition-transform duration-300 hover:scale-105'
                >
                    <MovieCard movie={movie} onSelect={onSelectMovie} />
                </div>
            ))}
        </div>
    );
};

export default MovieList;
