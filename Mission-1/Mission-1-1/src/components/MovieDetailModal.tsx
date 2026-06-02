import type { Movie } from '../types/movie';

interface MovieDetailModalProps {
    movie: Movie;
    onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://placehold.co/500x750?text=No+Image';

    const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
        movie.title
    )}`;

    return (
        // 배경 오버레이 (클릭 시 닫힘)
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
            onClick={onClose}
        >
            {/* 모달 박스 (내부 클릭은 전파 차단) */}
            <div
                className='relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-slate-900 shadow-2xl'
                onClick={(e) => e.stopPropagation()}
            >
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className='absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-xl text-white transition-colors hover:bg-black/80'
                    aria-label='닫기'
                >
                    ✕
                </button>

                {/* 포스터 */}
                <img
                    src={posterUrl}
                    alt={`${movie.title} 포스터`}
                    className='h-72 w-full object-cover'
                />

                <div className='space-y-4 p-6'>
                    <h2 className='text-2xl font-bold text-slate-100'>
                        {movie.title}
                    </h2>

                    <div className='flex flex-wrap items-center gap-4 text-sm text-slate-300'>
                        <span className='flex items-center gap-1'>
                            <span className='text-yellow-400'>⭐</span>
                            {movie.vote_average.toFixed(1)}
                        </span>
                        <span>개봉일: {movie.release_date || '정보 없음'}</span>
                        <span>원제: {movie.original_title}</span>
                    </div>

                    <p className='leading-relaxed text-slate-300'>
                        {movie.overview || '줄거리 정보가 없습니다.'}
                    </p>

                    {/* IMDb 검색 버튼 */}
                    <a
                        href={imdbUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block rounded-md bg-yellow-500 px-5 py-2 font-semibold text-black transition-colors hover:bg-yellow-400'
                    >
                        IMDb에서 검색하기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailModal;
