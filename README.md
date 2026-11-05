# Project footer

Shared creator credit and project links for Vibe, MusicTheory.Work, ChatRPE, and Lacuna. Plain React 18+, compatible with Next server components and Vite. No framework, animation, font, analytics, or runtime network dependency.

```tsx
import { CreatorProjects } from '@cristonj/project-footer';
import '@cristonj/project-footer/styles.css';

<footer>
  <CreatorProjects currentProject="vibe">
    <nav aria-label="Legal">{/* site-owned links */}</nav>
  </CreatorProjects>
</footer>
```

The current site's wordmark and site-specific links sit above the creator credit. The other projects' wordmarks sit below it. Set `currentProject` on each site to split the selected wordmarks automatically; without it, all selected projects appear below the credit. The component renders a `div` and a named project navigation landmark, so it can also sit inside an existing footer without nesting footer landmarks. Hosts retain responsibility for legal links, SEO navigation, ratings, support contacts, dock clearance, and scroll behavior.

## Customization

- `projectIds`: select and reorder the four projects.
- `currentProject` and `homeHref`: use a local home link for the current site (including localized paths).
- `projectOverrides`: override a project's label or destination for previews.
- `logos`: supply a React node for any project's original wordmark, e.g. a host's animated brand component. Keep it noninteractive: the component supplies the accessible link.
- `createdBy`, `creatorName`, `creatorHref`, `projectsLabel`: customize or translate the credit and navigation label.
- `externalTarget`: `_blank` (default, with noopener/noreferrer) or `_self`.
- `children`: site-owned legal links or other content below the project row.
- `className` and `style`: host styling. Variables include `--cj-color`, `--cj-muted`, `--cj-focus`, `--cj-padding`, `--cj-row-gap`, `--cj-brand-gap`, `--cj-credit-size`, `--cj-vibe-width`, `--cj-mtw-width`, `--cj-chatrpe-width`, `--cj-lacuna-width`, and `--cj-chatrpe-accent`.

No background is imposed. Monochrome assets follow the host's ink. ChatRPE keeps its canonical white and lime fills. Light surfaces switch to the outlined wordmark with `--cj-chatrpe-plain: none; --cj-chatrpe-outlined: block`. It keeps the canonical tracking over a heavy black outline, with the C's center filled black. Dark surfaces need no variables. Its optional `--cj-chatrpe-outline`, `--cj-chatrpe-ink` and `--cj-chatrpe-accent` variables allow explicit overrides. Logos wrap to complete links on small screens and all links have a 44px minimum touch height. SVG dimensions reserve layout space before paint. There are no font substitutions: all lettering is outlined.

## Canonical assets

`assets/` contains the existing optimized SVG sources from the projects. `scripts/build-assets.mjs` only normalizes presentation attributes and assembles the existing ChatRPE outlines into horizontal wordmarks. It never redraws lettering, rasterizes, or introduces font dependencies. See `assets/SOURCES.md` for provenance. Inline SVGs are generated from these trusted files, never remote content.

## Adding a project

Pass `extraProjects` to register a project without changing the package. Use its original SVG component:

```tsx
<CreatorProjects
  currentProject="vibe"
  extraProjects={[{ id: 'new-project', name: 'New Project', href: 'https://example.com/', logo: <OriginalSvgWordmark /> }]}
/>
```

Custom projects appear with the built-in projects by default; `projectIds` selects and orders the combined list. Their default logo width is 128px, adjustable through a scoped `--cj-logo-width` rule. To add a project for every consumer, add its canonical SVG to this repository, register it in `index.js` and `index.d.ts`, then release a new version.

## Distribution and releases

Source: https://github.com/cristonj/project-footer

MTW and Vibe consume the same versioned tarball from their `vendor/` directory. The release artifact is also attached to the matching GitHub release. This keeps CI independent of registry credentials and prevents an unreviewed package update from changing every website.

Run `npm ci`, `npm run build`, `npm test`, and `npm pack`. For a release, bump the package version, commit the source and generated assets, tag that commit, and attach the tarball to its GitHub release. Copy the release to each consumer and run `npm install ./vendor/cristonj-project-footer-VERSION.tgz`. Commit the artifact and lockfile with the app integration. Never edit node_modules or maintain separate component copies.
