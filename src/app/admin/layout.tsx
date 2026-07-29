import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { BrandMark } from "@/components/site/BrandMark";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Startup Studio admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/login?next=/admin");

  return (
    <div className="min-h-screen bg-mist lg:flex">
      <AdminNav>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 px-3 text-[16px] font-extrabold text-white">
            <BrandMark markId="om-mark-admin" size={24} label="Startup Studio" />
            Startup Studio
          </div>
          <div className="flex flex-col gap-2 px-3">
            <span className="truncate text-[12px] text-white/45">
              {session.user}
            </span>
            <LogoutButton />
          </div>
        </div>
      </AdminNav>

      <main className="min-w-0 flex-1 px-6 py-8 lg:px-10 lg:py-10">
        {children}
      </main>
    </div>
  );
}
