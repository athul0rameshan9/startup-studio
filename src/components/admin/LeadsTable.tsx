"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { removeLead, updateLeadStatus } from "@/lib/leads/actions";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/leads/schema";
import { cn, formatDate } from "@/lib/utils";

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  won: "Won",
  archived: "Archived",
};

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "border-brand-deep/30 bg-brand/20 text-ink",
  contacted: "border-line bg-white text-body",
  won: "border-brand-deep/40 bg-brand-deep/12 text-brand-deep",
  archived: "border-line bg-mist text-muted",
};

function toCsv(leads: Lead[]): string {
  const header = [
    "Received",
    "Status",
    "Name",
    "Business",
    "Contact",
    "Budget",
    "Timeline",
    "Message",
  ];
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;

  const rows = leads.map((lead) =>
    [
      lead.createdAt,
      lead.status,
      lead.name,
      lead.business,
      lead.contact,
      lead.budget,
      lead.timeline,
      lead.message,
    ]
      .map((cell) => escape(String(cell ?? "")))
      .join(","),
  );

  return [header.join(","), ...rows].join("\n");
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const visible = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => l.status === filter)),
    [filter, leads],
  );

  function changeStatus(id: string, status: LeadStatus) {
    setError(null);
    startTransition(async () => {
      const result = await updateLeadStatus(id, status);
      if (!result.ok) setError(result.error ?? "Could not update that enquiry.");
      else router.refresh();
    });
  }

  function remove(lead: Lead) {
    if (!window.confirm(`Delete the enquiry from ${lead.name}? This cannot be undone.`)) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await removeLead(lead.id);
      if (!result.ok) setError(result.error ?? "Could not delete that enquiry.");
      else router.refresh();
    });
  }

  function exportCsv() {
    const blob = new Blob([toCsv(visible)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", ...LEAD_STATUSES] as const).map((option) => {
          const count =
            option === "all"
              ? leads.length
              : leads.filter((lead) => lead.status === option).length;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors",
                filter === option
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-body hover:border-rule-soft",
              )}
            >
              {option === "all" ? "All" : STATUS_LABEL[option]} ({count})
            </button>
          );
        })}

        <button
          type="button"
          onClick={exportCsv}
          disabled={visible.length === 0}
          className="ml-auto cursor-pointer rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-brand-deep disabled:opacity-50"
        >
          Export CSV
        </button>
      </div>

      {error ? (
        <p
          role="alert"
          className="m-0 rounded-lg border border-[#C4381A]/30 bg-[#C4381A]/8 px-4 py-3 text-[13px] font-medium text-[#C4381A]"
        >
          {error}
        </p>
      ) : null}

      {visible.length === 0 ? (
        <p className="m-0 rounded-2xl border border-dashed border-rule-soft bg-white px-6 py-16 text-center text-[14px] text-muted">
          No enquiries here yet. Submissions from the booking form land on this
          page.
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {visible.map((lead) => (
            <li
              key={lead.id}
              className={cn(
                "rounded-2xl border border-line bg-white p-5 transition-opacity",
                pending && "opacity-70",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="m-0 text-[17px] font-bold tracking-[-0.01em]">
                      {lead.name}
                    </h2>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] uppercase",
                        STATUS_STYLE[lead.status],
                      )}
                    >
                      {STATUS_LABEL[lead.status]}
                    </span>
                  </div>
                  <p className="m-0 mt-1 text-[13px] text-muted">
                    {formatDate(lead.createdAt)}
                    {lead.business ? ` · ${lead.business}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="sr-only" htmlFor={`status-${lead.id}`}>
                    Status for {lead.name}
                  </label>
                  <select
                    id={`status-${lead.id}`}
                    value={lead.status}
                    disabled={pending}
                    onChange={(event) =>
                      changeStatus(lead.id, event.target.value as LeadStatus)
                    }
                    className="cursor-pointer rounded-lg border border-line bg-white px-3 py-2 font-sans text-[13px] text-ink"
                  >
                    {LEAD_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {STATUS_LABEL[status]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => remove(lead)}
                    disabled={pending}
                    className="cursor-pointer rounded-lg border border-line bg-white px-3 py-2 text-[13px] font-semibold text-body transition-colors hover:border-[#C4381A] hover:text-[#C4381A] disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-3">
                {lead.contact ? (
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                      Contact
                    </dt>
                    <dd className="m-0 text-[14px]">{lead.contact}</dd>
                  </div>
                ) : null}
                {lead.budget ? (
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                      Budget
                    </dt>
                    <dd className="m-0 text-[14px]">{lead.budget}</dd>
                  </div>
                ) : null}
                {lead.timeline ? (
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                      Timeline
                    </dt>
                    <dd className="m-0 text-[14px]">{lead.timeline}</dd>
                  </div>
                ) : null}
              </dl>

              <p className="m-0 mt-4 border-t border-line pt-4 text-[15px] leading-[1.65] whitespace-pre-wrap text-body">
                {lead.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
