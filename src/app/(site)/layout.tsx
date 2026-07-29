import type { Metadata } from "next";

import { getContent } from "@/lib/content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();

  return {
    title: site.metaTitle,
    description: site.metaDescription,
    openGraph: {
      title: site.metaTitle,
      description: site.metaDescription,
      siteName: site.brandName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.metaTitle,
      description: site.metaDescription,
    },
  };
}

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
