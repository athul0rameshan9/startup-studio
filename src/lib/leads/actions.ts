"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { requireSession } from "@/lib/auth/session";
import { clientKey, rateLimit } from "@/lib/auth/rate-limit";
import type { EnquiryState } from "@/lib/leads/form-state";
import {
  createLead,
  deleteLead,
  setLeadStatus,
} from "@/lib/leads/repository";
import { leadInputSchema, leadStatusSchema } from "@/lib/leads/schema";

/** Public booking form. Unauthenticated by design — rate limited instead. */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: real people never see this field.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: "", fieldErrors: {} };
  }

  const limit = rateLimit(clientKey(await headers(), "enquiry"), 5, 60 * 10);
  if (!limit.ok) {
    return {
      status: "error",
      message: "That's a few too many enquiries. Try again shortly.",
      fieldErrors: {},
    };
  }

  const parsed = leadInputSchema.safeParse({
    name: formData.get("name") ?? "",
    business: formData.get("business") ?? "",
    contact: formData.get("contact") ?? "",
    budget: formData.get("budget") ?? "",
    timeline: formData.get("timeline") ?? "",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    await createLead(parsed.data);
  } catch (error) {
    console.error("[leads] Failed to store enquiry:", error);
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin/leads");
  return { status: "success", message: "", fieldErrors: {} };
}

/* ------------------------------- admin only ------------------------------ */

export async function updateLeadStatus(
  id: string,
  status: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireSession();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Not authorised." };
  }

  const parsed = leadStatusSchema.safeParse(status);
  if (!parsed.success) return { ok: false, error: "Unknown status." };

  const updated = await setLeadStatus(id, parsed.data);
  if (!updated) return { ok: false, error: "That enquiry no longer exists." };

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { ok: true };
}

export async function removeLead(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireSession();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Not authorised." };
  }

  const deleted = await deleteLead(id);
  if (!deleted) return { ok: false, error: "That enquiry no longer exists." };

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { ok: true };
}
