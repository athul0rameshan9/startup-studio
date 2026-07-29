"use client";

import { useActionState, useId } from "react";

import type { BookingContent } from "@/lib/content/schema";
import { submitEnquiry } from "@/lib/leads/actions";
import { emptyEnquiryState } from "@/lib/leads/form-state";

const fieldClass =
  "rounded-xl border border-rule bg-mist px-3.5 py-[13px] font-sans text-[15px] text-ink";
const labelClass = "text-[14px] font-semibold";
const errorClass = "text-[13px] font-medium text-[#C4381A]";

export function BookCall({ booking }: { booking: BookingContent }) {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    emptyEnquiryState,
  );
  const uid = useId();
  const form = booking.form;

  return (
    <section
      id="book"
      className="scroll-mt-24 bg-ink px-6 py-[var(--om-pad,96px)] text-white lg:px-8"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          {booking.eyebrow ? (
            <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-lime)]">
              {booking.eyebrow}
            </div>
          ) : null}

          <h2 className="m-0 mb-[22px] text-[30px] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance sm:text-[34px] lg:text-[40px]">
            {booking.heading}
          </h2>

          {booking.body ? (
            <p className="m-0 mb-7 text-[17px] leading-[1.65] text-white/68">
              {booking.body}
            </p>
          ) : null}

          <a
            id="whatsapp"
            href={booking.whatsappCta.href}
            className="inline-flex scroll-mt-24 items-center gap-2.5 rounded-full border border-white/24 px-6 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-white/8 hover:text-white"
          >
            <span className="block h-2 w-2 flex-none rounded-full bg-[#DCF58A]" />
            {booking.whatsappCta.label}
          </a>
        </div>

        <div className="rounded-3xl bg-white p-9 text-ink">
          {state.status === "success" ? (
            <div className="flex min-h-[280px] flex-col items-start justify-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--om-lime)] text-ink">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12.5 L9.5 18 L20 7" />
                </svg>
              </span>
              <p className="m-0 max-w-[420px] text-[19px] leading-[1.5] font-bold tracking-[-0.02em]">
                {form.successMessage}
              </p>
            </div>
          ) : (
            <form action={formAction} noValidate>
              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${uid}-name`} className={labelClass}>
                    {form.nameLabel}
                  </label>
                  <input
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    required
                    placeholder={form.namePlaceholder}
                    aria-invalid={Boolean(state.fieldErrors.name)}
                    className={fieldClass}
                  />
                  {state.fieldErrors.name ? (
                    <span className={errorClass}>{state.fieldErrors.name}</span>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={`${uid}-business`} className={labelClass}>
                    {form.businessLabel}
                  </label>
                  <input
                    id={`${uid}-business`}
                    name="business"
                    type="text"
                    placeholder={form.businessPlaceholder}
                    className={fieldClass}
                  />
                </div>

                {form.contactEnabled ? (
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label htmlFor={`${uid}-contact`} className={labelClass}>
                      {form.contactLabel}
                    </label>
                    <input
                      id={`${uid}-contact`}
                      name="contact"
                      type="text"
                      placeholder={form.contactPlaceholder}
                      className={fieldClass}
                    />
                  </div>
                ) : null}

                <div className="flex flex-col gap-2">
                  <label htmlFor={`${uid}-budget`} className={labelClass}>
                    {form.budgetLabel}
                  </label>
                  <select
                    id={`${uid}-budget`}
                    name="budget"
                    defaultValue={form.budgetOptions[0]}
                    className={fieldClass}
                  >
                    {form.budgetOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={`${uid}-timeline`} className={labelClass}>
                    {form.timelineLabel}
                  </label>
                  <select
                    id={`${uid}-timeline`}
                    name="timeline"
                    defaultValue={form.timelineOptions[0]}
                    className={fieldClass}
                  >
                    {form.timelineOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor={`${uid}-message`} className={labelClass}>
                    {form.messageLabel}
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    rows={3}
                    required
                    placeholder={form.messagePlaceholder}
                    aria-invalid={Boolean(state.fieldErrors.message)}
                    className={`${fieldClass} resize-y`}
                  />
                  {state.fieldErrors.message ? (
                    <span className={errorClass}>
                      {state.fieldErrors.message}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Honeypot — hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="hidden">
                <label htmlFor={`${uid}-website`}>Website</label>
                <input
                  id={`${uid}-website`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-[18px]">
                <button
                  type="submit"
                  disabled={pending}
                  className="cursor-pointer rounded-full border-none bg-[var(--om-lime)] px-7 py-[15px] font-sans text-[16px] font-bold text-ink transition-colors hover:bg-[var(--om-lime-hi)] disabled:cursor-progress disabled:opacity-70"
                >
                  {pending ? "Sending…" : form.submitLabel}
                </button>
                {form.note ? (
                  <span className="text-[14px] text-muted">{form.note}</span>
                ) : null}
              </div>

              {state.status === "error" && state.message ? (
                <p className={`m-0 mt-4 ${errorClass}`} role="alert">
                  {state.message}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
