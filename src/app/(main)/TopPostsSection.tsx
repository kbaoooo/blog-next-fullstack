import { BlogCardProps } from "@/utils/types";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { BlogsContainer } from "./components/blog-container";
import Seperator from "./components/seperator";

type TopPostsSectionProps = {
  data: BlogCardProps[] | [];
};

export type TopPostsSectionHandle = {
  scrollToHeading: () => void;
};

const TopPostsSection = forwardRef<TopPostsSectionHandle, TopPostsSectionProps>(
  (props, ref) => {
    const headingRef = useRef<HTMLHeadingElement>(null);

    // expose scroll function to parent component
    useImperativeHandle(ref, () => ({
      scrollToHeading: () => {
        const offset = 100;
        const element = headingRef.current;
        if (element) {
          const top =
            element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top,
            behavior: "smooth",
          });
        }
      },
    }));

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 my-8">
          <h2
            ref={headingRef}
            className="text-xl leading-none font-semibold text-neutral-600 capitalize dark:text-muted-foreground whitespace-nowrap"
          >
            Bài viết nổi bật
          </h2>
          <Seperator />
        </div>
        <BlogsContainer data={props.data} />
      </div>
    );
  }
);

TopPostsSection.displayName = "TopPostsSection";
export default TopPostsSection;
