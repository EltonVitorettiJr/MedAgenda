import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariants =
  | "primary"
  | "outline"
  | "secondary"
  | "danger"
  | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariants;
}

const Button = ({
  fullWidth = false,
  children,
  isLoading = false,
  variant = "primary",
  type = "button",
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const buttonVariants = {
    primary:
      "bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:trasnlate-y-0",
    outline:
      "border border-primary-500 text-primary-500 hover:bg-primary-500/10 ",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    success: "bg-green-500 text-[#051626] hover:brightness-90",
    danger: "bg-red-500 text-white hover:brightness-90",
  };

  const loadingAnimation = () => {
    return (
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <title>Loading spinner</title>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
          5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {children}
      </div>
    );
  };

  return (
    <button
      type={type}
      className={`px-5 py-2.5 rounded-xl font-medium transition-all
        flex items-center justify-center
        
        ${buttonVariants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${
          isLoading || disabled
            ? "opacity-70 cursor-not-allowed"
            : "cursor-pointer"
        }
        ${className}
        `}
      {...rest}
    >
      {isLoading ? loadingAnimation() : children}
    </button>
  );
};

export default Button;
