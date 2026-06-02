import { memo, useState } from 'react';
import type { MovieFilters, MovieLanguage } from '../types/movie';
import { DEFAULT_MOVIE_FILTERS, languageOptions } from '../constants/movie';
import Input from './Input';
import SelectBox from './SelectBox';
import LanguageSelector from './LanguageSelector';

interface MovieFilterProps {
    onChange: (filters: MovieFilters) => void;
}

const MovieFilter = memo(({ onChange }: MovieFilterProps) => {
    console.log('🎬 MovieFilter 리렌더링');

    const [query, setQuery] = useState(DEFAULT_MOVIE_FILTERS.query);
    const [includeAdult, setIncludeAdult] = useState(
        DEFAULT_MOVIE_FILTERS.includeAdult
    );
    const [language, setLanguage] = useState<MovieLanguage>(
        DEFAULT_MOVIE_FILTERS.language
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onChange({ query, includeAdult, language });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-lg'
        >
            <div className='flex flex-wrap gap-6'>
                {/* 영화 제목 */}
                <div className='min-w-[280px] flex-1'>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                        영화 제목
                    </label>
                    <Input
                        value={query}
                        onChange={setQuery}
                        placeholder='영화 제목을 입력하세요'
                    />
                </div>

                {/* 성인 콘텐츠 */}
                <div className='min-w-[200px] flex-1'>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                        옵션
                    </label>
                    <div className='flex h-[42px] items-center rounded-md border border-slate-600 bg-slate-800 px-4'>
                        <SelectBox
                            id='include-adult'
                            label='성인 콘텐츠 포함'
                            checked={includeAdult}
                            onChange={setIncludeAdult}
                        />
                    </div>
                </div>

                {/* 언어 선택 */}
                <div className='min-w-[200px] flex-1'>
                    <label className='mb-2 block text-sm font-medium text-slate-300'>
                        언어
                    </label>
                    <LanguageSelector
                        value={language}
                        onChange={setLanguage}
                        options={languageOptions}
                    />
                </div>
            </div>

            {/* 검색 버튼 */}
            <div className='pt-4'>
                <button
                    type='submit'
                    className='rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700'
                >
                    영화 검색
                </button>
            </div>
        </form>
    );
});

MovieFilter.displayName = 'MovieFilter';

export default MovieFilter;
