"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  ColorField,
  FieldRow,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { StackContent } from "@/lib/content/schema";

const DIRECTIONS = [
  { value: "l" as const, label: "Scrolls left" },
  { value: "r" as const, label: "Scrolls right" },
];

const MARK_TYPES = [
  { value: "logo" as const, label: "Brand logo (Simple Icons)" },
  { value: "mono" as const, label: "Monogram (letters)" },
];

export function StackEditor({ initial }: { initial: StackContent }) {
  return (
    <SectionEditor
      section="stack"
      title="Tech stack"
      description="The marquee lanes of tools you build with. Logos are pulled from cdn.simpleicons.org by slug; anything without one gets a lettered badge."
      initial={initial}
    >
      {({ value, update }) => (
        <>
          <EditorCard title="Section heading">
            <TextField
              label="Eyebrow"
              value={value.eyebrow}
              onChange={(next) => update((draft) => void (draft.eyebrow = next))}
            />
            <TextAreaField
              label="Heading"
              rows={2}
              value={value.heading}
              onChange={(next) => update((draft) => void (draft.heading = next))}
            />
            <TextAreaField
              label="Intro paragraph"
              rows={3}
              value={value.intro}
              onChange={(next) => update((draft) => void (draft.intro = next))}
            />
          </EditorCard>

          <Repeater
            label="Lane"
            hint="Each lane scrolls on its own. Speed is set globally in Appearance."
            items={value.rows}
            max={6}
            addLabel="Add lane"
            itemTitle={(_row, index) => `Lane ${index + 1}`}
            onAdd={() =>
              update((draft) => {
                draft.rows.push({ duration: 30, direction: "l", items: [] });
              })
            }
            onRemove={(index) =>
              update((draft) => {
                draft.rows.splice(index, 1);
              })
            }
            onMove={(index, direction) =>
              update((draft) => {
                draft.rows = moveItem(draft.rows, index, direction);
              })
            }
            renderItem={(row, rowIndex) => (
              <>
                <FieldRow>
                  <NumberField
                    label="Loop duration (seconds)"
                    min={6}
                    max={120}
                    value={row.duration}
                    onChange={(next) =>
                      update(
                        (draft) =>
                          void (draft.rows[rowIndex].duration = Number.isFinite(
                            next,
                          )
                            ? next
                            : 30),
                      )
                    }
                  />
                  <SelectField
                    label="Direction"
                    value={row.direction}
                    options={DIRECTIONS}
                    onChange={(next) =>
                      update(
                        (draft) => void (draft.rows[rowIndex].direction = next),
                      )
                    }
                  />
                </FieldRow>

                <Repeater
                  label="Tool"
                  items={row.items}
                  max={24}
                  addLabel="Add tool"
                  itemTitle={(item) => item.name || "Tool"}
                  onAdd={() =>
                    update((draft) => {
                      draft.rows[rowIndex].items.push({
                        name: "",
                        mark: "",
                        type: "mono",
                        tint: "#B8E62A",
                      });
                    })
                  }
                  onRemove={(index) =>
                    update((draft) => {
                      draft.rows[rowIndex].items.splice(index, 1);
                    })
                  }
                  onMove={(index, direction) =>
                    update((draft) => {
                      draft.rows[rowIndex].items = moveItem(
                        draft.rows[rowIndex].items,
                        index,
                        direction,
                      );
                    })
                  }
                  renderItem={(item, itemIndex) => (
                    <>
                      <FieldRow>
                        <TextField
                          label="Name"
                          value={item.name}
                          onChange={(next) =>
                            update(
                              (draft) =>
                                void (draft.rows[rowIndex].items[
                                  itemIndex
                                ].name = next),
                            )
                          }
                        />
                        <SelectField
                          label="Mark"
                          value={item.type}
                          options={MARK_TYPES}
                          onChange={(next) =>
                            update(
                              (draft) =>
                                void (draft.rows[rowIndex].items[
                                  itemIndex
                                ].type = next),
                            )
                          }
                        />
                      </FieldRow>
                      <FieldRow>
                        <TextField
                          label={
                            item.type === "logo"
                              ? "Simple Icons slug"
                              : "Monogram (2–3 characters)"
                          }
                          hint={
                            item.type === "logo"
                              ? "e.g. vercel, python, googlecloud"
                              : "e.g. AZ, CR, K8"
                          }
                          value={item.mark}
                          onChange={(next) =>
                            update(
                              (draft) =>
                                void (draft.rows[rowIndex].items[
                                  itemIndex
                                ].mark = next),
                            )
                          }
                        />
                        <ColorField
                          label="Tint"
                          value={item.tint}
                          onChange={(next) =>
                            update(
                              (draft) =>
                                void (draft.rows[rowIndex].items[
                                  itemIndex
                                ].tint = next),
                            )
                          }
                        />
                      </FieldRow>
                    </>
                  )}
                />
              </>
            )}
          />
        </>
      )}
    </SectionEditor>
  );
}
