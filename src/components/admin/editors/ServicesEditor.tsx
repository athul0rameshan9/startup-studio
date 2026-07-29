"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  CtaFields,
  ImageField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { ServicesContent } from "@/lib/content/schema";

export function ServicesEditor({ initial }: { initial: ServicesContent }) {
  return (
    <SectionEditor
      section="services"
      title="Services"
      description="What you do, described as what the client gets — plus the add-on card and the dark call-to-action tile."
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

          <EditorCard title="Service cards">
            <Repeater
              label="Service"
              items={value.cards}
              max={6}
              addLabel="Add service"
              itemTitle={(card) => card.title || "Service"}
              onAdd={() =>
                update((draft) => {
                  draft.cards.push({
                    icon: "/images/service-automation.svg",
                    title: "",
                    body: "",
                  });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.cards.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.cards = moveItem(draft.cards, index, direction);
                })
              }
              renderItem={(card, index) => (
                <>
                  <TextField
                    label="Title"
                    value={card.title}
                    onChange={(next) =>
                      update((draft) => void (draft.cards[index].title = next))
                    }
                  />
                  <TextAreaField
                    label="Body"
                    rows={3}
                    value={card.body}
                    onChange={(next) =>
                      update((draft) => void (draft.cards[index].body = next))
                    }
                  />
                  <ImageField
                    label="Icon"
                    hint="Rendered at 52 × 52."
                    previewHeight={52}
                    value={card.icon}
                    onChange={(next) =>
                      update((draft) => void (draft.cards[index].icon = next))
                    }
                  />
                </>
              )}
            />
          </EditorCard>

          <EditorCard
            title="Add-on card"
            description="The dashed card — for the service you offer once the main build is live."
          >
            <TextField
              label="Eyebrow"
              value={value.addon.eyebrow}
              onChange={(next) =>
                update((draft) => void (draft.addon.eyebrow = next))
              }
            />
            <TextField
              label="Title"
              value={value.addon.title}
              onChange={(next) =>
                update((draft) => void (draft.addon.title = next))
              }
            />
            <TextAreaField
              label="Body"
              rows={3}
              value={value.addon.body}
              onChange={(next) =>
                update((draft) => void (draft.addon.body = next))
              }
            />
            <ImageField
              label="Icon"
              previewHeight={52}
              value={value.addon.icon}
              onChange={(next) =>
                update((draft) => void (draft.addon.icon = next))
              }
            />
          </EditorCard>

          <EditorCard title="Dark call-to-action tile">
            <TextAreaField
              label="Title"
              rows={2}
              value={value.callout.title}
              onChange={(next) =>
                update((draft) => void (draft.callout.title = next))
              }
            />
            <CtaFields
              legend="Button"
              value={value.callout.cta}
              onLabel={(next) =>
                update((draft) => void (draft.callout.cta.label = next))
              }
              onHref={(next) =>
                update((draft) => void (draft.callout.cta.href = next))
              }
            />
          </EditorCard>
        </>
      )}
    </SectionEditor>
  );
}
