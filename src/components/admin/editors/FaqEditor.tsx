"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import { TextAreaField, TextField } from "@/components/admin/fields";
import type { FaqContent } from "@/lib/content/schema";

export function FaqEditor({ initial }: { initial: FaqContent }) {
  return (
    <SectionEditor
      section="faq"
      title="FAQ"
      description="The accordion of questions that come up before a first call."
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

          <EditorCard title="Questions">
            <Repeater
              label="Question"
              items={value.items}
              max={20}
              addLabel="Add question"
              itemTitle={(item) => item.question || "Question"}
              onAdd={() =>
                update((draft) => {
                  draft.items.push({ question: "", answer: "" });
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
                  <TextField
                    label="Question"
                    value={item.question}
                    onChange={(next) =>
                      update(
                        (draft) => void (draft.items[index].question = next),
                      )
                    }
                  />
                  <TextAreaField
                    label="Answer"
                    rows={4}
                    value={item.answer}
                    onChange={(next) =>
                      update((draft) => void (draft.items[index].answer = next))
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
