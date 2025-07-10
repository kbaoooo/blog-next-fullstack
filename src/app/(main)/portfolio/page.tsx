'use client';

import {
  About, 
  Contact, 
  Experience, 
  Feedbacks, 
  Hero, 
  StarsCanvas, 
  Tech, 
  Works
} from "./components";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function PortfolioPage() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const previousTheme = useRef<string | undefined>(undefined);

  useEffect(() => {
    previousTheme.current = resolvedTheme;
    document.documentElement.classList.add("dark");

    if (resolvedTheme !== "dark") {
      setTheme("dark");
    }

    return () => {
      if (previousTheme.current && previousTheme.current !== "dark") {
        document.documentElement.classList.remove("dark");
        setTheme(previousTheme.current);
      }
    };
  }, []);

  return (
    <div className="relative z-0">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
}