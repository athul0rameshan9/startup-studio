"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/lib/auth/session";
import { defaultContent } from "@/lib/content/defaults";
import { getContent, saveContent } from "@/lib/content/repository";
import {
  SECTION_KEYS,
  sectionSchemas,
  type Content,
  type SectionKey,
} from "@/lib/content/schema";

export type ActionResult =
  | { ok: true; message: string; data?: unknown }
  | { ok: false; error: string; issues?: string[] };

function isSectionKey(value: string): value is SectionKey {
  return (SECTION_KEYS as string[]).includes(value);
}

function revalidateSite(): void {
  // The public page and its metadata are prerendered, so a content change has
  // to invalidate everything hanging off the root layout.
  revalidatePath("/", "layout");
}

/** Validates and persists a single section of the content document. */
export async function updateSection(
  section: string,
  data: unknown,
): Promise<ActionResult> {
  try {
    await requireSession();
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Not authorised.",
    };
  }

  if (!isSectionKey(section)) {
    return { ok: false, error: `Unknown section "${section}".` };
  }

  const parsed = sectionSchemas[section].safeParse(data);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Some fields need fixing before this can be saved.",
      issues: parsed.error.issues.map((issue) => {
        const path = issue.path.join(" › ");
        return path ? `${path}: ${issue.message}` : issue.message;
      }),
    };
  }

  const content = await getContent();
  await saveContent({
    ...content,
    [section]: parsed.data,
  } as Content);

  revalidateSite();
  return { ok: true, message: "Saved" };
}

/** Restores one section to the seed content shipped with the project. */
export async function resetSection(section: string): Promise<ActionResult> {
  try {
    await requireSession();
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Not authorised.",
    };
  }

  if (!isSectionKey(section)) {
    return { ok: false, error: `Unknown section "${section}".` };
  }

  const content = await getContent();
  await saveContent({
    ...content,
    [section]: defaultContent[section],
  } as Content);

  revalidateSite();
  return {
    ok: true,
    message: "Section reset to the default content",
    data: defaultContent[section],
  };
}
