"use client";

import { BlogCardProps } from "@/utils/types";
import { useRef } from "react";
import HeroSection from "./components/hero-section";
import TopPostsSection from "./TopPostsSection";

type TopPostsSectionHandle = {
  scrollToHeading: () => void;
};

interface ScrollEffectWrapperProps {
  data?: BlogCardProps[];
}

export default function ScrollEffectWrapper({
  data = [],
}: ScrollEffectWrapperProps) {
  const topPostsSectionRef = useRef<TopPostsSectionHandle>(null);
  const handleScroll = () => {
    topPostsSectionRef.current?.scrollToHeading();
  };

  return (
    <>
      <HeroSection onScrollToHeading={handleScroll} />
      <TopPostsSection ref={topPostsSectionRef} data={data} />
    </>
  );
}
