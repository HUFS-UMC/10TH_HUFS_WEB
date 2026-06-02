interface SelectBoxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export const SelectBox = ({
    id,
    label,
    checked,
    onChange,
    className = '',
}: SelectBoxProps) => {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                type='checkbox'
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className='size-4 rounded border border-slate-500 bg-slate-700 text-blue-600 focus:ring-2 focus:ring-blue-500'
            />
            <label htmlFor={id} className='ml-2 text-sm text-slate-300'>
                {label}
            </label>
        </div>
    );
};

export default SelectBox;
