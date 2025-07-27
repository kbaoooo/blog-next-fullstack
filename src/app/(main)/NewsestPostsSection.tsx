import { BlogsContainer } from "./components/blog-container";
import Seperator from "./components/seperator";
import { BlogCardProps } from "@/utils/types";

interface NewsestPostsSectionProps {
  data: BlogCardProps[] | [];
}

export default function NewsestPostsSection({
    data = [],
}: NewsestPostsSectionProps) {
  // fetch data from an API example here is static data: SampleBlogs
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 my-8">
        <h2 className="text-xl leading-none font-semibold text-neutral-600 capitalize dark:text-muted-foreground whitespace-nowrap">
          Bài viết mới nhất
        </h2>
        <Seperator />
      </div>
      <BlogsContainer data={data} />
    </div>
  );
}
