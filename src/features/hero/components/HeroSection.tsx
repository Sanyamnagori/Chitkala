"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  DECORATIVE_FACES,
  FLOWER_REVEAL_ORDER,
  FLOWERS,
  type FlowerId,
} from "@/core/constants";
import { DecorativeFace } from "./DecorativeFace";
import { FlowerCard } from "./FlowerCard";
import { HandIllustration } from "./HandIllustration";
import { Header } from "@/core/components/Header";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [hoveredFlower, setHoveredFlower] = useState<FlowerId | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = scrolled / scrollable;
      
      // Multiply progress by 1.15 so we hit 1.0 earlier. 
      // This gives a 15% "buffer" at the end of the scroll where all flowers are visible 
      // BEFORE the page starts transitioning to the next section.
      const adjustedProgress = Math.min(progress * 1.15, 1);
      
      const count = Math.min(
        FLOWER_REVEAL_ORDER.length,
        Math.max(0, Math.floor((adjustedProgress + 0.001) * FLOWER_REVEAL_ORDER.length)),
      );
      setRevealedCount(count);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (hoveredFlower === null) return;
    const index = FLOWER_REVEAL_ORDER.indexOf(hoveredFlower);
    if (index >= revealedCount) setHoveredFlower(null);
  }, [revealedCount, hoveredFlower]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[250vh] bg-vermillion"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Header variant="hero" />
        <div className="relative mx-auto h-full w-full max-w-[1920px]">
          <HandIllustration
            revealedCount={revealedCount}
            onFlowerHover={setHoveredFlower}
          />

          {/* Photo cards — only on hover over the matching illustration */}
          {FLOWER_REVEAL_ORDER.map((id) => (
            <FlowerCard
              key={id}
              {...FLOWERS[id]}
              visible={hoveredFlower === id}
            />
          ))}

          {DECORATIVE_FACES.map((face) => (
            <DecorativeFace key={face.id} {...face} />
          ))}

          <motion.h1
            className="absolute left-[14.1%] top-[83.9%] whitespace-nowrap font-[family-name:var(--font-cabinet)] text-[clamp(2.5rem,6.25vw,7.5rem)] font-medium leading-none text-highlight-wash"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
          >
            Branding, Design & Motion
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
