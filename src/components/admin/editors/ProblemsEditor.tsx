"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  FieldRow,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { ProblemsContent } from "@/lib/content/schema";

export function ProblemsEditor({ initial }: { initial: ProblemsContent }) {
  return (
    <SectionEditor
      section="problems"
      title="Problems"
      description="The “sound familiar?” cards that name the pain before you offer the fix."
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
              rows={2}
              value={value.intro}
              onChange={(next) => update((draft) => void (draft.intro = next))}
            />
          </EditorCard>

          <EditorCard title="Cards">
            <Repeater
              label="Problem"
              items={value.items}
              max={6}
              addLabel="Add problem"
              itemTitle={(item) => item.title || "Problem"}
              onAdd={() =>
                update((draft) => {
                  draft.items.push({
                    number: String(draft.items.length + 1).padStart(2, "0"),
                    title: "",
                    body: "",
                  });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.items.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.items = moveItem(draft.items, index, direction);
                })
              }
              renderItem={(item, index) => (
                <>
                  <FieldRow>
                    <TextField
                      label="Number"
                      value={item.number}
                      onChange={(next) =>
                        update(
                          (draft) => void (draft.items[index].number = next),
                        )
                      }
                    />
                    <TextField
                      label="Title"
                      value={item.title}
                      onChange={(next) =>
                        update((draft) => void (draft.items[index].title = next))
                      }
                    />
                  </FieldRow>
                  <TextAreaField
                    label="Body"
                    rows={3}
                    value={item.body}
                    onChange={(next) =>
                      update((draft) => void (draft.items[index].body = next))
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
