import { forwardRef } from "react";
import { clsx } from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <span
        className={clsx(
          "inline-flex items-center rounded-full font-medium",
          {
            "bg-gray-100 text-gray-800": variant === "default",
            "bg-success-50 text-success-700": variant === "success",
            "bg-warning-50 text-warning-700": variant === "warning",
            "bg-error-50 text-error-700": variant === "error",
            "bg-primary-50 text-primary-700": variant === "info",
          },
          {
            "px-2 py-0.5 text-xs": size === "sm",
            "px-2.5 py-0.5 text-sm": size === "md",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";