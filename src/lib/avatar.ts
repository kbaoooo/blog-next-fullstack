/**
 * Avatar utility functions for generating initials and colors
 */

export function getInitials(name: string): string {
  if (!name || name.trim() === "") return "U";

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  // Take first letter of first word and first letter of last word
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export function getAvatarColor(name: string): string {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-sky-500",
  ];

  // Create a consistent hash based on name
  let hash = 0;
  const nameToHash = name.toLowerCase().trim();

  for (let i = 0; i < nameToHash.length; i++) {
    // Use bitwise operations to create a hash
    // This is a simple hash function to distribute names evenly across colors
    // ((hash << 5) - hash) is hash * 2^n - hash = hash * 31
    // This is a common technique to create a hash from a string
    // It effectively combines the character codes of the string into a single number
    // This helps ensure that similar names produce different colors
    hash = nameToHash.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}
