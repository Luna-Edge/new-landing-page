import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  request: z.string().trim().min(1, "Request is required"),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
