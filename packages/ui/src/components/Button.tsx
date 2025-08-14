import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200",
        outline: "border-2 border-primary-500 bg-white text-primary-600 hover:bg-primary-50 hover:border-primary-600 shadow-sm hover:shadow-md transition-all duration-200",
        ghost: "text-primary-600 hover:bg-primary-100 hover:text-primary-700 transition-all duration-200",
        destructive: "bg-error-500 text-white hover:bg-error-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
        success: "bg-success-500 text-white hover:bg-success-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
        warning: "bg-warning-500 text-white hover:bg-warning-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
        marica: "bg-marica-500 text-white hover:bg-marica-600 active:bg-marica-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-base",
        xl: "h-12 px-8 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";