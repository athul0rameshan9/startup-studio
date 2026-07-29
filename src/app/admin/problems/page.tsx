import type { Metadata } from "next";

import { ProblemsEditor } from "@/components/admin/editors/ProblemsEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Problems" };

export default async function ProblemsPage() {
  const content = await getContent();
  return <ProblemsEditor initial={content.problems} />;
}
