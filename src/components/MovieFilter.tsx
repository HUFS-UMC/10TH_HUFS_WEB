import { useState } from "react";
import { memo } from "react";

import { Input } from "../components/Input";
import LanguageSelector from "../components/LanguageSelector";
import { SelectBox } from "../components/SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import type { MovieFilters } from "../types/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  const handleSubmit = () : void => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  return (
    <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-112.5 flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>

        <div className="min-w-62.5 flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            💰 옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="min-w-62.5 flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            💰 언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4">
          <button onClick={handleSubmit}>영화 검색</button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieFilter);