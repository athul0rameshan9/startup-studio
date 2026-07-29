import type { Metadata } from "next";

import { TrustedByEditor } from "@/components/admin/editors/TrustedByEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Trusted by" };

export default async function TrustedByPage() {
  const content = await getContent();
  return <TrustedByEditor initial={content.trustedBy} />;
}
