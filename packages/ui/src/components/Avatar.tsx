import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  loading?: "eager" | "lazy";
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, loading = "lazy", ...props }, ref) => {
    const getInitials = (name?: string) => {
      if (!name) return "?";
      return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src ? (
          <img
            className="aspect-square h-full w-full object-cover"
            src={src}
            alt={alt || "Avatar"}
            loading={loading}
            onError={(e) => {
              // Hide image on error and show fallback
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        
        {/* Fallback always rendered but hidden when image loads */}
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium",
            src ? "absolute inset-0" : "",
            {
              "text-xs": size === "xs" || size === "sm",
              "text-sm": size === "md",
              "text-base": size === "lg",
              "text-lg": size === "xl",
              "text-xl": size === "2xl",
            }
          )}
          style={src ? { zIndex: -1 } : {}}
        >
          {getInitials(fallback || alt)}
        </div>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

// Avatar Group Component
export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps["size"];
  className?: string;
}

export function AvatarGroup({ children, max = 3, size = "md", className }: AvatarGroupProps) {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = max ? avatars.slice(0, max) : avatars;
  const hiddenCount = avatars.length - visibleAvatars.length;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          {React.cloneElement(avatar as React.ReactElement, { size })}
        </div>
      ))}
      {hiddenCount > 0 && (
        <div className="ring-2 ring-white rounded-full">
          <Avatar
            size={size}
            fallback={`+${hiddenCount}`}
            className="bg-gray-200 text-gray-600"
          />
        </div>
      )}
    </div>
  );
}