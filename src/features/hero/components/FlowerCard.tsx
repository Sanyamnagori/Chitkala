"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type FlowerCardProps = {
  name: string;
  image: string;
  ticket: string;
  left: string;
  top: string;
  width: string;
  height: string;
  labelLeft: string;
  labelTop: string;
  ticketLeft: string;
  ticketTop: string;
  visible: boolean;
};

export function FlowerCard({
  name,
  image,
  ticket,
  left,
  top,
  width,
  height,
  labelLeft,
  labelTop,
  ticketLeft,
  ticketTop,
  visible,
}: FlowerCardProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute overflow-hidden rounded-sm"
            style={{
              left: `clamp(calc(50% - 50vw + 20px), ${left}, calc(50% + 50vw - ${width} - 20px))`,
              top,
              width,
              height,
            }}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1.06 }}
            exit={{ scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>
          </motion.div>

          <span
            className="absolute whitespace-nowrap font-[family-name:var(--font-cabinet)] text-lg font-medium text-deep-red"
            style={{
              left: `clamp(calc(50% - 50vw + 40px), ${labelLeft}, calc(50% + 50vw - 100px))`,
              top: labelTop,
              transform: "translate(-30%, -120%)",
            }}
          >
            {name}
          </span>

          <p
            className="absolute max-w-[190px] font-[family-name:var(--font-cabinet)] text-lg font-medium leading-snug text-white"
            style={{
              left: `clamp(calc(50% - 50vw + 20px), ${ticketLeft}, calc(50% + 50vw - 190px - 20px))`,
              top: ticketTop,
            }}
          >
            &ldquo;{ticket}&rdquo;
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
