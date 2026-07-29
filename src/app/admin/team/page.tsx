import type { Metadata } from "next";

import { TeamEditor } from "@/components/admin/editors/TeamEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Team" };

export default async function TeamPage() {
  const content = await getContent();
  return <TeamEditor initial={content.team} />;
}
