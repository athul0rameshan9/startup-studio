"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { resetSection, updateSection } from "@/lib/content/actions";
import type { SectionKey } from "@/lib/content/schema";

type Status =
  | { kind: "idle" }
  | { kind: "saved"; message: string }
  | { kind: "error"; message: string; issues?: string[] };

type SectionEditorProps<T> = {
  section: SectionKey;
  title: string;
  description?: string;
  initial: T;
  children: (context: {
    value: T;
    update: (mutate: (draft: T) => void) => void;
  }) => ReactNode;
};

export function SectionEditor<T>({
  section,
  title,
  description,
  initial,
  children,
}: SectionEditorProps<T>) {
  const router = useRouter();
  const [value, setValue] = useState<T>(initial);
  const [saved, setSaved] = useState<T>(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  const dirty = useMemo(
    () => JSON.stringify(value) !== JSON.stringify(saved),
    [value, saved],
  );

  const update = useCallback((mutate: (draft: T) => void) => {
    setValue((previous) => {
      const draft = structuredClone(previous);
      mutate(draft);
      return draft;
    });
    setStatus({ kind: "idle" });
  }, []);

  const save = useCallback(() => {
    startTransition(async () => {
      const result = await updateSection(section, value);
      if (result.ok) {
        setSaved(value);
        setStatus({ kind: "saved", message: result.message });
        router.refresh();
      } else {
        setStatus({
          kind: "error",
          message: result.error,
          issues: result.issues,
        });
      }
    });
  }, [router, section, value]);

  const restoreDefaults = useCallback(() => {
    const confirmed = window.confirm(
      `Reset "${title}" to the content this project shipped with? Your current edits to this section will be lost.`,
    );
    if (!confirmed) return;

    startTransition(async () => {
      const result = await resetSection(section);
      if (result.ok && result.data !== undefined) {
        setValue(result.data as T);
        setSaved(result.data as T);
        setStatus({ kind: "saved", message: result.message });
        router.refresh();
      } else if (!result.ok) {
        setStatus({ kind: "error", message: result.error });
      }
    });
  }, [router, section, title]);

  // Guard against losing edits on navigation away.
  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // ⌘S / Ctrl-S saves.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (dirty && !pending) save();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dirty, pending, save]);

  return (
    <div className="pb-28">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-[26px] font-extrabold tracking-[-0.02em]">
            {title}
          </h1>
          {description ? (
            <p className="m-0 mt-1.5 max-w-[620px] text-[14px] leading-[1.6] text-body">
              {description}
            </p>
          ) : null}
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

      <form
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
        className="flex flex-col gap-8"
      >
        {children({ value, update })}

        <div className="sticky bottom-0 -mx-6 mt-2 border-t border-line bg-mist/95 px-6 py-4 backdrop-blur lg:-mx-10 lg:px-10">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!dirty || pending}
              className="cursor-pointer rounded-full bg-ink px-6 py-3 text-[14px] font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pending ? "Saving…" : "Save changes"}
            </button>

            <button
              type="button"
              onClick={restoreDefaults}
              disabled={pending}
              className="cursor-pointer rounded-full border border-line bg-white px-5 py-3 text-[14px] font-semibold text-body transition-colors hover:border-brand-deep hover:text-ink disabled:opacity-50"
            >
              Reset to default
            </button>

            <span className="text-[13px] text-muted" aria-live="polite">
              {status.kind === "error" ? (
                <span className="font-semibold text-[#C4381A]">
                  {status.message}
                </span>
              ) : dirty ? (
                "Unsaved changes"
              ) : status.kind === "saved" ? (
                <span className="font-semibold text-brand-deep">
                  {status.message}
                </span>
              ) : (
                "Everything is saved"
              )}
            </span>
          </div>

          {status.kind === "error" && status.issues?.length ? (
            <ul className="mt-3 mb-0 flex list-disc flex-col gap-1 pl-5 text-[13px] text-[#C4381A]">
              {status.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </form>
    </div>
  );
}

/** Shared card wrapper for grouping fields inside an editor. */
export function EditorCard({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      {title ? (
        <header className="mb-5">
          <h2 className="m-0 text-[15px] font-bold tracking-[-0.01em]">
            {title}
          </h2>
          {description ? (
            <p className="m-0 mt-1 text-[13px] leading-[1.55] text-muted">
              {description}
            </p>
          ) : null}
        </header>
      ) : null}
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
