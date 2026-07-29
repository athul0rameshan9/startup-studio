import type { Metadata } from "next";

import { WhyEditor } from "@/components/admin/editors/WhyEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Why us" };

export default async function WhyPage() {
  const content = await getContent();
  return <WhyEditor initial={content.why} />;
}
