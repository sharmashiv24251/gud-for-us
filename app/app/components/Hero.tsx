"use client";

import { RotatingText } from "@/components/ui/rotating-text";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-48 md:pb-64 bg-[#4a6c48]" id="get-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-[#FDD835] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                AI-Powered Consumption Intelligence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white mb-8 leading-tight">
              Know what you
              <br />
              <span className="inline-flex items-baseline gap-2">
                <span className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-white">
                  really{" "}
                </span>
                <RotatingText
                  text={["consume", "buy"]}
                  duration={2000}
                  className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-[#FDD835] italic"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-xl text-green-50 font-light leading-relaxed">
              Decode labels instantly. From ingredient quality to environmental
              impact, GudForUs gives you the clarity to make better choices for
              your body and the planet.
            </p>

            {/* App Store Buttons */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center md:items-start">
                <a
                  className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-xl min-w-[180px]"
                  href="#"
                >
                  <span className="material-icons-round text-xl">apple</span>
                  <span>App Store</span>
                </a>
                <a
                  className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 border border-transparent px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-lg min-w-[180px]"
                  href="#"
                >
                  <span className="material-icons-round text-xl text-[#2E7D32]">
                    android
                  </span>
                  <span>Google Play</span>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 flex justify-center md:justify-start gap-6 text-sm text-green-100 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300"></span>{" "}
                  10M+ Products
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300"></span>{" "}
                  Science-Backed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300"></span>{" "}
                  100% Private
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md rounded-lg overflow-hidden">
              <video
                src="https://ihichdejyaeignzbnfgb.supabase.co/storage/v1/object/public/website-assets/hero-vid.mov"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
