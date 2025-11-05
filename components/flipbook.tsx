"use client";
import React, { useEffect, useRef, useState } from "react";

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

export default function FlipBook({ pages }: FlipBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<HTMLDivElement | null>(null);

  // Keep --c in sync with currentPage
  useEffect(() => {
    if (bookRef.current) {
      bookRef.current.style.setProperty("--c", String(currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    const section = document.getElementById("flipbook-section");
    const scrollSpacer = document.getElementById("scroll-spacer");
    const indicator = document.getElementById("scroll-indicator");
    const bookContainer = document.getElementById("book-container");

    if (!section || !scrollSpacer || !bookContainer) {
      console.warn(
        "FlipBook: missing #flipbook-section, #scroll-spacer or #book-container in DOM"
      );
      return;
    }

    // expose total pages to CSS for spacer height calculation
    scrollSpacer.style.setProperty("--total-pages", String(pages.length));

    // Helper to set book container into "fixed centered" state or "in-section absolute" state
    const setBookFixed = (fixed: boolean, sectionRect?: DOMRect) => {
      if (!bookContainer || !sectionRect) return;
      if (fixed) {
        // Make it fixed and full-viewport so .book can center itself with margin:auto
        bookContainer.style.position = "fixed";
        bookContainer.style.top = "0";
        bookContainer.style.left = "0";
        bookContainer.style.width = "100%";
        bookContainer.style.height = `${window.innerHeight}px`;
        bookContainer.style.zIndex = "60";
        bookContainer.style.pointerEvents = "none";
      } else {
        // Return it to be absolutely positioned inside the section so it scrolls with the section
        // Ensure section is positioned (section should be relative)
        bookContainer.style.position = "absolute";
        bookContainer.style.top = "0";
        bookContainer.style.left = "0";
        bookContainer.style.width = "100%";
        // make container height match the section so it occupies normal flow
        bookContainer.style.height = `${sectionRect.height}px`;
        // lower z so it doesn't overlap global UI
        bookContainer.style.zIndex = "10";
        bookContainer.style.pointerEvents = "none";
      }
    };

    // Compute progress and toggle fixed/absolute
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionBottom = window.scrollY + rect.bottom;
        const sectionHeight = Math.max(rect.height, 1);

        // center of viewport (vertical)
        const centerY = window.scrollY + window.innerHeight / 2;

        // ACTIVE when viewport center is inside the section bounds
        const active = centerY >= sectionTop && centerY <= sectionBottom;

        // Toggle fixed vs absolute
        setBookFixed(active, rect);

        // Progress of the center moving through the section:
        // normalized 0..1 where 0 -> center at sectionTop, 1 -> center at sectionBottom
        const rawProgress = (centerY - sectionTop) / sectionHeight;
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        // Map progress to page index (0..pages.length-1)
        const idx =
          pages.length > 1 ? Math.round(progress * (pages.length - 1)) : 0;
        setCurrentPage(idx);

        // hide indicator after first scroll
        if (indicator) {
          indicator.style.opacity = "0";
          indicator.style.transition = "opacity 0.35s";
        }

        ticking = false;
      });
    };

    // initial layout: ensure book container uses absolute so it doesn't overlap before entering
    // set size based on section
    setBookFixed(false, section.getBoundingClientRect());
    // do an initial compute to set page
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const hideTimer = setTimeout(() => {
      if (indicator) {
        indicator.style.opacity = "0";
        indicator.style.transition = "opacity 0.35s";
      }
    }, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(hideTimer);
      // optional: cleanup inline styles we set
      bookContainer.style.position = "";
      bookContainer.style.top = "";
      bookContainer.style.left = "";
      bookContainer.style.width = "";
      bookContainer.style.height = "";
      bookContainer.style.zIndex = "";
      bookContainer.style.pointerEvents = "";
    };
  }, [pages.length]);

  // Click-to-scroll helper: scrolls the window so the viewport center aligns with the page index position
  const scrollToPageIndex = (pageIndex: number) => {
    const section = document.getElementById("flipbook-section");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = Math.max(rect.height, 1);

    const progress = pages.length > 1 ? pageIndex / (pages.length - 1) : 0;
    // target center position is sectionTop + progress*sectionHeight
    const targetCenter = sectionTop + progress * sectionHeight;
    // we want the viewport center (window.innerHeight/2) to be at targetCenter, so scroll to targetCenter - halfViewport
    const targetScrollTop = Math.round(targetCenter - window.innerHeight / 2);

    window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  const handlePageClick = (
    evt: React.MouseEvent,
    idx: number,
    isFront: boolean
  ) => {
    if ((evt.target as HTMLElement).closest("a")) return;
    const curr = isFront ? idx + 1 : idx;
    const clamped = Math.min(Math.max(curr, 0), Math.max(pages.length - 1, 0));
    setCurrentPage(clamped);
    scrollToPageIndex(clamped);
  };

  return (
    <div className="book" ref={bookRef}>
      {pages.map((page, idx) => (
        <div
          key={idx}
          className="page"
          style={{ ["--i" as any]: idx } as React.CSSProperties}
        >
          <div
            className={`front ${page.front.cover ? "cover" : ""}`}
            onClick={(evt) => handlePageClick(evt, idx, true)}
          >
            {page.front.content}
            {!page.front.cover && !page.front.hidePageNumber && (
              <span className="page-number">{idx * 2 + 1}.</span>
            )}
          </div>

          <div
            className={`back ${page.back.cover ? "cover" : ""}`}
            onClick={(evt) => handlePageClick(evt, idx, false)}
          >
            {page.back.content}
            {!page.back.cover && !page.back.hidePageNumber && (
              <span className="page-number">{idx * 2 + 2}.</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
