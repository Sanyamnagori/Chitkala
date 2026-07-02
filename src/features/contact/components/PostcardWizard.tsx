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
    <div className="mx-auto w-full max-w-[1100px]">
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
          className={`absolute inset-0 flex flex-col justify-end p-[8%] pl-[56%] ${
            step >= 3 ? "pb-[4%]" : "pb-[12%]"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="max-w-md"
            >
              <p className="font-[family-name:var(--font-poppins)] text-xl text-deep-red md:text-2xl">
                {current.prompt}
              </p>

              {current.key === "services" ? (
                <div className="mt-3 space-y-1">
                  {SERVICE_OPTIONS.map((service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-center gap-3 font-[family-name:var(--font-poppins)] text-base text-deep-red"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-4 w-4 accent-deep-red"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              ) : current.key === "notes" ? (
                <div className="mt-6">
                  <label className="font-[family-name:var(--font-poppins)] text-lg text-deep-red">
                    {current.fieldLabel}
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder={current.placeholder}
                    rows={4}
                    className="mt-2 w-full resize-none border-b border-deep-red/40 bg-transparent font-[family-name:var(--font-poppins)] text-lg text-deep-red/70 outline-none placeholder:text-deep-red/30"
                  />
                </div>
              ) : (
                <div className="mt-8">
                  <label className="font-[family-name:var(--font-poppins)] text-lg text-deep-red">
                    {current.fieldLabel}
                  </label>
                  <input
                    type={current.field === "email" ? "email" : "text"}
                    value={formData[current.field]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [current.field]: e.target.value,
                      }))
                    }
                    placeholder={current.placeholder}
                    className="mt-2 w-full border-b border-deep-red bg-transparent font-[family-name:var(--font-poppins)] text-lg text-deep-red/50 outline-none placeholder:text-deep-red/30"
                  />
                </div>
              )}

              {error && (
                <p className="mt-3 font-[family-name:var(--font-poppins)] text-sm text-white">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                className="mt-6 font-[family-name:var(--font-poppins)] text-xl text-deep-red transition-opacity hover:opacity-80 disabled:opacity-50"
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
