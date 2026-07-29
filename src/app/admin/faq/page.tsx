import type { Metadata } from "next";

import { FaqEditor } from "@/components/admin/editors/FaqEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "FAQ" };

export default async function FaqPage() {
  const content = await getContent();
  return <FaqEditor initial={content.faq} />;
}
