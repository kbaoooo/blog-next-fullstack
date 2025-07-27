import { ArrowDown, BookOpen, Code, Coffee, Sparkles } from "lucide-react";
import Link from "next/link";
import SearchBar from "./search-bar";

interface HeroSectionProps {
  onScrollToHeading: () => void;
}

const techStack = [
  "TypeScript",
  "Next.js",
  "NestJS",
  "React",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "TailwindCSS",
];

export default function HeroSection({ onScrollToHeading }: HeroSectionProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-24 opacity-20">
        <Code className="w-12 h-12 text-primary animate-pulse" />
      </div>
      <div className="absolute top-32 right-16 opacity-30">
        <BookOpen className="w-10 h-10 text-primary animate-bounce delay-75" />
      </div>
      <div className="absolute bottom-36 left-20 opacity-25">
        <Coffee className="w-9 h-9 text-primary animate-pulse delay-150" />
      </div>
      <div className="absolute bottom-40 right-12 opacity-20">
        <Sparkles className="w-11 h-11 text-primary animate-bounce delay-300" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto my-12">
          <SearchBar placeholder="Tìm kiếm bài viết..." />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Fullstack</span>{" "}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
            Developer
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Chia sẻ kinh nghiệm về{" "}
          <span className="text-primary font-semibold">Next.js</span>,{" "}
          <span className="text-primary font-semibold">NestJS</span>,{" "}
          <span className="text-primary font-semibold">TypeScript</span> và
          những xu hướng phát triển web hiện đại
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onScrollToHeading}
            className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg shadow-primary/25 font-medium"
          >
            Khám phá bài viết
            <ArrowDown className="inline-block w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
          </button>
          <Link
            href="/portfolio"
            className="px-8 py-4 bg-card/50 backdrop-blur-sm border border-border text-foreground rounded-xl hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-200 font-medium"
          >
            Về tôi
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              50+
            </div>
            <div className="text-sm text-muted-foreground">Bài viết</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              10k+
            </div>
            <div className="text-sm text-muted-foreground">Lượt đọc</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              1+
            </div>
            <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
// Old colorful hero section - commented out
export default function HeroSection() {
  return (
    <div className="max-w-full items-center -rotate-2 select-none justify-center max-h-[350px] md:h-[400px] text-center overflow-hidden hidden md:flex">
      <div className="relative">
        <div className="animate-horizontal-scroll flex items-center gap-8 w-max px-8">
          {textItems.map((text, i) => (
            <h2
              key={i}
              className={`shrink-0 text-transparent bg-clip-text bg-gradient-to-r ${text.gradient} ${text.size} ${text.style}`}
            >
              {text.content}
            </h2>
          ))}
        </div>
        <div className="absolute top-0 left-0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
          {textItems.map((text, i) => (
            <h2
              key={i + "_2"}
              className={`shrink-0 text-transparent bg-clip-text bg-gradient-to-r ${text.gradient} ${text.size} ${text.style}`}
            >
              {text.content}
            </h2>
          ))}
        </div>
      </div>
    </div>
  )
}

const textItems = [
  {
    content: "Khanh Bao",
    size: "text-10xl",
    gradient: "from-blue-400 to-purple-500",
    style: "font-black"
  },
  {
    content: "Fullstack Developer",
    size: "text-8xl",
    gradient: "from-pink-400 to-orange-300",
    style: "italic font-light"
  },
  {
    content: "Next.js Mastery",
    size: "text-12xl",
    gradient: "from-green-400 to-teal-400",
    style: "font-bold"
  },
  {
    content: "NestJS Architecture",
    size: "text-12xl",
    gradient: "from-yellow-400 to-red-500",
    style: "italic font-bold"
  },
  {
    content: "Clean Code",
    size: "text-9xl",
    gradient: "from-cyan-300 to-blue-300",
    style: "font-medium"
  },
  {
    content: "Modern Web",
    size: "text-9xl",
    gradient: "from-pink-200 to-pink-400",
    style: "italic font-extralight"
  },
  {
    content: "TypeScript Fan",
    size: "text-13xl",
    gradient: "from-purple-300 to-indigo-400",
    style: "font-bold"
  },
  {
    content: "Open Source",
    size: "text-13xl",
    gradient: "from-red-400 to-yellow-300",
    style: "italic font-bold"
  },
]
*/
