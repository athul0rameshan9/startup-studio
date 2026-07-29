"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  CtaFields,
  ImageField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { WorkContent } from "@/lib/content/schema";

export function WorkEditor({ initial }: { initial: WorkContent }) {
  return (
    <SectionEditor
      section="work"
      title="Featured work"
      description="One case study, told as situation → what we built → result."
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

          <EditorCard title="Story">
            <Repeater
              label="Block"
              items={value.blocks}
              max={6}
              addLabel="Add block"
              itemTitle={(block) => block.label || "Block"}
              onAdd={() =>
                update((draft) => {
                  draft.blocks.push({ label: "", body: "", emphasis: "" });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.blocks.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.blocks = moveItem(draft.blocks, index, direction);
                })
              }
              renderItem={(block, index) => (
                <>
                  <TextField
                    label="Label"
                    value={block.label}
                    onChange={(next) =>
                      update((draft) => void (draft.blocks[index].label = next))
                    }
                  />
                  <TextAreaField
                    label="Body"
                    rows={3}
                    value={block.body}
                    onChange={(next) =>
                      update((draft) => void (draft.blocks[index].body = next))
                    }
                  />
                  <TextField
                    label="Highlighted sentence"
                    hint="Optional. Appended to the body in white, semi-bold."
                    value={block.emphasis}
                    onChange={(next) =>
                      update(
                        (draft) => void (draft.blocks[index].emphasis = next),
                      )
                    }
                  />
                </>
              )}
            />
          </EditorCard>

          <EditorCard title="Link and image">
            <CtaFields
              legend="Link"
              value={value.cta}
              onLabel={(next) =>
                update((draft) => void (draft.cta.label = next))
              }
              onHref={(next) => update((draft) => void (draft.cta.href = next))}
            />
            <ImageField
              label="Photo"
              hint="Displayed as a square, so a square crop works best."
              previewHeight={96}
              value={value.image.src}
              onChange={(next) =>
                update((draft) => void (draft.image.src = next))
              }
            />
            <TextField
              label="Photo alt text"
              value={value.image.alt}
              onChange={(next) =>
                update((draft) => void (draft.image.alt = next))
              }
            />
          </EditorCard>
        </>
      )}
    </SectionEditor>
  );
}
