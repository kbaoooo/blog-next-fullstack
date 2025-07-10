import * as React from "react"

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
