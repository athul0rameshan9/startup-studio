import type { Metadata } from "next";

import { ServicesEditor } from "@/components/admin/editors/ServicesEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const content = await getContent();
  return <ServicesEditor initial={content.services} />;
}
