import { memo, useCallback } from "react";

import { mergeStyles } from "@/lib/utils/styles";

interface PageSizeSelectorProps {
  value: number;
  options?: number[];
  onChange: (pageSize: number) => void;
  onPageReset?: () => void;
  label?: string;
  className?: string;
}

const PageSizeSelector = memo(
  ({
    value,
    options = [10, 15, 25, 50],
    onChange,
    onPageReset,
    label = "Záznamů na stránku: ",
    className,
  }: PageSizeSelectorProps) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPageSize = Number(e.target.value);
        onChange(newPageSize);
        onPageReset?.();
      },
      [onChange, onPageReset]
    );

    return (
      <div className={mergeStyles("flex items-center gap-2", className)}>
        <label className="text-small text-default-400">{label}</label>
        <select
          value={value}
          onChange={handleChange}
          className="bg-transparent outline-none text-default-400 text-small"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

PageSizeSelector.displayName = "PageSizeSelector";

export default PageSizeSelector;
