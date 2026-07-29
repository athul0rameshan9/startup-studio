"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  FieldRow,
  ImageField,
  NumberField,
  TextField,
  ToggleField,
} from "@/components/admin/fields";
import type { TrustedByContent } from "@/lib/content/schema";

export function TrustedByEditor({ initial }: { initial: TrustedByContent }) {
  return (
    <SectionEditor
      section="trustedBy"
      title="Trusted by"
      description="The client logo strip under the hero. Leave a logo image empty to show the striped placeholder."
      initial={initial}
    >
      {({ value, update }) => (
        <>
          <EditorCard title="Strip">
            <ToggleField
              label="Show this strip"
              hint="Turn it off until you have real logos to show."
              value={value.enabled}
              onChange={(next) => update((draft) => void (draft.enabled = next))}
            />
            <FieldRow>
              <TextField
                label="Label"
                value={value.label}
                onChange={(next) => update((draft) => void (draft.label = next))}
              />
              <TextField
                label="Note at the end"
                value={value.note}
                onChange={(next) => update((draft) => void (draft.note = next))}
              />
            </FieldRow>
          </EditorCard>

          <EditorCard title="Logos">
            <Repeater
              label="Logo"
              items={value.logos}
              max={10}
              addLabel="Add logo"
              itemTitle={(logo) => logo.name || "Logo"}
              onAdd={() =>
                update((draft) => {
                  draft.logos.push({ name: "New client", width: 110, image: "" });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.logos.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.logos = moveItem(draft.logos, index, direction);
                })
              }
              renderItem={(logo, index) => (
                <>
                  <FieldRow>
                    <TextField
                      label="Client name"
                      value={logo.name}
                      onChange={(next) =>
                        update((draft) => void (draft.logos[index].name = next))
                      }
                    />
                    <NumberField
                      label="Width (px)"
                      min={48}
                      max={320}
                      value={logo.width}
                      onChange={(next) =>
                        update(
                          (draft) =>
                            void (draft.logos[index].width = Number.isFinite(next)
                              ? next
                              : 110),
                        )
                      }
                    />
                  </FieldRow>
                  <ImageField
                    label="Logo image"
                    hint="Optional. Renders at 26px tall."
                    previewHeight={26}
                    value={logo.image}
                    onChange={(next) =>
                      update((draft) => void (draft.logos[index].image = next))
                    }
                  />
                </>
              )}
            />
          </EditorCard>
        </>
      )}
    </SectionEditor>
  );
}
