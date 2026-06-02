import { useCallback, useMemo, useState } from 'react';
import type { AxiosRequestConfig } from 'axios';
import type { Movie, MovieFilters, MovieResponse } from '../types/movie';
import { useCustomFetch } from '../hooks/useCustomFetch';
import { DEFAULT_MOVIE_FILTERS } from '../constants/movie';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import MovieDetailModal from '../components/MovieDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SearchPage = () => {
    const [filters, setFilters] = useState<MovieFilters>(DEFAULT_MOVIE_FILTERS);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const url = 'https://api.themoviedb.org/3/search/movie';

    // ✅ filters가 바뀔 때만 새 객체 생성 → 참조 동결 (무한 렌더 해결)
    const searchOptions = useMemo<AxiosRequestConfig>(
        () => ({
            params: {
                query: filters.query,
                include_adult: filters.includeAdult,
                language: filters.language,
            },
        }),
        [filters]
    );

    const { data, isPending, isError } = useCustomFetch<MovieResponse>(
        url,
        searchOptions
    );

    // ✅ 참조 고정된 핸들러 (MovieFilter의 memo가 작동하도록)
    const handleChangeFilters = useCallback((next: MovieFilters) => {
        setFilters(next);
    }, []);

    // ✅ 참조 고정된 선택 핸들러 (MovieCard의 memo가 작동하도록)
    const handleSelectMovie = useCallback((movie: Movie) => {
        setSelectedMovie(movie);
    }, []);

    const movies = data?.results ?? [];

    return (
        <div className='mx-auto max-w-7xl px-6 py-10'>
            <h1 className='mb-6 text-2xl font-bold text-slate-100'>영화 검색</h1>

            <MovieFilter onChange={handleChangeFilters} />

            <div className='mt-10'>
                {isPending && (
                    <div className='flex justify-center py-20'>
                        <LoadingSpinner />
                    </div>
                )}

                {isError && (
                    <ErrorMessage
                        message='영화 데이터를 불러오는 데 실패했습니다.'
                        onRetry={() => window.location.reload()}
                    />
                )}

                {!isPending && !isError && (
                    <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
                )}
            </div>

            {/* 영화 상세 모달 */}
            {selectedMovie && (
                <MovieDetailModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
};

export default SearchPage;
