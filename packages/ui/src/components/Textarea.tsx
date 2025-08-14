import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
  {
    variants: {
      variant: {
        default: "",
        error: "border-error-500 focus:border-error-500 focus:ring-error-500/20",
        success: "border-success-500 focus:border-success-500 focus:ring-success-500/20",
      },
      size: {
        sm: "min-h-[60px] px-2 py-1.5 text-xs",
        md: "min-h-[80px] px-3 py-2 text-sm",
        lg: "min-h-[100px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, label, error, helperText, maxLength, showCount, id, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const textareaVariant = error ? "error" : variant;
    const currentLength = value?.toString().length || 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(textareaVariants({ variant: textareaVariant, size, className }))}
          maxLength={maxLength}
          value={value}
          ref={ref}
          {...props}
        />
        <div className="mt-1.5 flex justify-between items-start">
          <div>
            {error && (
              <p className="text-sm text-error-500 flex items-center gap-1">
                <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
          {(showCount || maxLength) && (
            <p className={cn(
              "text-xs tabular-nums",
              maxLength && currentLength > maxLength * 0.8
                ? "text-warning-600"
                : maxLength && currentLength >= maxLength
                ? "text-error-600"
                : "text-gray-400"
            )}>
              {currentLength}{maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";