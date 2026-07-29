"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  CtaFields,
  FieldRow,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { HeroContent } from "@/lib/content/schema";

export function HeroEditor({ initial }: { initial: HeroContent }) {
  return (
    <SectionEditor
      section="hero"
      title="Hero"
      description="The first screen: headline, supporting line, the two buttons and the stat strip underneath."
      initial={initial}
    >
      {({ value, update }) => (
        <>
          <EditorCard title="Headline">
            <TextField
              label="Eyebrow"
              hint="Small monospaced line above the headline."
              value={value.eyebrow}
              onChange={(next) => update((draft) => void (draft.eyebrow = next))}
            />
            <TextAreaField
              label="Headline"
              rows={2}
              value={value.title}
              onChange={(next) => update((draft) => void (draft.title = next))}
            />
            <TextAreaField
              label="Supporting paragraph"
              rows={3}
              value={value.subtitle}
              onChange={(next) =>
                update((draft) => void (draft.subtitle = next))
              }
            />
            <TextField
              label="Note under the buttons"
              value={value.note}
              onChange={(next) => update((draft) => void (draft.note = next))}
            />
          </EditorCard>

          <EditorCard title="Buttons">
            <CtaFields
              legend="Primary button"
              value={value.primaryCta}
              onLabel={(next) =>
                update((draft) => void (draft.primaryCta.label = next))
              }
              onHref={(next) =>
                update((draft) => void (draft.primaryCta.href = next))
              }
            />
            <CtaFields
              legend="Secondary button"
              value={value.secondaryCta}
              onLabel={(next) =>
                update((draft) => void (draft.secondaryCta.label = next))
              }
              onHref={(next) =>
                update((draft) => void (draft.secondaryCta.href = next))
              }
            />
          </EditorCard>

          <EditorCard
            title="Stat strip"
            description="The ruled band that sits between the hero and the page."
          >
            <Repeater
              label="Stat"
              items={value.stats}
              max={8}
              addLabel="Add stat"
              itemTitle={(stat) => stat.value || "Stat"}
              onAdd={() =>
                update((draft) => {
                  draft.stats.push({ value: "", label: "" });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.stats.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.stats = moveItem(draft.stats, index, direction);
                })
              }
              renderItem={(stat, index) => (
                <FieldRow>
                  <TextField
                    label="Number"
                    value={stat.value}
                    onChange={(next) =>
                      update((draft) => void (draft.stats[index].value = next))
                    }
                  />
                  <TextField
                    label="Caption"
                    value={stat.label}
                    onChange={(next) =>
                      update((draft) => void (draft.stats[index].label = next))
                    }
                  />
                </FieldRow>
              )}
            />
          </EditorCard>
        </>
      )}
    </SectionEditor>
  );
}
