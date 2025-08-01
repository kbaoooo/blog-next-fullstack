"use client";

import { cn } from "@/lib/utils";
import { Heart, UserCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface FollowButtonProps {
  isFollowing?: boolean;
  followerCount?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

export default function FollowButton({
  isFollowing = false,
  followerCount = 0,
  className,
  size = "md",
  variant = "default",
  disabled = false,
  onFollowChange,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [count, setCount] = useState(followerCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update local state when props change
  useEffect(() => {
    setFollowing(isFollowing);
    setCount(followerCount);
  }, [isFollowing, followerCount]);

  const handleFollow = async () => {
    if (isLoading || disabled) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newFollowingState = !following;
    setFollowing(newFollowingState);

    if (newFollowingState) {
      setCount((prev) => prev + 1);
    } else {
      setCount((prev) => Math.max(0, prev - 1));
    }

    // Call callback if provided
    onFollowChange?.(newFollowingState);

    setIsLoading(false);
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "opacity-0", // Hidden during hydration
          getSizeClasses(size),
          className
        )}
      >
        <UserPlus className={getIconSize(size)} />
        <span className="ml-2">Theo dõi</span>
      </div>
    );
  }

  const buttonContent = (
    <button
      onClick={handleFollow}
      disabled={isLoading || disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        getSizeClasses(size),
        getVariantClasses(variant, following),
        (isLoading || disabled) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <div
          className={cn(
            "border-2 border-current border-t-transparent rounded-full animate-spin",
            getIconSize(size)
          )}
        />
      ) : following ? (
        <UserCheck className={getIconSize(size)} />
      ) : (
        <UserPlus className={getIconSize(size)} />
      )}
      <span className="ml-2">{following ? "Đang theo dõi" : "Theo dõi"}</span>
    </button>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span>{count.toLocaleString()} người theo dõi</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Helper functions for styling
function getSizeClasses(size: "sm" | "md" | "lg"): string {
  switch (size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "md":
      return "px-4 py-2 text-sm";
    case "lg":
      return "px-6 py-3 text-base";
    default:
      return "px-4 py-2 text-sm";
  }
}

function getIconSize(size: "sm" | "md" | "lg"): string {
  switch (size) {
    case "sm":
      return "w-4 h-4";
    case "md":
      return "w-4 h-4";
    case "lg":
      return "w-5 h-5";
    default:
      return "w-4 h-4";
  }
}

function getVariantClasses(
  variant: "default" | "outline" | "ghost",
  isFollowing: boolean
): string {
  if (isFollowing) {
    // Following state styling
    switch (variant) {
      case "default":
        return "bg-green-500/10 text-green-600 border border-green-200 hover:bg-green-500/20 focus:ring-green-500 dark:border-green-800 dark:text-green-400";
      case "outline":
        return "border-2 border-green-500 text-green-600 hover:bg-green-500/10 focus:ring-green-500 dark:text-green-400";
      case "ghost":
        return "text-green-600 hover:bg-green-500/10 focus:ring-green-500 dark:text-green-400";
      default:
        return "bg-green-500/10 text-green-600 border border-green-200 hover:bg-green-500/20 focus:ring-green-500 dark:border-green-800 dark:text-green-400";
    }
  } else {
    // Not following state styling
    switch (variant) {
      case "default":
        return "bg-primary text-primary-foreground border border-primary hover:bg-primary/90 focus:ring-primary";
      case "outline":
        return "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary";
      case "ghost":
        return "text-primary hover:bg-primary/10 focus:ring-primary";
      default:
        return "bg-primary text-primary-foreground border border-primary hover:bg-primary/90 focus:ring-primary";
    }
  }
}
