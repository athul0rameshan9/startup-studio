import type { Metadata } from "next";

import { BookingEditor } from "@/components/admin/editors/BookingEditor";
import { getContent } from "@/lib/content/repository";

export const metadata: Metadata = { title: "Booking form" };

export default async function BookingPage() {
  const content = await getContent();
  return <BookingEditor initial={content.booking} />;
}
