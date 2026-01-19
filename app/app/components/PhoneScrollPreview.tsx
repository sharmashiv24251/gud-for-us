"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";

export default function PhoneScrollPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Start tracking when section enters viewport from bottom
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 1] : [1.05, 1];
  };

  // Rotation spans first 50% of scroll for smoother, gradual straightening
  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  // Scale also spans first 50%
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());

  return (
    <section className="relative -mt-32 md:-mt-48 z-20" ref={containerRef}>
      {/* Container height for scroll tracking - phone stays at bottom */}
      <div className="h-[50rem] md:h-[70rem] flex items-end justify-center relative px-4 pb-8 md:pb-24">
        <div
          className="sticky bottom-20 md:bottom-24 w-full"
          style={{
            perspective: "1000px",
          }}
        >
          {/* iPhone Card */}
          <motion.div
            style={{
              rotateX: rotate,
              scale,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            className="mx-auto w-[280px] md:w-[260px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-gray-900"
          >
            {/* iPhone Frame - 20:9 aspect ratio */}
            <div className="relative bg-gray-900 rounded-[2.5rem] md:rounded-[3rem] p-[6px] md:p-[8px]">
              {/* Inner black fill to prevent corner artifacts */}
              <div className="absolute inset-[4px] md:inset-[6px] bg-black rounded-[2.3rem] md:rounded-[2.8rem]"></div>

              {/* iPhone outer frame ring */}
              <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] ring-1 ring-white/10"></div>

              {/* Side buttons - Volume */}
              <div className="absolute -left-[3px] top-[100px] w-[3px] h-[40px] bg-gray-800 rounded-l-sm"></div>
              <div className="absolute -left-[3px] top-[150px] w-[3px] h-[40px] bg-gray-800 rounded-l-sm"></div>

              {/* Side button - Power */}
              <div className="absolute -right-[3px] top-[130px] w-[3px] h-[60px] bg-gray-800 rounded-r-sm"></div>

              {/* Screen Container - 20:9 aspect ratio */}
              <div
                className="relative bg-black rounded-[2rem] md:rounded-[2.5rem] overflow-hidden z-10"
                style={{ aspectRatio: "9/20" }}
              >
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[70px] md:w-[85px] h-[22px] md:h-[26px] bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                </div>

                {/* Content - Bread Image */}
                <Image
                  src="/app-images/hero-background.webp"
                  alt="Artisan bread product"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Subtle gradient overlay at top for dynamic island blend */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent z-20 pointer-events-none"></div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[100px] md:w-[120px] h-[4px] md:h-[5px] bg-white/30 rounded-full z-30"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
