"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  textClassName,
  wordClassName,
}: {
  text: string;
  words: string[];
  duration?: number;
  textClassName?: string;
  wordClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      <motion.span
        layoutId="subtext"
        className={cn(
          "text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl",
          textClassName
        )}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className={cn("relative inline-block overflow-visible", wordClassName)}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: "-100%", filter: "blur(8px)", opacity: 0 }}
            animate={{
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
            }}
            exit={{ y: "100%", filter: "blur(8px)", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="inline-block whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
