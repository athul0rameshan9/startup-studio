"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  CtaFields,
  FieldRow,
  TextAreaField,
  TextField,
  ToggleField,
} from "@/components/admin/fields";
import type { BookingContent } from "@/lib/content/schema";

export function BookingEditor({ initial }: { initial: BookingContent }) {
  return (
    <SectionEditor
      section="booking"
      title="Booking form"
      description="The closing section and the enquiry form. Submissions land in Enquiries."
      initial={initial}
    >
      {({ value, update }) => (
        <>
          <EditorCard title="Section copy">
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
              label="Paragraph"
              rows={3}
              value={value.body}
              onChange={(next) => update((draft) => void (draft.body = next))}
            />
            <CtaFields
              legend="WhatsApp link"
              value={value.whatsappCta}
              onLabel={(next) =>
                update((draft) => void (draft.whatsappCta.label = next))
              }
              onHref={(next) =>
                update((draft) => void (draft.whatsappCta.href = next))
              }
            />
          </EditorCard>

          <EditorCard title="Field labels">
            <FieldRow>
              <TextField
                label="Name label"
                value={value.form.nameLabel}
                onChange={(next) =>
                  update((draft) => void (draft.form.nameLabel = next))
                }
              />
              <TextField
                label="Name placeholder"
                value={value.form.namePlaceholder}
                onChange={(next) =>
                  update((draft) => void (draft.form.namePlaceholder = next))
                }
              />
            </FieldRow>
            <FieldRow>
              <TextField
                label="Business label"
                value={value.form.businessLabel}
                onChange={(next) =>
                  update((draft) => void (draft.form.businessLabel = next))
                }
              />
              <TextField
                label="Business placeholder"
                value={value.form.businessPlaceholder}
                onChange={(next) =>
                  update((draft) => void (draft.form.businessPlaceholder = next))
                }
              />
            </FieldRow>
            <FieldRow>
              <TextField
                label="Message label"
                value={value.form.messageLabel}
                onChange={(next) =>
                  update((draft) => void (draft.form.messageLabel = next))
                }
              />
              <TextField
                label="Message placeholder"
                value={value.form.messagePlaceholder}
                onChange={(next) =>
                  update((draft) => void (draft.form.messagePlaceholder = next))
                }
              />
            </FieldRow>
          </EditorCard>

          <EditorCard
            title="Contact field"
            description="Off by default, which matches the original design. Turn it on to collect a reply address with every enquiry."
          >
            <ToggleField
              label="Ask for an email or phone number"
              value={value.form.contactEnabled}
              onChange={(next) =>
                update((draft) => void (draft.form.contactEnabled = next))
              }
            />
            <FieldRow>
              <TextField
                label="Contact label"
                value={value.form.contactLabel}
                onChange={(next) =>
                  update((draft) => void (draft.form.contactLabel = next))
                }
              />
              <TextField
                label="Contact placeholder"
                value={value.form.contactPlaceholder}
                onChange={(next) =>
                  update((draft) => void (draft.form.contactPlaceholder = next))
                }
              />
            </FieldRow>
          </EditorCard>

          <EditorCard title="Budget options">
            <TextField
              label="Budget label"
              value={value.form.budgetLabel}
              onChange={(next) =>
                update((draft) => void (draft.form.budgetLabel = next))
              }
            />
            <Repeater
              label="Option"
              items={value.form.budgetOptions}
              max={12}
              min={1}
              addLabel="Add option"
              itemTitle={(option) => option || "Option"}
              onAdd={() =>
                update((draft) => {
                  draft.form.budgetOptions.push("");
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.form.budgetOptions.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.form.budgetOptions = moveItem(
                    draft.form.budgetOptions,
                    index,
                    direction,
                  );
                })
              }
              renderItem={(option, index) => (
                <TextField
                  label={`Option ${index + 1}`}
                  value={option}
                  onChange={(next) =>
                    update(
                      (draft) => void (draft.form.budgetOptions[index] = next),
                    )
                  }
                />
              )}
            />
          </EditorCard>

          <EditorCard title="Timeline options">
            <TextField
              label="Timeline label"
              value={value.form.timelineLabel}
              onChange={(next) =>
                update((draft) => void (draft.form.timelineLabel = next))
              }
            />
            <Repeater
              label="Option"
              items={value.form.timelineOptions}
              max={12}
              min={1}
              addLabel="Add option"
              itemTitle={(option) => option || "Option"}
              onAdd={() =>
                update((draft) => {
                  draft.form.timelineOptions.push("");
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.form.timelineOptions.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.form.timelineOptions = moveItem(
                    draft.form.timelineOptions,
                    index,
                    direction,
                  );
                })
              }
              renderItem={(option, index) => (
                <TextField
                  label={`Option ${index + 1}`}
                  value={option}
                  onChange={(next) =>
                    update(
                      (draft) => void (draft.form.timelineOptions[index] = next),
                    )
                  }
                />
              )}
            />
          </EditorCard>

          <EditorCard title="Submit">
            <FieldRow>
              <TextField
                label="Button text"
                value={value.form.submitLabel}
                onChange={(next) =>
                  update((draft) => void (draft.form.submitLabel = next))
                }
              />
              <TextField
                label="Note beside the button"
                value={value.form.note}
                onChange={(next) =>
                  update((draft) => void (draft.form.note = next))
                }
              />
            </FieldRow>
            <TextAreaField
              label="Thank-you message"
              rows={2}
              value={value.form.successMessage}
              onChange={(next) =>
                update((draft) => void (draft.form.successMessage = next))
              }
            />
          </EditorCard>
        </>
      )}
    </SectionEditor>
  );
}
