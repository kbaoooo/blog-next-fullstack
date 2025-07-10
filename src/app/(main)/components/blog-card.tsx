import { BlogCardProps } from "@/utils/types";
import { Eye, Clock } from "lucide-react";
import Image from "next/image";
import formatViews from "@/lib/formatViews";
import formatDate from "@/lib/formatDate";
import Link from "next/link";

export default function BlogCard({
    title,
    description,
    imageUrl,
    views,
    date,
    slug
}: BlogCardProps) {
    return (
        <Link className="group cursor-pointer transition-all duration-300 h-full flex flex-col"
            href={`/blog/${encodeURIComponent(slug)}`} 
            title={title} 
            aria-label={`Read more about ${title}`}
        >
            {/* <div 
                className="rounded-lg h-full flex flex-col group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)' }}    
            > */}
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
                    <Image 
                        src={imageUrl} 
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        // onError={(e) => {
                        //     // Fallback gradient background if image fails to load
                        //     e.currentTarget.style.display = 'none';
                        // }}
                        width={500}
                        height={300}
                    />
                </div>

                <div className="flex flex-col flex-grow p-3">
                    <div>
                        <span className="text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent uppercase tracking-wider">
                            DEVELOPER
                        </span>
                    </div>

                    <h3 className="font-semibold text-base text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight mb-4">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow min-h-[2.5rem]">
                        {description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{formatViews(views)} lượt xem</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(date, "vi-VN")}</span>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </Link>
    );
}