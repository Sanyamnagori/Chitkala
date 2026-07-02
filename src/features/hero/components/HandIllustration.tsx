"use client";

import { motion } from "framer-motion";
import {
  FLOWER_ILLUSTRATIONS,
  FLOWER_REVEAL_ORDER,
  type FlowerId,
} from "@/core/constants";

const BASE_LAYERS = [
  {
    id: "hand",
    src: "/images/hand.svg",
    left: "44%",
    top: "54.4%",
    width: "11.7%",
    zIndex: 20,
  },
  {
    id: "fingers",
    src: "/images/fingers.svg",
    left: "45.7%",
    top: "58%",
    width: "8.9%",
    zIndex: 30,
  },
] as const;

type HandIllustrationProps = {
  revealedCount: number;
  onFlowerHover: (id: FlowerId | null) => void;
};

export function HandIllustration({
  revealedCount,
  onFlowerHover,
}: HandIllustrationProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {/* Always visible: hand + fingers only */}
      {BASE_LAYERS.map((layer) => (
        <img
          key={layer.id}
          src={layer.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute h-auto max-w-none"
          style={{
            left: layer.left,
            top: layer.top,
            width: layer.width,
            zIndex: layer.zIndex,
          }}
        />
      ))}

      {/* Flower illustrations — revealed one-by-one on scroll */}
      {FLOWER_REVEAL_ORDER.map((id, index) => {
        const layer = FLOWER_ILLUSTRATIONS[id];
        const revealed = index < revealedCount;

        return (
          <motion.div
            key={id}
            className="absolute cursor-pointer"
            style={{
              left: layer.left,
              top: layer.top,
              width: layer.width,
              zIndex: layer.zIndex,
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={
              revealed
                ? { opacity: 1, scale: 1, pointerEvents: "auto" }
                : { opacity: 0, scale: 0.88, pointerEvents: "none" }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => revealed && onFlowerHover(id)}
            onMouseLeave={() => onFlowerHover(null)}
          >
            <img
              src={layer.src}
              alt=""
              aria-hidden
              className="h-auto w-full max-w-none"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
