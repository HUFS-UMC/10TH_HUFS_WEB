import type { MovieLanguage } from '../types/movie';

interface LanguageOption {
    value: MovieLanguage;
    label: string;
}

interface LanguageSelectorProps {
    value: MovieLanguage;
    onChange: (value: MovieLanguage) => void;
    options: LanguageOption[];
    className?: string;
}

export const LanguageSelector = ({
    value,
    onChange,
    options,
    className = '',
}: LanguageSelectorProps) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as MovieLanguage)}
            className={`w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
