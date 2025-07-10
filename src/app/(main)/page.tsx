import HeroSection from "@/app/(main)/components/hero-section";
import Seperator from "@/app/(main)/components/seperator";
import BlogCard from "./components/blog-card";
import { BlogCardProps } from "@/utils/types";

const SampleBlogs: BlogCardProps[] = [
  {
    title: "Khám Phá Next.js 14",
    description: "Tìm hiểu những tính năng mới trong Next.js 14 và cách chúng cải thiện hiệu suất ứng dụng.",
    imageUrl: "https://picsum.photos/640/360?random=1",
    views: 1200,
    date: "2023-10-01",
    slug: "kham-pha-nextjs-14"
  },
  {
    title: "NestJS Architecture",
    description: "Hướng dẫn xây dựng kiến trúc ứng dụng với NestJS cho các dự án lớn.",
    imageUrl: "https://picsum.photos/640/360?random=2",
    views: 800,
    date: "2023-09-15",
    slug: "nestjs-architecture"
  },
  {
    title: "Clean Code Principles",
    description: "Các nguyên tắc viết mã sạch giúp duy trì chất lượng mã nguồn trong dự án.",
    imageUrl: "https://picsum.photos/640/360?random=3",
    views: 1500,
    date: "2023-08-20",
    slug: "clean-code-principles"
  },
  {
    title: "TypeScript Tips and Tricks",
    description: "Những mẹo và thủ thuật hữu ích khi làm việc với TypeScript trong các dự án web.",
    imageUrl: "https://picsum.photos/640/360?random=4",
    views: 950,
    date: "2023-07-10",
    slug: "typescript-tips-and-tricks"
  },
  {
    title: "Modern Web Development",
    description: "Xu hướng phát triển web hiện đại và các công nghệ mới nổi.",
    imageUrl: "https://picsum.photos/640/360?random=5",
    views: 1100,
    date: "2023-05-25",
    slug: "modern-web-development"
  },
  {
    title: "Next.js Performance Optimization",
    description: "Các kỹ thuật tối ưu hóa hiệu suất ứng dụng Next.js.",
    imageUrl: "https://picsum.photos/640/360?random=6",
    views: 1300,
    date: "2023-04-15",
    slug: "nextjs-performance-optimization"
  },
  {
    title: "Building Scalable APIs with NestJS",
    description: "Hướng dẫn xây dựng API có thể mở rộng với NestJS.",
    imageUrl: "https://picsum.photos/640/360?random=7",
    views: 700,
    date: "2023-03-30",
    slug: "building-scalable-apis-nestjs"
  }
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TopPostsSection />
      <NewsestPostsSection />
      <MustReadSection />
    </div>
  );
}

export function BlogsContainer({ 
  data, 
  layout = "grid", 
  className  = ""
}: { data: BlogCardProps[], layout?: "grid" | "sidebar", className?: string }) {
  if (layout === "sidebar") {
    return (
      <div className={`flex flex-col gap-6 ${className}`}>
        {data.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.imageUrl}
            views={blog.views}
            date={blog.date}
            slug={blog.slug}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-11">
      {data.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          description={blog.description}
          imageUrl={blog.imageUrl}
          views={blog.views}
          date={blog.date}
          slug={blog.slug}
        />
      ))}
    </div>
  );
}

function MustReadSection() {
  // fetch data from an API example here is static data: SampleBlogs
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 my-8">
        <h2 className="text-xl leading-none font-semibold text-neutral-600 capitalize dark:text-muted-foreground whitespace-nowrap">
          Phải đọc thêm
        </h2>
        <Seperator />
      </div>
      <BlogsContainer data={SampleBlogs} />
    </div>
  );
}

function TopPostsSection() {
  // fetch data from an API example here is static data: SampleBlogs
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 my-8">
        <h2 className="text-xl leading-none font-semibold text-neutral-600 capitalize dark:text-muted-foreground whitespace-nowrap">
          Bài viết nổi bật
        </h2>
        <Seperator />
      </div>
      <BlogsContainer data={SampleBlogs} />
    </div>
  );
}

function NewsestPostsSection() {
  // fetch data from an API example here is static data: SampleBlogs
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 my-8">
        <h2 className="text-xl leading-none font-semibold text-neutral-600 capitalize dark:text-muted-foreground whitespace-nowrap">
          Bài viết mới nhất
        </h2>
        <Seperator />
      </div>
      <BlogsContainer data={SampleBlogs} />
    </div>
  );
}