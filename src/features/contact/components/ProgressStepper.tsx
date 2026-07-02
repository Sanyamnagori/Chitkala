"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WIZARD_STEPS } from "@/core/constants";

export function ProgressStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-8">
      {/* Progressive landscape illustration: Swan → Tree → House → Mountains → Sun */}
      <div className="flex items-end justify-center gap-1 md:gap-3">
        {WIZARD_STEPS.map((step, index) => {
          const revealed = index <= activeStep;
          return (
            <motion.div
              key={step.key}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 16, scale: 0.6 }}
              animate={{
                opacity: revealed ? 1 : 0,
                y: revealed ? 0 : 16,
                scale: revealed ? 1 : 0.6,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: revealed ? index * 0.08 : 0,
              }}
            >
              <div className="relative h-12 w-12 md:h-14 md:w-14">
                <Image
                  src={step.icon}
                  alt={step.illustration}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="mt-1 hidden font-[family-name:var(--font-poppins)] text-xs text-white/80 md:block">
                {step.illustration}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        {WIZARD_STEPS.map((step, index) => (
          <div key={step.key} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <motion.span
                className="block h-5 w-5 rounded-full border-2 border-white"
                animate={{
                  backgroundColor:
                    index <= activeStep ? "#A71714" : "transparent",
                  borderColor: index <= activeStep ? "#A71714" : "#FFFFFF",
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="font-[family-name:var(--font-poppins)] text-sm text-white">
                {step.label}
              </span>
            </div>
            {index < WIZARD_STEPS.length - 1 && (
              <motion.span
                className="mb-6 hidden h-0.5 w-6 bg-white/40 sm:block md:w-10"
                animate={{
                  scaleX: index < activeStep ? 1 : 0.4,
                  backgroundColor:
                    index < activeStep ? "#A71714" : "rgba(255,255,255,0.4)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
