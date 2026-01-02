import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  hover?: boolean;
  className?: string;
}

const Card = ({
  children,
  className,
  hover,
  icon,
  subtitle,
  title,
}: CardProps) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-400
            shadow-md p-6 transition-all
            
            ${
              hover
                ? "hover:border-primary-500 hover:shadow-lg hover:-translate-y-0.5"
                : ""
            }
            ${className}
        `}
    >
      {(title || icon) && (
        <div>
          {icon && <div>{icon}</div>}
          {(title || subtitle) && (
            <div>
              {title}
              {subtitle}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
