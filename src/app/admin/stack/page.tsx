import type { Metadata } from "next";

import { StackEditor } from "@/components/admin/editors/StackEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Tech stack" };

export default async function StackPage() {
  const content = await getContent();
  return <StackEditor initial={content.stack} />;
}
