"use client";

import type { ReactNode } from "react";

type RepeaterProps<T> = {
  label: string;
  hint?: string;
  items: T[];
  /** Called with the index of the item to change. */
  onAdd: () => void;
  onRemove: (index: number) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  renderItem: (item: T, index: number) => ReactNode;
  itemTitle?: (item: T, index: number) => string;
  addLabel?: string;
  max?: number;
  min?: number;
};

const iconButton =
  "flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-line bg-white text-[13px] text-body transition-colors hover:border-brand-deep hover:text-ink disabled:cursor-not-allowed disabled:opacity-35";

export function Repeater<T>({
  label,
  hint,
  items,
  onAdd,
  onRemove,
  onMove,
  renderItem,
  itemTitle,
  addLabel = "Add item",
  max,
  min = 0,
}: RepeaterProps<T>) {
  const atMax = typeof max === "number" && items.length >= max;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="m-0 text-[13px] font-semibold text-ink">{label}</h3>
          {hint ? <p className="m-0 text-[12px] text-muted">{hint}</p> : null}
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={atMax}
          className="shrink-0 cursor-pointer rounded-lg border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-brand-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          + {addLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="m-0 rounded-lg border border-dashed border-rule-soft bg-mist px-4 py-6 text-center text-[13px] text-muted">
          Nothing here yet.
        </p>
      ) : (
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {items.map((item, index) => (
            <li
              key={index}
              className="rounded-xl border border-line bg-mist p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="truncate text-[12px] font-semibold tracking-[0.06em] text-muted uppercase">
                  {itemTitle?.(item, index) ?? `${label} ${index + 1}`}
                </span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => onMove(index, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Move down"
                    disabled={index === items.length - 1}
                    onClick={() => onMove(index, 1)}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Remove"
                    disabled={items.length <= min}
                    onClick={() => onRemove(index)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">{renderItem(item, index)}</div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/** Immutably moves an array element; returns the same array when out of range. */
export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
