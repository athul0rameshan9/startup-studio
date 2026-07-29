import Link from "next/link";
import type { Metadata } from "next";

import { ADMIN_NAV } from "@/lib/admin/nav";
import { getContent, isSeedContent } from "@/lib/content/repository";
import { countLeadsByStatus, listLeads } from "@/lib/leads/repository";
import { PALETTES } from "@/lib/theme";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

function Stat({
  value,
  label,
  href,
}: {
  value: string | number;
  label: string;
  href?: string;
}) {
  const body = (
    <>
      <div className="text-[30px] font-extrabold tracking-[-0.03em] text-ink">
        {value}
      </div>
      <div className="mt-1 text-[13px] text-body">{label}</div>
    </>
  );

  return href ? (
    <Link
      href={href}
      className="rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand-deep"
    >
      {body}
    </Link>
  ) : (
    <div className="rounded-2xl border border-line bg-white p-5">{body}</div>
  );
}

export default async function AdminDashboardPage() {
  const [content, counts, leads, seed] = await Promise.all([
    getContent(),
    countLeadsByStatus(),
    listLeads(),
    isSeedContent(),
  ]);

  const palette = PALETTES[content.settings.palette];
  const latest = leads.slice(0, 5);
  const contentPages = ADMIN_NAV.find(
    (group) => group.title === "Page content",
  )?.items;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-[26px] font-extrabold tracking-[-0.02em]">
            Dashboard
          </h1>
          <p className="m-0 mt-1.5 max-w-[620px] text-[14px] leading-[1.6] text-body">
            Every word, image and colour on the public page is editable from
            here. Changes go live as soon as you save.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-lg border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-brand-deep"
        >
          View site ↗
        </a>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat value={counts.new} label="New enquiries" href="/admin/leads" />
        <Stat
          value={counts.contacted + counts.won}
          label="Contacted or won"
          href="/admin/leads"
        />
        <Stat value={content.faq.items.length} label="FAQ answers" href="/admin/faq" />
        <Stat
          value={content.stack.rows.reduce(
            (total, row) => total + row.items.length,
            0,
          )}
          label="Tools in the stack"
          href="/admin/stack"
        />
      </div>

      {seed ? (
        <section className="rounded-2xl border border-dashed border-rule-soft bg-white p-6">
          <h2 className="m-0 text-[15px] font-bold">
            You&rsquo;re still on the starter content
          </h2>
          <p className="m-0 mt-1.5 max-w-[640px] text-[14px] leading-[1.6] text-body">
            Nothing has been saved yet, so the site is showing the seed copy
            from the original design — including the placeholder client logos
            and the &ldquo;Replace with the real number before launch&rdquo;
            note in Featured work.
          </p>
        </section>
      ) : null}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="m-0 mb-4 text-[15px] font-bold">Latest enquiries</h2>
          {latest.length === 0 ? (
            <p className="m-0 text-[14px] text-muted">
              No enquiries yet. They will appear here the moment someone submits
              the booking form.
            </p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {latest.map((lead) => (
                <li
                  key={lead.id}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-semibold">
                      {lead.name}
                    </div>
                    <div className="truncate text-[13px] text-muted">
                      {lead.message}
                    </div>
                  </div>
                  <span className="shrink-0 text-[12px] text-muted">
                    {formatDate(lead.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/admin/leads"
            className="mt-4 inline-block text-[13px] font-semibold text-brand-deep"
          >
            Open enquiries →
          </Link>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="m-0 mb-4 text-[15px] font-bold">Current look</h2>
          <dl className="m-0 flex flex-col gap-3 text-[14px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-body">Palette</dt>
              <dd className="m-0 flex items-center gap-2 font-semibold">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ background: palette.base }}
                />
                {palette.label}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-body">Rhythm</dt>
              <dd className="m-0 font-semibold">{content.settings.rhythm}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-body">Hero layout</dt>
              <dd className="m-0 font-semibold">
                {content.settings.heroLayout}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-body">Tech stack</dt>
              <dd className="m-0 font-semibold">
                {content.settings.stackDisplay} ·{" "}
                {content.settings.marqueeSpeed.toFixed(1)}×
              </dd>
            </div>
          </dl>
          <Link
            href="/admin/appearance"
            className="mt-4 inline-block text-[13px] font-semibold text-brand-deep"
          >
            Change the look →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="m-0 mb-4 text-[15px] font-bold">Edit a section</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {contentPages?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-line px-3 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-brand-deep"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
