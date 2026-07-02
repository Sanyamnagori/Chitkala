import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Brand Identity",
  "Print Design",
  "Illustration",
  "Digital & Motion",
  "Website Design & Development",
  "Brand/Design Consultation",
] as const;

export const contactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  organization: z.string().max(200).optional(),
  email: z.string().email("Enter a valid email address"),
  services: z
    .array(z.enum(SERVICE_OPTIONS))
    .min(1, "Select at least one service"),
  notes: z.string().max(5000).optional(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export const stepSchemas = {
  name: z.object({
    name: z.string().min(1, "Please enter your name").max(200),
  }),
  organization: z.object({
    organization: z.string().max(200).optional(),
  }),
  contact: z.object({
    email: z.string().email("Please enter a valid email"),
  }),
  services: z.object({
    services: z.array(z.enum(SERVICE_OPTIONS)).min(1, "Select at least one service"),
  }),
  notes: z.object({
    notes: z.string().max(5000).optional(),
  }),
};
