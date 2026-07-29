import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

const text = z.string().trim();
const requiredText = z.string().trim().min(1, "This field cannot be empty");
const hexColor = z
  .string()
  .trim()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex colour, e.g. #B8E62A");

/** Accepts an absolute URL, a root-relative path, or an in-page anchor. */
const link = z
  .string()
  .trim()
  .min(1, "A link is required")
  .refine(
    (value) =>
      value.startsWith("#") ||
      value.startsWith("/") ||
      /^(https?:|mailto:|tel:)/i.test(value),
    "Use #anchor, /path, https://…, mailto: or tel:",
  );

const imageSrc = z.string().trim().min(1, "An image path or URL is required");

export const ctaSchema = z.object({
  label: requiredText,
  href: link,
});

export const navLinkSchema = z.object({
  label: requiredText,
  href: link,
});

/* -------------------------------------------------------------------------- */
/*  Appearance                                                                */
/* -------------------------------------------------------------------------- */

export const paletteIdSchema = z.enum(["lime", "sky", "amber", "coral"]);
export const rhythmIdSchema = z.enum(["Airy", "Balanced", "Tight"]);
export const heroLayoutSchema = z.enum(["Centered", "Editorial"]);
export const stackDisplaySchema = z.enum(["Marquee", "Grid"]);

export const settingsSchema = z.object({
  palette: paletteIdSchema,
  rhythm: rhythmIdSchema,
  heroLayout: heroLayoutSchema,
  stackDisplay: stackDisplaySchema,
  marqueeSpeed: z.coerce.number().min(0.4).max(2.5),
});

/* -------------------------------------------------------------------------- */
/*  Sections                                                                  */
/* -------------------------------------------------------------------------- */

export const siteSchema = z.object({
  brandName: requiredText,
  metaTitle: requiredText,
  metaDescription: requiredText,
  navLinks: z.array(navLinkSchema).max(8),
  headerGhostCta: ctaSchema,
  headerPrimaryCta: ctaSchema,
  footerLinks: z.array(navLinkSchema).max(8),
  footerCopyright: requiredText,
});

export const heroSchema = z.object({
  eyebrow: text,
  title: requiredText,
  subtitle: text,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  note: text,
  stats: z
    .array(
      z.object({
        value: requiredText,
        label: requiredText,
      }),
    )
    .max(8),
});

export const trustedBySchema = z.object({
  enabled: z.boolean(),
  label: text,
  note: text,
  logos: z
    .array(
      z.object({
        name: requiredText,
        width: z.coerce.number().int().min(48).max(320),
        image: text,
      }),
    )
    .max(10),
});

export const problemsSchema = z.object({
  eyebrow: text,
  heading: requiredText,
  intro: text,
  items: z
    .array(
      z.object({
        number: requiredText,
        title: requiredText,
        body: requiredText,
      }),
    )
    .max(6),
});

export const servicesSchema = z.object({
  eyebrow: text,
  heading: requiredText,
  intro: text,
  cards: z
    .array(
      z.object({
        icon: imageSrc,
        title: requiredText,
        body: requiredText,
      }),
    )
    .max(6),
  addon: z.object({
    icon: imageSrc,
    eyebrow: text,
    title: requiredText,
    body: requiredText,
  }),
  callout: z.object({
    title: requiredText,
    cta: ctaSchema,
  }),
});

export const stackItemSchema = z.object({
  name: requiredText,
  /** simpleicons slug when `type` is "logo", otherwise the monogram text. */
  mark: requiredText,
  type: z.enum(["logo", "mono"]),
  tint: hexColor,
});

export const stackSchema = z.object({
  eyebrow: text,
  heading: requiredText,
  intro: text,
  rows: z
    .array(
      z.object({
        duration: z.coerce.number().int().min(6).max(120),
        direction: z.enum(["l", "r"]),
        items: z.array(stackItemSchema).max(24),
      }),
    )
    .max(6),
});

export const processSchema = z.object({
  eyebrow: text,
  heading: requiredText,
  steps: z
    .array(
      z.object({
        label: requiredText,
        title: requiredText,
        body: requiredText,
      }),
    )
    .max(8),
});

export const workSchema = z.object({
  eyebrow: text,
  heading: requiredText,
  blocks: z
    .array(
      z.object({
        label: requiredText,
        body: requiredText,
        emphasis: text,
      }),
    )
    .max(6),
  cta: ctaSchema,
  image: z.object({
    src: imageSrc,
    alt: text,
  }),
});

export const whySchema = z.object({
  eyebrow: text,
  heading: requiredText,
  reasons: z
    .array(
      z.object({
        title: requiredText,
        body: requiredText,
      }),
    )
    .max(6),
});

export const teamSchema = z.object({
  eyebrow: text,
  quote: requiredText,
  members: z
    .array(
      z.object({
        name: requiredText,
        role: requiredText,
        photo: imageSrc,
      }),
    )
    .max(6),
});

export const faqSchema = z.object({
  eyebrow: text,
  heading: requiredText,
  items: z
    .array(
      z.object({
        question: requiredText,
        answer: requiredText,
      }),
    )
    .max(20),
});

export const bookingSchema = z.object({
  eyebrow: text,
  heading: requiredText,
  body: text,
  whatsappCta: ctaSchema,
  form: z.object({
    nameLabel: requiredText,
    namePlaceholder: text,
    businessLabel: requiredText,
    businessPlaceholder: text,
    /**
     * Off by default, which keeps the form identical to the reference design.
     * Turn it on to collect an email/phone alongside the enquiry.
     */
    contactEnabled: z.boolean(),
    contactLabel: requiredText,
    contactPlaceholder: text,
    budgetLabel: requiredText,
    budgetOptions: z.array(requiredText).min(1).max(12),
    timelineLabel: requiredText,
    timelineOptions: z.array(requiredText).min(1).max(12),
    messageLabel: requiredText,
    messagePlaceholder: text,
    submitLabel: requiredText,
    note: text,
    successMessage: requiredText,
  }),
});

/* -------------------------------------------------------------------------- */
/*  Document                                                                  */
/* -------------------------------------------------------------------------- */

export const contentSchema = z.object({
  settings: settingsSchema,
  site: siteSchema,
  hero: heroSchema,
  trustedBy: trustedBySchema,
  problems: problemsSchema,
  services: servicesSchema,
  stack: stackSchema,
  process: processSchema,
  work: workSchema,
  why: whySchema,
  team: teamSchema,
  faq: faqSchema,
  booking: bookingSchema,
});

export const SECTION_KEYS = Object.keys(contentSchema.shape) as SectionKey[];

export const sectionSchemas = contentSchema.shape;

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type PaletteId = z.infer<typeof paletteIdSchema>;
export type RhythmId = z.infer<typeof rhythmIdSchema>;
export type HeroLayout = z.infer<typeof heroLayoutSchema>;
export type StackDisplay = z.infer<typeof stackDisplaySchema>;

export type Cta = z.infer<typeof ctaSchema>;
export type NavLink = z.infer<typeof navLinkSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type SiteContent = z.infer<typeof siteSchema>;
export type HeroContent = z.infer<typeof heroSchema>;
export type TrustedByContent = z.infer<typeof trustedBySchema>;
export type ProblemsContent = z.infer<typeof problemsSchema>;
export type ServicesContent = z.infer<typeof servicesSchema>;
export type StackItem = z.infer<typeof stackItemSchema>;
export type StackContent = z.infer<typeof stackSchema>;
export type ProcessContent = z.infer<typeof processSchema>;
export type WorkContent = z.infer<typeof workSchema>;
export type WhyContent = z.infer<typeof whySchema>;
export type TeamContent = z.infer<typeof teamSchema>;
export type FaqContent = z.infer<typeof faqSchema>;
export type BookingContent = z.infer<typeof bookingSchema>;

export type Content = z.infer<typeof contentSchema>;
export type SectionKey = keyof Content;
