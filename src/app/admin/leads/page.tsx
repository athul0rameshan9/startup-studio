import type { Metadata } from "next";

import { LeadsTable } from "@/components/admin/LeadsTable";
import { listLeads } from "@/lib/leads/repository";

export const metadata: Metadata = { title: "Enquiries" };

export default async function LeadsPage() {
  const leads = await listLeads();

  return (
    <div>
      <header className="mb-8">
        <h1 className="m-0 text-[26px] font-extrabold tracking-[-0.02em]">
          Enquiries
        </h1>
        <p className="m-0 mt-1.5 max-w-[620px] text-[14px] leading-[1.6] text-body">
          Everything submitted through the booking form, newest first.
        </p>
      </header>

      <LeadsTable leads={leads} />
    </div>
  );
}
