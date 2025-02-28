import React, { memo } from "react";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const SelectDropdown = memo(
  React.forwardRef<HTMLSelectElement, DropdownProps>(
    ({ options, placeholder, ...props }, ref) => {
      const renderPlaceholder = placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null;

      const renderOptions = options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ));

      return (
        <select
          ref={ref}
          className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        >
          {renderPlaceholder}
          {renderOptions}
        </select>
      );
    }
  )
);

export default SelectDropdown;
