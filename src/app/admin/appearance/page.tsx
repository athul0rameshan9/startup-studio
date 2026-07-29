import type { Metadata } from "next";

import { AppearanceEditor } from "@/components/admin/editors/AppearanceEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Appearance" };

export default async function AppearancePage() {
  const content = await getContent();
  return <AppearanceEditor initial={content.settings} />;
}
