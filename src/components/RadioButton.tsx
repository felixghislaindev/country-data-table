import { FC, memo } from "react";

interface RadioButtonProps {
  id: string;
  value: string;
  label: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: FC<RadioButtonProps> = memo(
  ({ id, value, label, name, checked, onChange }) => {
    const handleChange = () => {
      onChange(value);
    };

    return (
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id={id}
          value={value}
          name={name}
          checked={checked}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor={id} className="text-gray-700 cursor-pointer">
          {label}
        </label>
      </div>
    );
  }
);
export default RadioButton;
