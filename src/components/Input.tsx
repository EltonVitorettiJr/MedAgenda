import { type InputHTMLAttributes, type ReactNode, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  error?: boolean;
  label?: string;
  id?: string;
  icon?: ReactNode;
}

const Input = ({
  fullWidth,
  error,
  label,
  id,
  icon,
  className,
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = generatedId || id;

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {label && (
        <div>
          <label htmlFor={inputId}>{label}</label>
        </div>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute top-1.5 left-1.5 text-gray-400">{icon}</div>
        )}
      </div>

      <input
        id={inputId}
        className={`block w-full rounded-xl border
          bg-gray-200 px-4 py-3 text-sm
          transition-all
          focus:outline-none

          ${
            error
              ? "border-red-500"
              : "border-gray-400 focus:ring-2 focus:ring-primary-500"
          }
          ${icon ? "pl-7" : ""}
          ${className}
        `}
        {...rest}
      />
    </div>
  );
};

export default Input;
