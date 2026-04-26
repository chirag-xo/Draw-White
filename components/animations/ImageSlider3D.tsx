"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const JELLYFISH_DATA = [
  "https://images.unsplash.com/photo-1583002623348-735951877479?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1516934024742-b461fbc47600?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1454023490224-b8969da29724?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1541414779316-956a5084c0d4?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1533161307525-4521f7871626?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1533038590840-1cde6b66b721?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&auto=format&fit=crop&q=60",
];

interface Slider3DProps {
  /** Array of image URLs to display */
  images?: string[];
  /** Width of each card. Can be px, rem, em, etc. */
  cardWidth?: string;
  /** CSS aspect ratio of the cards */
  cardAspectRatio?: string;
  /** CSS perspective value for the 3D container */
  perspective?: string;
  /** Additional classes for the outermost container */
  containerClassName?: string;
  /** Additional classes for the individual image elements */
  imageClassName?: string;
  /** Whether to auto-rotate */
  autoPlay?: boolean;
  /** Interval for auto-rotation in ms */
  interval?: number;
}

/**
 * ImageSlider3D - A premium 3D cylindrical carousel component.
 * Refactored to use center-anchored spatial logic for a true curved depth effect.
 */
export default function ImageSlider3D({
  images = JELLYFISH_DATA,
  cardWidth = "300px",
  cardAspectRatio = "3/4",
  perspective = "1200px",
  containerClassName = "",
  imageClassName = "",
  autoPlay = true,
  interval = 4000,
}: Slider3DProps) {
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  return (
    <section className={cn("w-full h-full flex items-center justify-center overflow-visible", containerClassName)}>
      {/* STAGE: Establishing the 3D Perspective Context */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          perspective: perspective,
          perspectiveOrigin: "center",
          overflow: "visible" 
        }}
      >
        {/* TRACK: The 3D container that preserves spatial depth */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ 
            transformStyle: "preserve-3d",
            overflow: "visible"
          }}
        >
          {images.map((src, index) => {
            // Calculate relative offset from the center item
            let offset = index - centerIndex;
            
            // Handle circular wrap-around to maintain the cylindrical feel
            const total = images.length;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            // Performance: Only render items in the vicinity of the viewer
            if (Math.abs(offset) > 3) return null;

            return (
              <motion.div
                key={index}
                className="absolute"
                initial={false}
                animate={{
                  rotateY: offset * -25,       // Items curve away from the center
                  x: offset * 220,             // Lateral spacing
                  z: -Math.abs(offset) * 120,   // Items recede into the distance
                  scale: 1 - Math.abs(offset) * 0.1, // Center item is dominant
                  opacity: 1 - Math.abs(offset) * 0.25, // Side items fade into depth
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.32, 0.72, 0, 1]     // Boutique smooth easing
                }}
                style={{
                  width: cardWidth,
                  aspectRatio: cardAspectRatio,
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                  zIndex: 10 - Math.abs(offset) // Ensure center is visually on top
                }}
              >
                <img
                  src={src}
                  alt={`Slide ${index}`}
                  className={cn(
                    "w-full h-full object-cover rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
                    imageClassName
                  )}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
