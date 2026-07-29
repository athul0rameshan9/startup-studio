"use client";

import { useRef, useState, type ReactNode } from "react";

import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/utils";

export const controlClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 font-sans text-[14px] text-ink transition-colors outline-none placeholder:text-faint focus:border-brand-deep";

function FieldShell({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[13px] font-semibold text-ink">{label}</span>
      {children}
      {hint ? <span className="text-[12px] text-muted">{hint}</span> : null}
    </label>
  );
}

type BaseProps = {
  label: string;
  hint?: string;
  className?: string;
};

export function TextField({
  label,
  hint,
  className,
  value,
  onChange,
  placeholder,
  type = "text",
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "url";
}) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={controlClass}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  hint,
  className,
  value,
  onChange,
  rows = 4,
  placeholder,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(controlClass, "resize-y leading-[1.6]")}
      />
    </FieldShell>
  );
}

export function SelectField<T extends string>({
  label,
  hint,
  className,
  value,
  options,
  onChange,
}: BaseProps & {
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className={controlClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function NumberField({
  label,
  hint,
  className,
  value,
  onChange,
  min,
  max,
  step = 1,
}: BaseProps & {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      <input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className={controlClass}
      />
    </FieldShell>
  );
}

export function RangeField({
  label,
  hint,
  className,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: BaseProps & {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (value: number) => string;
}) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      <div className="flex items-center gap-4">
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(event.target.valueAsNumber)}
          className="accent-brand h-1.5 w-full cursor-pointer"
        />
        <span className="w-14 shrink-0 text-right font-mono text-[13px] text-body">
          {format ? format(value) : value}
        </span>
      </div>
    </FieldShell>
  );
}

export function ToggleField({
  label,
  hint,
  className,
  value,
  onChange,
}: BaseProps & {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-white px-3 py-3",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-brand mt-0.5 h-4 w-4 cursor-pointer"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        {hint ? <span className="text-[12px] text-muted">{hint}</span> : null}
      </span>
    </label>
  );
}

export function ColorField({
  label,
  hint,
  className,
  value,
  onChange,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-line bg-white p-1"
          aria-label={`${label} colour picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className={cn(controlClass, "font-mono")}
        />
      </div>
    </FieldShell>
  );
}

export function ImageField({
  label,
  hint,
  className,
  value,
  onChange,
  previewHeight = 64,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  previewHeight?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "Upload failed");
      }
      onChange(result.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <FieldShell label={label} hint={hint} className={className}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            placeholder="/images/example.jpg or https://…"
            onChange={(event) => onChange(event.target.value)}
            className={controlClass}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="shrink-0 cursor-pointer rounded-lg border border-line bg-white px-3 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-brand-deep disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
            }}
          />
        </div>

        {value ? (
          <div className="flex items-center gap-3 rounded-lg border border-line bg-mist p-2">
            <Media
              src={value}
              alt=""
              width={previewHeight}
              height={previewHeight}
              className="rounded-md object-contain"
              style={{ height: previewHeight, width: "auto" }}
            />
            <span className="truncate font-mono text-[11px] text-muted">
              {value}
            </span>
          </div>
        ) : null}

        {error ? (
          <span className="text-[12px] font-medium text-[#C4381A]">{error}</span>
        ) : null}
      </div>
    </FieldShell>
  );
}

export function CtaFields({
  legend,
  value,
  onLabel,
  onHref,
}: {
  legend: string;
  value: { label: string; href: string };
  onLabel: (value: string) => void;
  onHref: (value: string) => void;
}) {
  return (
    <fieldset className="m-0 border-none p-0">
      <legend className="mb-2 p-0 text-[12px] font-semibold tracking-[0.06em] text-muted uppercase">
        {legend}
      </legend>
      <FieldRow>
        <TextField label="Button text" value={value.label} onChange={onLabel} />
        <TextField
          label="Link"
          hint="#anchor, /path or https://…"
          value={value.href}
          onChange={onHref}
        />
      </FieldRow>
    </fieldset>
  );
}

export function FieldRow({
  children,
  columns = 2,
}: {
  children: ReactNode;
  columns?: 1 | 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}
