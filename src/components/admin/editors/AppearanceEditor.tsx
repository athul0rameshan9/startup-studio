"use client";

import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import { RangeField, SelectField } from "@/components/admin/fields";
import type {
  HeroLayout,
  PaletteId,
  RhythmId,
  Settings,
  StackDisplay,
} from "@/lib/content/schema";
import { PALETTE_IDS, PALETTES, RHYTHM_IDS, RHYTHMS } from "@/lib/theme";
import { cn } from "@/lib/utils";

const RHYTHM_OPTIONS = RHYTHM_IDS.map((id) => ({
  value: id,
  label: `${id} — ${RHYTHMS[id].pad}px between sections`,
}));

const HERO_OPTIONS: { value: HeroLayout; label: string }[] = [
  { value: "Centered", label: "Centered — headline and buttons in the middle" },
  { value: "Editorial", label: "Editorial — everything aligned left" },
];

const STACK_OPTIONS: { value: StackDisplay; label: string }[] = [
  { value: "Marquee", label: "Marquee — three scrolling lanes" },
  { value: "Grid", label: "Grid — one static block of pills" },
];

export function AppearanceEditor({ initial }: { initial: Settings }) {
  return (
    <SectionEditor
      section="settings"
      title="Appearance"
      description="The four design controls the original template exposed: accent colour, vertical rhythm, hero alignment and how the tech stack is displayed."
      initial={initial}
    >
      {({ value, update }) => (
        <>
          <EditorCard
            title="Accent palette"
            description="Drives every green highlight, button and rule on the public site."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PALETTE_IDS.map((id: PaletteId) => {
                const palette = PALETTES[id];
                const active = value.palette === id;

                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      update((draft) => void (draft.palette = id))
                    }
                    className={cn(
                      "flex cursor-pointer flex-col gap-3 rounded-xl border-2 bg-white p-3 text-left transition-colors",
                      active
                        ? "border-ink"
                        : "border-line hover:border-rule-soft",
                    )}
                  >
                    <span className="flex overflow-hidden rounded-lg">
                      {[palette.base, palette.hi, palette.deep].map((colour) => (
                        <span
                          key={colour}
                          className="h-9 flex-1"
                          style={{ background: colour }}
                        />
                      ))}
                    </span>
                    <span className="text-[13px] font-semibold text-ink">
                      {palette.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </EditorCard>

          <EditorCard title="Layout">
            <SelectField<RhythmId>
              label="Vertical rhythm"
              hint="How much air sits between the sections."
              value={value.rhythm}
              options={RHYTHM_OPTIONS}
              onChange={(next) => update((draft) => void (draft.rhythm = next))}
            />
            <SelectField<HeroLayout>
              label="Hero layout"
              value={value.heroLayout}
              options={HERO_OPTIONS}
              onChange={(next) =>
                update((draft) => void (draft.heroLayout = next))
              }
            />
          </EditorCard>

          <EditorCard title="Tech stack">
            <SelectField<StackDisplay>
              label="Display"
              value={value.stackDisplay}
              options={STACK_OPTIONS}
              onChange={(next) =>
                update((draft) => void (draft.stackDisplay = next))
              }
            />
            <RangeField
              label="Marquee speed"
              hint="Higher is faster. Ignored when the stack is shown as a grid."
              min={0.4}
              max={2.5}
              step={0.1}
              value={value.marqueeSpeed}
              format={(speed) => `${speed.toFixed(1)}×`}
              onChange={(next) =>
                update((draft) => void (draft.marqueeSpeed = next))
              }
            />
          </EditorCard>
        </>
      )}
    </SectionEditor>
  );
}
