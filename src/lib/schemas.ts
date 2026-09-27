import { z } from "zod";

// Page a form was submitted from (lead source tracking). Only a same-site path is accepted.
const sourcePath = z
  .string()
  .trim()
  .max(200)
  .regex(/^\/[\w\-/]*$/)
  .optional()
  .or(z.literal(""));

export const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+()\d\s.-]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  equipment_type: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(3000, "Message is too long").optional().or(z.literal("")),
  // Honeypot — must stay empty
  company_website: z.string().max(0).optional().or(z.literal("")),
  source_path: sourcePath,
});
export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(200),
  source_path: sourcePath,
});
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const postCreateSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().regex(slugRegex, "slug must be kebab-case").max(200).optional(),
  excerpt: z.string().trim().max(500).nullable().optional(),
  content: z.string().nullable().optional(),
  cover_image_url: z.string().trim().max(1000).nullable().optional(),
  published_at: z.string().datetime().optional(),
  category: z.string().trim().max(60).optional(),
  author: z.string().trim().max(120).optional(),
  read_time: z.number().int().min(1).max(120).optional(),
  meta_description: z.string().trim().max(320).nullable().optional(),
  is_published: z.boolean().optional(),
});
export type PostCreateInput = z.infer<typeof postCreateSchema>;

export const postUpdateSchema = postCreateSchema.partial().refine((v) => Object.keys(v).length > 0, {
  message: "Provide at least one field to update",
});
export type PostUpdateInput = z.infer<typeof postUpdateSchema>;
