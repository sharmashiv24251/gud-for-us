"use client";
import React, { useState } from "react";
import type { JSX } from "react";

export default function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 md:pt-20 md:pb-28">
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
      className="leading-none text-white"
      style={{
        fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
        letterSpacing: "-0.02em",
      }}
    >
      <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight">
        gud
      </span>
      <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight">
        for
      </span>
      <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight">
        us
      </span>
    </h1>
  );
}

function Strapline(): JSX.Element {
  return (
    <p className="mt-6 text-xs uppercase tracking-widest text-neutral-300">
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
    <div className="relative mx-auto w-full max-w-md h-[560px]">
      <GlowFloor />
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={isOpen ? "Close book preview" : "Open book preview"}
        className="relative w-full h-full cursor-pointer rounded-xl bg-neutral-900 ring-1 ring-white/10 shadow-2xl transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 overflow-hidden"
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
        className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 items-center justify-center text-white text-6xl font-bold hidden"
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
      className="absolute inset-0 rounded-xl bg-amber-100/90 transition-opacity duration-700"
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
            fontSize: 20,
            lineHeight: 1.7,
            color: "#0f172a", // neutral-900
            textAlign: "left",
            transform: "translateY(12%)",
            whiteSpace: "pre-wrap",
          }}
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
