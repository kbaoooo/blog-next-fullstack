import { BlogCardProps } from "@/utils/types";
import { Metadata } from "next";
import MustReadSection from "./MustReadSection";
import NewsestPostsSection from "./NewsestPostsSection";
import ScrollEffectWrapperForHeroSectionAndTopPostsSection from "./ScrollEffectWrapperForHeroSectionAndTopPostsSection";

export const metadata: Metadata = {
  title: "Trang chủ",
};

const SampleBlogs: BlogCardProps[] = [
  {
    title: "Khám Phá Next.js 14",
    description:
      "Tìm hiểu những tính năng mới trong Next.js 14 và cách chúng cải thiện hiệu suất ứng dụng.",
    imageUrl: "https://picsum.photos/640/360?random=1",
    views: 1200,
    date: "2023-10-01",
    slug: "kham-pha-nextjs-14",
  },
  {
    title: "NestJS Architecture",
    description:
      "Hướng dẫn xây dựng kiến trúc ứng dụng với NestJS cho các dự án lớn.",
    imageUrl: "https://picsum.photos/640/360?random=2",
    views: 800,
    date: "2023-09-15",
    slug: "nestjs-architecture",
  },
  {
    title: "Clean Code Principles",
    description:
      "Các nguyên tắc viết mã sạch giúp duy trì chất lượng mã nguồn trong dự án.",
    imageUrl: "https://picsum.photos/640/360?random=3",
    views: 1500,
    date: "2023-08-20",
    slug: "clean-code-principles",
  },
  {
    title: "TypeScript Tips and Tricks",
    description:
      "Những mẹo và thủ thuật hữu ích khi làm việc với TypeScript trong các dự án web.",
    imageUrl: "https://picsum.photos/640/360?random=4",
    views: 950,
    date: "2023-07-10",
    slug: "typescript-tips-and-tricks",
  },
  {
    title: "Modern Web Development",
    description: "Xu hướng phát triển web hiện đại và các công nghệ mới nổi.",
    imageUrl: "https://picsum.photos/640/360?random=5",
    views: 1100,
    date: "2023-05-25",
    slug: "modern-web-development",
  },
  {
    title: "Next.js Performance Optimization",
    description: "Các kỹ thuật tối ưu hóa hiệu suất ứng dụng Next.js.",
    imageUrl: "https://picsum.photos/640/360?random=6",
    views: 1300,
    date: "2023-04-15",
    slug: "nextjs-performance-optimization",
  },
  {
    title: "Building Scalable APIs with NestJS",
    description: "Hướng dẫn xây dựng API có thể mở rộng với NestJS.",
    imageUrl: "https://picsum.photos/640/360?random=7",
    views: 700,
    date: "2023-03-30",
    slug: "building-scalable-apis-nestjs",
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <ScrollEffectWrapperForHeroSectionAndTopPostsSection data={SampleBlogs} />
      <NewsestPostsSection data={SampleBlogs} />
      <MustReadSection data={SampleBlogs} />
    </div>
  );
}
