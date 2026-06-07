import { memo } from "react";

interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
  className?: string;
}

const SelectBox = ({
  checked,
  onChange,
  label,
  id,
  className = "",
}: SelectBoxProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-2 ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default memo(SelectBox);