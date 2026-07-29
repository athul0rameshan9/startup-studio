import type { Metadata } from "next";

import { HeroEditor } from "@/components/admin/editors/HeroEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Hero" };

export default async function HeroPage() {
  const content = await getContent();
  return <HeroEditor initial={content.hero} />;
}
