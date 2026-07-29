import type { Metadata } from "next";

import { ProcessEditor } from "@/components/admin/editors/ProcessEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Process" };

export default async function ProcessPage() {
  const content = await getContent();
  return <ProcessEditor initial={content.process} />;
}
