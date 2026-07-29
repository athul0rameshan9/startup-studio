"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  FieldRow,
  ImageField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { TeamContent } from "@/lib/content/schema";

export function TeamEditor({ initial }: { initial: TeamContent }) {
  return (
    <SectionEditor
      section="team"
      title="Team"
      description="The founders' quote and the people behind it."
      initial={initial}
    >
      {({ value, update }) => (
        <>
          <EditorCard title="Quote">
            <TextField
              label="Eyebrow"
              value={value.eyebrow}
              onChange={(next) => update((draft) => void (draft.eyebrow = next))}
            />
            <TextAreaField
              label="Quote"
              rows={5}
              hint="Include the quotation marks you want to see on the page."
              value={value.quote}
              onChange={(next) => update((draft) => void (draft.quote = next))}
            />
          </EditorCard>

          <EditorCard title="People">
            <Repeater
              label="Person"
              items={value.members}
              max={6}
              addLabel="Add person"
              itemTitle={(member) => member.name || "Person"}
              onAdd={() =>
                update((draft) => {
                  draft.members.push({
                    name: "",
                    role: "",
                    photo: "/images/founder-strategy.jpeg",
                  });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.members.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.members = moveItem(draft.members, index, direction);
                })
              }
              renderItem={(member, index) => (
                <>
                  <FieldRow>
                    <TextField
                      label="Name"
                      value={member.name}
                      onChange={(next) =>
                        update(
                          (draft) => void (draft.members[index].name = next),
                        )
                      }
                    />
                    <TextField
                      label="Role"
                      value={member.role}
                      onChange={(next) =>
                        update(
                          (draft) => void (draft.members[index].role = next),
                        )
                      }
                    />
                  </FieldRow>
                  <ImageField
                    label="Portrait"
                    hint="Shown at 96 × 110, cropped to fill."
                    previewHeight={72}
                    value={member.photo}
                    onChange={(next) =>
                      update((draft) => void (draft.members[index].photo = next))
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
