"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WIZARD_STEPS } from "@/core/constants";

export function ProgressStepper({
  activeStep,
  highestStep,
  onStepClick,
}: {
  activeStep: number;
  highestStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="mt-4 flex flex-col items-center gap-0">
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        {WIZARD_STEPS.map((step, index) => {
          const isClickable = index <= highestStep;
          return (
            <div key={step.key} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                className={`flex flex-col items-center gap-2 outline-none ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                }`}
                disabled={!isClickable}
              >
                <motion.span
                  className="block h-5 w-5 rounded-full border-2 border-white"
                  animate={{
                    backgroundColor: index <= activeStep ? "#A71714" : "transparent",
                    borderColor: index <= activeStep ? "#A71714" : "#FFFFFF",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span className="font-[family-name:var(--font-poppins)] text-sm text-white">
                  {step.label}
                </span>
              </button>
              {index < WIZARD_STEPS.length - 1 && (
                <motion.span
                  className="mb-6 hidden h-0.5 w-6 bg-white/40 sm:block md:w-10"
                  animate={{
                    scaleX: index < activeStep ? 1 : 0.4,
                    backgroundColor: index < activeStep ? "#A71714" : "rgba(255,255,255,0.4)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
