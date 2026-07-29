import "server-only";

import { defaultContent } from "@/lib/content/defaults";
import { contentSchema, type Content } from "@/lib/content/schema";
import { readJson, writeJson } from "@/lib/storage/json-store";

const CONTENT_FILE = "content.json";

/**
 * Stored content is merged over the defaults one section at a time. That way a
 * newly added section keeps working against an older `content.json` instead of
 * failing validation and wiping the site.
 */
function withDefaults(stored: unknown): Content {
  if (!stored || typeof stored !== "object") return defaultContent;

  const merged = { ...defaultContent } as Record<string, unknown>;
  for (const [key, value] of Object.entries(stored as Record<string, unknown>)) {
    if (key in defaultContent && value !== undefined) merged[key] = value;
  }

  const parsed = contentSchema.safeParse(merged);
  if (parsed.success) return parsed.data;

  console.error(
    "[content] Stored content failed validation, falling back to defaults:",
    parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
  );
  return defaultContent;
}

/** Reads the full content document, falling back to the seed content. */
export async function getContent(): Promise<Content> {
  return withDefaults(await readJson<unknown>(CONTENT_FILE));
}

/** Persists the full content document. */
export async function saveContent(content: Content): Promise<void> {
  await writeJson(CONTENT_FILE, content);
}

/** Returns whether the site is still running on unedited seed content. */
export async function isSeedContent(): Promise<boolean> {
  return (await readJson<unknown>(CONTENT_FILE)) === null;
}
