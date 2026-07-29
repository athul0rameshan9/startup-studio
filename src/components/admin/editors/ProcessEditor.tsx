"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import { FieldRow, TextAreaField, TextField } from "@/components/admin/fields";
import type { ProcessContent } from "@/lib/content/schema";

export function ProcessEditor({ initial }: { initial: ProcessContent }) {
  return (
    <SectionEditor
      section="process"
      title="Process"
      description="The ruled four-up that explains how an engagement runs."
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
          </EditorCard>

          <EditorCard title="Steps">
            <Repeater
              label="Step"
              items={value.steps}
              max={8}
              addLabel="Add step"
              itemTitle={(step) => step.title || step.label}
              onAdd={() =>
                update((draft) => {
                  draft.steps.push({
                    label: `STEP ${String(draft.steps.length + 1).padStart(2, "0")}`,
                    title: "",
                    body: "",
                  });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.steps.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.steps = moveItem(draft.steps, index, direction);
                })
              }
              renderItem={(step, index) => (
                <>
                  <FieldRow>
                    <TextField
                      label="Label"
                      value={step.label}
                      onChange={(next) =>
                        update((draft) => void (draft.steps[index].label = next))
                      }
                    />
                    <TextField
                      label="Title"
                      value={step.title}
                      onChange={(next) =>
                        update((draft) => void (draft.steps[index].title = next))
                      }
                    />
                  </FieldRow>
                  <TextAreaField
                    label="Body"
                    rows={3}
                    value={step.body}
                    onChange={(next) =>
                      update((draft) => void (draft.steps[index].body = next))
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
