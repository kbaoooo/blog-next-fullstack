import { BlogCardProps } from "@/utils/types";
import BlogCard from "./blog-card";

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