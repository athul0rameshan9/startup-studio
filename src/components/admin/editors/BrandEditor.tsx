"use client";

import { moveItem, Repeater } from "@/components/admin/Repeater";
import { EditorCard, SectionEditor } from "@/components/admin/SectionEditor";
import {
  CtaFields,
  FieldRow,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import type { SiteContent } from "@/lib/content/schema";

export function BrandEditor({ initial }: { initial: SiteContent }) {
  return (
    <SectionEditor
      section="site"
      title="Brand & navigation"
      description="The name in the header and footer, the search-engine metadata, and every link in the top and bottom bars."
      initial={initial}
    >
      {({ value, update }) => (
        <>
          <EditorCard title="Identity">
            <TextField
              label="Brand name"
              value={value.brandName}
              onChange={(next) =>
                update((draft) => void (draft.brandName = next))
              }
            />
            <TextField
              label="Browser / search title"
              value={value.metaTitle}
              onChange={(next) =>
                update((draft) => void (draft.metaTitle = next))
              }
            />
            <TextAreaField
              label="Search description"
              rows={3}
              hint="Around 150–160 characters reads best in search results."
              value={value.metaDescription}
              onChange={(next) =>
                update((draft) => void (draft.metaDescription = next))
              }
            />
          </EditorCard>

          <EditorCard title="Header">
            <Repeater
              label="Nav link"
              items={value.navLinks}
              max={8}
              addLabel="Add link"
              itemTitle={(link) => link.label || "Link"}
              onAdd={() =>
                update((draft) => {
                  draft.navLinks.push({ label: "", href: "#" });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.navLinks.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.navLinks = moveItem(draft.navLinks, index, direction);
                })
              }
              renderItem={(link, index) => (
                <FieldRow>
                  <TextField
                    label="Text"
                    value={link.label}
                    onChange={(next) =>
                      update(
                        (draft) => void (draft.navLinks[index].label = next),
                      )
                    }
                  />
                  <TextField
                    label="Link"
                    value={link.href}
                    onChange={(next) =>
                      update((draft) => void (draft.navLinks[index].href = next))
                    }
                  />
                </FieldRow>
              )}
            />

            <CtaFields
              legend="Outline button"
              value={value.headerGhostCta}
              onLabel={(next) =>
                update((draft) => void (draft.headerGhostCta.label = next))
              }
              onHref={(next) =>
                update((draft) => void (draft.headerGhostCta.href = next))
              }
            />
            <CtaFields
              legend="Filled button"
              value={value.headerPrimaryCta}
              onLabel={(next) =>
                update((draft) => void (draft.headerPrimaryCta.label = next))
              }
              onHref={(next) =>
                update((draft) => void (draft.headerPrimaryCta.href = next))
              }
            />
          </EditorCard>

          <EditorCard title="Footer">
            <Repeater
              label="Footer link"
              items={value.footerLinks}
              max={8}
              addLabel="Add link"
              itemTitle={(link) => link.label || "Link"}
              onAdd={() =>
                update((draft) => {
                  draft.footerLinks.push({ label: "", href: "#" });
                })
              }
              onRemove={(index) =>
                update((draft) => {
                  draft.footerLinks.splice(index, 1);
                })
              }
              onMove={(index, direction) =>
                update((draft) => {
                  draft.footerLinks = moveItem(
                    draft.footerLinks,
                    index,
                    direction,
                  );
                })
              }
              renderItem={(link, index) => (
                <FieldRow>
                  <TextField
                    label="Text"
                    value={link.label}
                    onChange={(next) =>
                      update(
                        (draft) => void (draft.footerLinks[index].label = next),
                      )
                    }
                  />
                  <TextField
                    label="Link"
                    value={link.href}
                    onChange={(next) =>
                      update(
                        (draft) => void (draft.footerLinks[index].href = next),
                      )
                    }
                  />
                </FieldRow>
              )}
            />
            <TextField
              label="Copyright line"
              value={value.footerCopyright}
              onChange={(next) =>
                update((draft) => void (draft.footerCopyright = next))
              }
            />
          </EditorCard>
        </>
      )}
    </SectionEditor>
  );
}
