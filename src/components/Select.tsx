import { ChevronDown } from "lucide-react";
import { type ReactNode, type SelectHTMLAttributes, useId } from "react";

interface OptionsProps {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  options: OptionsProps[];
}

const Select = ({
  label,
  error,
  fullWidth,
  icon,
  options,
  ...rest
}: SelectProps) => {
  const selectId = useId();

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-2 relative`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-gray-900 mb-0.5 text-[15px]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div
            className="absolute inset-y-0 top-4 left-0 pl-2 flex
          items-center text-gray-400"
          >
            {icon}
          </div>
        )}
      </div>

      <select
        id={selectId}
        {...rest}
        className={`block w-full bg-gray-200 py-3 pl-7 pr-4
          rounded-xl text-gray-900 text-sm outline-none
          appearance-none ring-2
          ${error ? "ring-red-500" : "ring-gray-400"}
          ${error ? "focus:ring-red-500" : "focus:ring-primary-500"}
          `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        className="absolute inset-y-0 right-0 top-6 flex
      items-center pr-3"
      >
        <ChevronDown
          className="h-5 w-5 text-gray-400
        absolute top-3.5 right-4"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
