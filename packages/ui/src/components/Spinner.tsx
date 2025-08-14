import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-10 w-10",
      },
      variant: {
        default: "text-gray-600",
        primary: "text-primary-600",
        white: "text-white",
        success: "text-success-600",
        warning: "text-warning-600",
        error: "text-error-600",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label = "Carregando...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        role="status"
        aria-label={label}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

// Loading overlay component
export interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  spinnerSize?: SpinnerProps["size"];
  label?: string;
}

export function LoadingOverlay({
  isLoading,
  children,
  className,
  spinnerSize = "lg",
  label = "Carregando...",
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center space-y-2">
            <Spinner size={spinnerSize} variant="primary" />
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline loading component
export interface InlineLoadingProps {
  text?: string;
  size?: SpinnerProps["size"];
  className?: string;
}

export function InlineLoading({ 
  text = "Carregando...", 
  size = "sm", 
  className 
}: InlineLoadingProps) {
  return (
    <div className={cn("flex items-center space-x-2 text-gray-600", className)}>
      <Spinner size={size} variant="default" />
      <span className="text-sm">{text}</span>
    </div>
  );
}