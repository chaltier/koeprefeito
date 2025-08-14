import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-gray-200",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const progressBarVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-gray-900",
        primary: "bg-primary-600",
        success: "bg-success-600",
        warning: "bg-warning-600",
        error: "bg-error-600",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressBarVariants> {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    size, 
    variant, 
    value = 0, 
    max = 100, 
    label,
    showValue = false,
    animated = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-1">
            {label && (
              <span className="text-sm font-medium text-gray-700">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm text-gray-500">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(progressVariants({ size }), className)}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
          aria-label={label}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant }),
              animated && "animate-pulse"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

// Circular Progress Component
export interface CircularProgressProps extends VariantProps<typeof progressBarVariants> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function CircularProgress({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = "primary",
  label,
  showValue = true,
  className,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap: Record<string, string> = {
    default: "stroke-gray-900",
    primary: "stroke-primary-600",
    success: "stroke-success-600",
    warning: "stroke-warning-600",
    error: "stroke-error-600",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            colorMap[variant],
            "transition-all duration-300 ease-in-out"
          )}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className="text-xl font-semibold text-gray-900">
            {Math.round(percentage)}%
          </span>
        )}
        {label && (
          <span className="text-sm text-gray-500 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}