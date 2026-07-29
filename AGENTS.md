<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Startup Studio

Marketing site + admin panel. See `README.md` for the full tour.

## Conventions

- Content is data, never hard-coded in components. Anything an owner might want
  to change lives in `src/lib/content/schema.ts` (shape) and
  `src/lib/content/defaults.ts` (seed values), and gets an editor under
  `src/components/admin/editors/`.
- Public-site components are presentational: they take their section's content
  as a prop and render it. No data fetching below `src/app/(site)/page.tsx`.
- Accent colours and section padding come from the `--om-*` CSS variables set on
  the site wrapper, so they re-theme with Admin → Appearance. Never hard-code
  the lime.
- Every admin server action calls `requireSession()` — actions are reachable by
  direct POST, so `src/proxy.ts` is not the security boundary.
- Anything that reads or writes disk goes through `src/lib/storage/json-store.ts`
  and one of the two repositories, and starts with `import "server-only"`.
