"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import { TextAreaField, TextField } from "@/components/admin/fields";
import type { WhyContent } from "@/lib/content/schema";

export function WhyEditor({ initial }: { initial: WhyContent }) {
  return (
    <SectionEditor
      section="why"
      title="Why us"
      description="The ruled list of reasons an owner picks you over an agency."
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

          <EditorCard title="Reasons">
            <Repeater
              label="Reason"
              items={value.reasons}
              max={6}
              addLabel="Add reason"
              itemTitle={(reason) => reason.title || "Reason"}
              onAdd={() =>
                update((draft) => {
                  draft.reasons.push({ title: "", body: "" });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.reasons.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.reasons = moveItem(draft.reasons, index, direction);
                })
              }
              renderItem={(reason, index) => (
                <>
                  <TextField
                    label="Title"
                    value={reason.title}
                    onChange={(next) =>
                      update((draft) => void (draft.reasons[index].title = next))
                    }
                  />
                  <TextAreaField
                    label="Body"
                    rows={3}
                    value={reason.body}
                    onChange={(next) =>
                      update((draft) => void (draft.reasons[index].body = next))
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
