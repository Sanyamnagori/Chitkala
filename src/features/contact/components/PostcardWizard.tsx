"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { WIZARD_STEPS } from "@/core/constants";
import { ZodError } from "zod";
import { SERVICE_OPTIONS, stepSchemas } from "@/features/contact/validations";
import { ProgressStepper } from "./ProgressStepper";

type FormData = {
  name: string;
  organization: string;
  email: string;
  services: string[];
  notes: string;
};

const initialData: FormData = {
  name: "",
  organization: "",
  email: "",
  services: [],
  notes: "",
};

export function PostcardWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = WIZARD_STEPS[step];

  const validateStep = () => {
    setError(null);
    try {
      switch (current.key) {
        case "name":
          stepSchemas.name.parse({ name: formData.name });
          break;
        case "organization":
          stepSchemas.organization.parse({ organization: formData.organization });
          break;
        case "contact":
          stepSchemas.contact.parse({ email: formData.email });
          break;
        case "services":
          stepSchemas.services.parse({ services: formData.services });
          break;
        case "notes":
          stepSchemas.notes.parse({ notes: formData.notes });
          break;
      }
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0]?.message ?? "Please check your input");
      } else {
        setError("Please check your input");
      }
      return false;
    }
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < WIZARD_STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.organization || undefined,
          email: formData.email,
          services: formData.services,
          notes: formData.notes || undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="font-[family-name:var(--font-cabinet)] text-4xl font-medium text-white md:text-5xl">
          Your postcard is on its way. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[650px]">
      <div className="relative aspect-[1100/700] w-full overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.postcard}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.postcard}
              alt=""
              fill
              className="object-cover"
              sizes="1100px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute inset-0 flex flex-col pr-[8%] pl-[55%] pt-[36%]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-xs"
            >
              <p className="font-[family-name:var(--font-poppins)] text-[13px] leading-tight text-deep-red md:text-[14px]">
                {current.prompt}
              </p>

              {current.key === "services" ? (
                <div className="mt-1 flex flex-col gap-0">
                  {SERVICE_OPTIONS.map((service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-center gap-1.5 font-[family-name:var(--font-poppins)] text-[11px] leading-tight text-deep-red md:text-[12px]"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-2.5 w-2.5 accent-deep-red"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              ) : current.key === "notes" ? (
                <div className="mt-1">
                  <label className="font-[family-name:var(--font-poppins)] text-[12px] text-deep-red md:text-[13px]">
                    {current.fieldLabel}
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder={current.placeholder}
                    rows={2}
                    className="mt-0.5 w-full resize-none border-b border-deep-red/40 bg-transparent font-[family-name:var(--font-poppins)] text-[12px] text-deep-red/80 outline-none placeholder:text-deep-red/30 md:text-[13px]"
                  />
                </div>
              ) : (
                <div className="mt-1">
                  <label className="font-[family-name:var(--font-poppins)] text-[12px] text-deep-red md:text-[13px]">
                    {current.fieldLabel}
                  </label>
                  <input
                    type={current.field === "email" ? "email" : "text"}
                    value={formData[current.field as keyof typeof formData] as string}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [current.field]: e.target.value,
                      }))
                    }
                    placeholder={current.placeholder}
                    className="mt-0.5 w-full border-b border-deep-red bg-transparent font-[family-name:var(--font-poppins)] text-[12px] text-deep-red/80 outline-none placeholder:text-deep-red/30 md:text-[13px]"
                  />
                </div>
              )}

              {error && (
                <p className="mt-0.5 font-[family-name:var(--font-poppins)] text-[10px] text-white">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                className="mt-2 self-start font-[family-name:var(--font-poppins)] text-[12px] text-deep-red transition-opacity hover:opacity-80 disabled:opacity-50 md:text-[13px]"
              >
                {step === WIZARD_STEPS.length - 1
                  ? submitting
                    ? "Sending..."
                    : "Send postcard >>>"
                  : "Next >>>"}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ProgressStepper activeStep={step} />
    </div>
  );
}
