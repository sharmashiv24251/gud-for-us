"use client";
import React, { useState } from "react";
import type { JSX } from "react";

export default function Hero(): JSX.Element {
  return (
    <section className="relative md:h-[calc(100vh-84px)] max-h-[1440px] md:mt-[30px] lg:mt-2 mt flex items-center">
      <div className="mx-auto max-w-7xl px-6 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <HeroLeft />
          <HeroRight />
        </div>
      </div>
    </section>
  );
}

function HeroLeft(): JSX.Element {
  return (
    <div className="relative">
      <Title />
      <Strapline />
    </div>
  );
}

function Title(): JSX.Element {
  return (
    <h1
      className="leading-none text-foreground"
      style={{
        fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
        letterSpacing: "-0.02em",
      }}
    >
      <span className="block text-7xl sm:text-7xl md:text-8xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tight leading-[1.3]">
        gud
      </span>
      <span className="block text-7xl sm:text-7xl md:text-8xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tight leading-[0.85]">
        for
      </span>
      <span className="block text-7xl sm:text-7xl md:text-8xl xl:text-8xl 2xl:text-9xl font-semibold tracking-tight leading-[0.5]">
        us
      </span>
    </h1>
  );
}

function Strapline(): JSX.Element {
  return (
    <p className="mt-10 text-lg uppercase tracking-widest text-foreground">
      NON-NEGOTIABLES OF HEALTH AND WELLBEING
    </p>
  );
}

function HeroRight(): JSX.Element {
  return (
    <div className="relative">
      <BookCard />
    </div>
  );
}

function BookCard(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleClick = () => setIsOpen((v) => !v);

  return (
    <div className="relative lg:ml-auto max-lg:mx-auto w-full max-w-md aspect-[10.2/16]">
      <GlowFloor />
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={isOpen ? "Close book preview" : "Open book preview"}
        className="relative w-full h-full cursor-pointer rounded-xl bg-background ring-1 ring-foreground shadow-2xl transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 overflow-hidden"
        style={{
          transform: isOpen
            ? ("perspective(1600px) rotateY(-25deg) scale(0.95)" as React.CSSProperties["transform"])
            : ("perspective(1600px) rotateY(0deg) scale(1)" as React.CSSProperties["transform"]),
        }}
      >
        <CoverFront isOpen={isOpen} />
        <PageStack isOpen={isOpen} />
        <NeonOutline isOpen={isOpen} />
      </button>
    </div>
  );
}

function GlowFloor(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-6 -bottom-6 h-24 rounded-full blur-2xl bg-emerald-500/20"
    />
  );
}

type CoverFrontProps = {
  isOpen: boolean;
};

function CoverFront({ isOpen }: CoverFrontProps): JSX.Element {
  const [showFallback, setShowFallback] = useState<boolean>(false);

  return (
    <div
      className="absolute inset-0 rounded-xl overflow-hidden transition-all duration-700 ease-out"
      style={{
        transform: isOpen ? "rotateY(-140deg)" : "rotateY(0deg)",
        transformOrigin: "left center",
      }}
    >
      {!showFallback ? (
        <img
          src="https://opfjwckyarxymdkzuwdk.supabase.co/storage/v1/object/public/envo/temp-gud-for-us.jpeg"
          alt="Good For Us — cover art"
          className="h-full w-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const next = img.nextElementSibling as HTMLElement | null;
            if (next) next.style.display = "flex";
            setShowFallback(true);
          }}
        />
      ) : null}

      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 items-center justify-center text-foreground text-6xl font-bold hidden"
        style={{ display: showFallback ? "flex" : "none" }}
      >
        <div className="text-center">
          <div className="text-7xl font-bold mb-2">gud</div>
          <div className="text-7xl font-bold mb-2">for</div>
          <div className="text-7xl font-bold">us</div>
        </div>
      </div>
    </div>
  );
}

type PageStackProps = {
  isOpen: boolean;
};

function PageStack({ isOpen }: PageStackProps): JSX.Element {
  return (
    <div
      className="absolute inset-0 rounded-xl bg-amber-100/30 transition-opacity duration-700"
      style={{
        opacity: isOpen ? 1 : 0,
      }}
    >
      {/* Book page content — short, elegant, cursive handwriting style */}
      <div className="absolute inset-0 p-12 overflow-auto flex items-start justify-center">
        <div
          style={{
            maxWidth: 540,
            fontFamily: "'Dancing Script', 'Segoe UI', Georgia, serif",
            lineHeight: 1.7,
            color: "#0f172a", // neutral-900
            textAlign: "left",
            transform: "translateY(12%)",
            whiteSpace: "pre-wrap",
          }}
          className="text-sm sm:text-base md:text-lg lg:text-xl"
        >
          <p>
            Microplastics are everywhere — in the seas we love, the air we
            breathe, and the food we eat. Learn how they reach our bodies, what
            they may do, and how small, steady choices can help set us free.
          </p>
        </div>
      </div>
    </div>
  );
}

type NeonOutlineProps = {
  isOpen: boolean;
};

function NeonOutline({ isOpen }: NeonOutlineProps): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="absolute -inset-1 rounded-xl transition-opacity duration-700 blur-xl pointer-events-none"
      style={{
        opacity: isOpen ? 1 : 0.3,
      }}
    />
  );
}
