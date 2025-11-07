// @/components/flipbook.tsx
"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// --- TYPE DEFINITIONS ---
// (Copied from your original file)
type Page = {
  front: {
    cover?: boolean;
    hidePageNumber?: boolean;
    content: React.ReactNode;
  };
  back: {
    cover?: boolean;
    hidePageNumber?: boolean;
    content: React.ReactNode;
  };
};

type FlipBookProps = {
  pages: Page[];
};

// --- 1. MAIN FLIPBOOK COMPONENT ---
// This is now a self-contained scroll section.
// Just drop it into your page.
// ------------------------------------
export default function FlipBook({ pages }: FlipBookProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const totalPages = pages.length;

  // 1. Scroll Logic
  // We track the scroll progress of the trackRef div.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"], // Start when track top hits viewport top, end when track bottom hits viewport bottom
  });

  // 2. Map scroll to current page
  // We map the 0-1 scroll progress to a page number, from 0 to totalPages.
  // As we scroll, `currentPage` will go from 0 up to `totalPages`.
  const currentPage = useTransform(scrollYProgress, [0, 1], [0, totalPages]);

  // 3. Scroll-to-page click handler
  const scrollToPage = (idx: number) => {
    if (!trackRef.current) return;

    // Get the top offset of the entire scroll track
    const trackTop = trackRef.current.offsetTop;
    // Get the total scrollable height of the track
    const trackScrollableHeight =
      trackRef.current.scrollHeight - window.innerHeight;

    // Calculate the target progress (0-1) for the desired page index
    // We add a tiny bit (0.1) to make sure the flip is initiated
    const targetProgress = (idx + 0.1) / totalPages;

    // Calculate the final scrollY position
    const targetScrollY = trackTop + targetProgress * trackScrollableHeight;

    // Scroll the window smoothly to that position
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // 4. Book-level transforms (the 3D tilt)
  // Replicates the `rotateX(30deg)` from your CSS.
  // It animates from 30deg to 0deg as you start scrolling,
  // and back to 30deg as you scroll out.
  const bookRotateX = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1], // at 0% scroll, 5%, 95%, 100%
    [30, 0, 0, 30] // apply these rotation values
  );

  return (
    // A. The Scroll Track
    // This div creates the scrollable height for the animation.
    // Height is (N+1)*100vh: 100vh for each page + 1 "buffer" vh.
    // This is the "scroll hijacking" container.
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${(totalPages + 1) * 100}vh` }}
    >
      {/* B. The Sticky Container */}
      {/* This holds the book centered on screen. It sticks to the top */}
      {/* of the viewport for the entire duration of the scroll track. */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        {/* C. The Book Container */}
        {/* This div applies the 3D perspective and the book's tilt. */}
        <motion.div
          className="relative w-[40vmin] aspect-[3/4]"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            rotateX: bookRotateX,
          }}
        >
          {/* D. Map over pages */}
          {/* We render all pages, and their animations are driven */}
          {/* by the `currentPage` motion value. */}
          {pages.map((page, idx) => (
            <BookPage
              key={idx}
              page={page}
              idx={idx}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageClick={() => scrollToPage(idx + 1)} // Click front -> go to next page
              onBackClick={() => scrollToPage(idx)} // Click back -> go to this page
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// --- 2. BOOK PAGE SUB-COMPONENT ---
// This component handles the logic for a single flipping page.
// ---------------------------------
type BookPageProps = {
  page: Page;
  idx: number; // This page's index (0, 1, 2...)
  totalPages: number;
  currentPage: MotionValue<number>; // The shared motion value (0 to totalPages)
  onPageClick: () => void;
  onBackClick: () => void;
};

function BookPage({
  page,
  idx,
  totalPages,
  currentPage,
  onPageClick,
  onBackClick,
}: BookPageProps) {
  // 1. Page Flip Transform
  // As `currentPage` goes from `idx` to `idx + 1`,
  // this page's `rotateY` will go from 0 to -180 degrees.
  const rotateY = useTransform(currentPage, [idx, idx + 1], [0, -180], {
    clamp: true, // Don't extrapolate past -180deg
  });

  // 2. Z-Index Transform
  // This is a trick to ensure the active page is always on top.
  // We calculate the "distance" from the active page.
  // The page closest to the current flip (diff approx 0) gets the highest z-index.
  const zIndex = useTransform(currentPage, (c) => {
    // c = current page (e.g., 1.5)
    // idx = this page's index (e.g., 1)
    // diff = abs(1.5 - 1 - 0.5) = 0
    // z-index = 50 - 0 = 50 (highest)
    const diff = Math.abs(c - idx - 0.5);
    return Math.floor(50 - diff);
  });

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        // Essential styles for 3D transform
        transformOrigin: "left center", // Flip from the "spine"
        transformStyle: "preserve-3d",
        // Apply motion values
        rotateY,
        zIndex,
      }}
    >
      {/* Front of the page */}
      <PageContent
        isFront={true}
        content={page.front.content}
        isCover={page.front.cover}
        hidePageNumber={page.front.hidePageNumber}
        pageNumber={idx * 2 + 1}
        onClick={onPageClick}
      />

      {/* Back of the page */}
      <PageContent
        isFront={false}
        content={page.back.content}
        isCover={page.back.cover}
        hidePageNumber={page.back.hidePageNumber}
        pageNumber={idx * 2 + 2}
        onClick={onBackClick}
      />
    </motion.div>
  );
}

// --- 3. PAGE CONTENT SUB-COMPONENT ---
// This component handles all the styling for the page surfaces.
// ------------------------------------
type PageContentProps = {
  isFront: boolean;
  content: React.ReactNode;
  isCover?: boolean;
  hidePageNumber?: boolean;
  pageNumber: number;
  onClick: () => void;
};

function PageContent({
  isFront,
  content,
  isCover,
  hidePageNumber,
  pageNumber,
  onClick,
}: PageContentProps) {
  // Check if content is an image for full-bleed styling
  const hasImage = React.Children.toArray(content).some(
    (child) => (child as React.ReactElement).type === "img"
  );

  // --- Build Tailwind classes ---
  let baseClasses =
    "absolute w-full h-full flex flex-col justify-between text-black shadow-lg cursor-pointer";

  // Padding: None if it's an image, default otherwise
  baseClasses += hasImage ? " p-0" : " p-8";

  // Cover vs. Regular Page
  if (isCover) {
    baseClasses += " text-white bg-[hsl(231,32%,29%)]"; // Your cover color
    if (isFront) {
      baseClasses += " bg-cover bg-center"; // Front cover has image
    }
  } else {
    // Regular page gradients (replicating your CSS)
    baseClasses += isFront
      ? " bg-gradient-to-l from-neutral-100 via-white to-white"
      : " bg-gradient-to-r from-neutral-100 via-white to-white";
  }

  // Rounding (inner vs. outer edge)
  baseClasses += isFront ? " rounded-r-lg" : " rounded-l-lg";

  return (
    <motion.div
      className={baseClasses}
      style={{
        // Hide the backface of the div when it's rotated
        backfaceVisibility: "hidden",
        // Apply front cover image (from your CSS)
        backgroundImage:
          isCover && isFront
            ? `url("https://opfjwckyarxymdkzuwdk.supabase.co/storage/v1/object/public/envo/temp-gud-for-us.jpeg")`
            : undefined,
        // The back div must be pre-rotated 180deg
        transform: isFront ? "none" : "rotateY(180deg)",
      }}
      onClick={(e) => {
        // Don't trigger flip if clicking an actual link
        if ((e.target as HTMLElement).closest("a")) return;
        onClick();
      }}
    >
      {/* Content (relative z-10 to be above image) */}
      <div className={`relative z-10 ${hasImage ? "p-8" : ""}`}>{content}</div>

      {/* Page Number (z-0, behind content) */}
      {!isCover && !hidePageNumber && (
        <span
          className={`absolute bottom-4 text-sm z-0 ${
            isFront ? "right-4" : "left-4"
          }`}
        >
          {pageNumber}.
        </span>
      )}

      {/* Full-bleed image content (if present) */}
      {hasImage && <div className="absolute inset-0 z-0">{content}</div>}
    </motion.div>
  );
}
