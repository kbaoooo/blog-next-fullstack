"use client";

import { getAvatarColor, getInitials } from "@/lib/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
};

const sizePixels = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};

export default function Avatar({
  name,
  avatarUrl,
  size = "md",
  className,
}: AvatarProps) {
  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);
  const sizeClass = sizeClasses[size];
  const pixelSize = sizePixels[size];

  console.log("Avatar render:", {
    name,
    initials,
    backgroundColor,
    avatarUrl,
    hasAvatar: !!(avatarUrl && avatarUrl.trim() !== ""),
  });

  if (avatarUrl && avatarUrl.trim() !== "") {
    return (
      <Image
        src={avatarUrl}
        alt={`${name} avatar`}
        width={pixelSize}
        height={pixelSize}
        className={cn(
          sizeClass,
          "rounded-full object-cover border-2 border-border",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        sizeClass,
        "rounded-full flex items-center justify-center text-white font-semibold",
        backgroundColor,
        className
      )}
    >
      {initials}
    </div>
  );
}
