"use client";

import React from "react";
import ScorePreview from "@/components/ui/score-preview";

interface ScoreCardProps {
  title: string;
  description: string;
  icon: "health" | "compatibility" | "environment";
  score: number;
  className?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  description,
  icon,
  score,
  className = "",
}) => {
  return (
    <div
      className={`group bg-white rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}
      style={{
        boxShadow:
          "0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Inner App UI Preview */}
      <div className="mb-6">
        <ScorePreview
          title={title}
          score={score}
          icon={icon}
          animateOnMount={true}
          clean={true}
        />
      </div>

      {/* Card Description */}
      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ScoreCard;
