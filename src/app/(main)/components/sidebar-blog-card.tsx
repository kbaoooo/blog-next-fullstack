import formatDate from "@/lib/formatDate";
import formatViews from "@/lib/formatViews";
import { BlogCardProps } from "@/utils/types";
import { Eye, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SidebarBlogCard({
    title,
    description,
    imageUrl,
    views,
    date,
    slug
  }: BlogCardProps) {
    return (
      <Link 
        className="group cursor-pointer transition-all duration-300 flex gap-3 p-3 rounded-lg hover:bg-gray-700/30"
        href={`/blog/${encodeURIComponent(slug)}`} 
        title={title} 
        aria-label={`Read more about ${title}`}
      >
        {/* Hình ảnh nhỏ bên trái */}
        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
          <Image 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={64}
            height={64}
          />
        </div>
  
        {/* Nội dung bên phải */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-white line-clamp-2 group-hover:text-purple-400 transition-colors leading-tight mb-1">
            {title}
          </h4>

            <p className="text-xs text-gray-300 line-clamp-2 mb-2">
                {description}
            </p>
          
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{formatViews(views)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(date, "vi-VN")}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }