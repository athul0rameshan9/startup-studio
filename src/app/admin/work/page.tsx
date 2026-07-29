import type { Metadata } from "next";

import { WorkEditor } from "@/components/admin/editors/WorkEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Featured work" };

export default async function WorkPage() {
  const content = await getContent();
  return <WorkEditor initial={content.work} />;
}
