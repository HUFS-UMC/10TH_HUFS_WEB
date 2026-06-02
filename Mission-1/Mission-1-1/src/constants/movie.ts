import type { MovieFilters, MovieLanguage } from '../types/movie';

// 언어 선택 옵션
export const languageOptions: { value: MovieLanguage; label: string }[] = [
    { value: 'ko-KR', label: '한국어' },
    { value: 'en-US', label: '영어' },
    { value: 'ja-JP', label: '일본어' },
];

// 검색 필터 초기값 (SearchPage / MovieFilter가 공유)
export const DEFAULT_MOVIE_FILTERS: MovieFilters = {
    query: '어벤져스',
    includeAdult: false,
    language: 'ko-KR',
};
