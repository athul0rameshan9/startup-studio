import type { Metadata } from "next";

import { BrandEditor } from "@/components/admin/editors/BrandEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Brand & navigation" };

export default async function BrandPage() {
  const content = await getContent();
  return <BrandEditor initial={content.site} />;
}
