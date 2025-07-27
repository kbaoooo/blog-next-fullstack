"use client";

import { cn } from "@/lib/utils";
import { Heart, Mail, UserCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

interface FollowButtonProps {
  isFollowing?: boolean;
  followerCount?: number;
  className?: string;
  variant?: "default" | "compact" | "icon-only";
  showCount?: boolean;
}

export default function FollowButton({
  isFollowing = false,
  followerCount = 0,
  className,
  variant = "default",
  showCount = true,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [count, setCount] = useState(followerCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFollow = async () => {
    if (isLoading) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (following) {
      setFollowing(false);
      setCount((prev) => Math.max(0, prev - 1));
    } else {
      setFollowing(true);
      setCount((prev) => prev + 1);
    }

    setIsLoading(false);
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (variant === "icon-only") {
    return (
      <button
        onClick={handleFollow}
        disabled={isLoading}
        className={cn(
          "p-2 rounded-full transition-all duration-200 group",
          following
            ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500/10 hover:text-red-500",
          isLoading && "opacity-50 cursor-not-allowed",
          className
        )}
        title={following ? "Hủy theo dõi" : "Theo dõi blog"}
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-all duration-200",
            following ? "fill-current" : "group-hover:fill-current"
          )}
        />
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={handleFollow}
          disabled={isLoading}
          className={cn(
            "flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            following
              ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-200 dark:border-red-800"
              : "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
            isLoading && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : following ? (
            <UserCheck className="w-4 h-4" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          <span>{following ? "Đang theo dõi" : "Theo dõi"}</span>
        </button>

        {showCount && (
          <span className="text-sm text-muted-foreground">
            {count.toLocaleString()} người theo dõi
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Main Follow Button */}
      <button
        onClick={handleFollow}
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg",
          following
            ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-2 border-red-200 dark:border-red-800"
            : "bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 border-2 border-transparent",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : following ? (
          <>
            <UserCheck className="w-5 h-5" />
            <span>Đang theo dõi</span>
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            <span>Theo dõi Blog</span>
          </>
        )}
      </button>

      {/* Follower Count */}
      {showCount && (
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{count.toLocaleString()} người theo dõi</span>
          </div>
        </div>
      )}

      {/* Newsletter Subscription Hint */}
      {following && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-foreground font-medium">
                Đã theo dõi thành công! 🎉
              </p>
              <p className="text-muted-foreground mt-1">
                Bạn sẽ nhận được thông báo về các bài viết mới.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
