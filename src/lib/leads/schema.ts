import { z } from "zod";

export const leadStatusSchema = z.enum(["new", "contacted", "won", "archived"]);

export const LEAD_STATUSES = leadStatusSchema.options;

/** What the public booking form submits. */
export const leadInputSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(120),
  business: z.string().trim().max(200).optional().default(""),
  contact: z.string().trim().max(200).optional().default(""),
  budget: z.string().trim().max(120).optional().default(""),
  timeline: z.string().trim().max(120).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about the problem helps us prepare")
    .max(4000),
});

/** What we store. */
export const leadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  status: leadStatusSchema,
  name: z.string(),
  business: z.string(),
  contact: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string(),
});

export const leadsFileSchema = z.array(leadSchema);

export type LeadStatus = z.infer<typeof leadStatusSchema>;
export type LeadInput = z.infer<typeof leadInputSchema>;
export type Lead = z.infer<typeof leadSchema>;
