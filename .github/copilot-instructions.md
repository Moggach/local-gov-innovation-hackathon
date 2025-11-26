# Copilot Instructions
## Project Snapshot
- React 19 + TypeScript front-end scaffolded by Vite; the bundle is hydrated from `src/main.tsx`, which wraps `<App />` in `StrictMode` for dev-only safeguards.
- `vite.config.ts` only adds `@vitejs/plugin-react`; keep configuration minimal unless a feature demands extra plugins.
- TypeScript runs in bundler module mode with `strict` enabled, so every new file needs explicit types and clean imports.

## Layout & Responsibilities
- `src/App.tsx` is the current composition root; treat it as the place to wire new views or route loaders until a router is introduced.
- `src/assets/` stores assets imported through the module graph (e.g., `reactLogo`), while `public/` holds files served verbatim from the dev server root.
- Global CSS lives in `src/index.css`; component styling starts from `src/App.css` and uses simple class selectors instead of CSS modules.

## Build & Tooling
- Install once with `npm install`; use `npm run dev` for the Vite dev server with HMR.
- `npm run build` runs `tsc -b` before `vite build`, so fix type errors before expecting a production bundle.
- `npm run lint` uses the flat config in `eslint.config.js` (ES2020 globals + React Hooks + React Refresh rules).
- `npm test` executes Vitest in a jsdom environment with Testing Library helpers; use `npm run test:watch` while iterating.
- Generate coverage via `npm run test:coverage` (Vitest with the V8 coverage provider).
- Preview the production build locally via `npm run preview` after running the build.

## Changelog Discipline
- Every user-facing or developer-impacting change must add a bullet to the `[Unreleased]` section of the root `CHANGELOG.md`, grouped under a Keep a Changelog heading such as `### Added` or `### Fixed`.
- Write concise bullets referencing the affected module or script (e.g., `src/App.tsx` or `npm run build`).
- When preparing a release, move the curated `Unreleased` items into a dated version section following Semantic Versioning (e.g., `## [0.2.0] - 2025-12-01`).

## Coding Patterns
- Author components as plain functions and manage state with hooks; for example:
```tsx
const [count, setCount] = useState(0)
<button onClick={() => setCount((count) => count + 1)}>
```
- Prefer updater functions when mutating state so concurrent rendering stays predictable, mirroring the existing `setCount((count) => count + 1)` usage.
- Keep imports extension-aware: bundler resolution lets you import `.ts`/`.tsx` files without extensions, but assets like SVGs should be referenced via explicit paths (`/vite.svg` or module imports).

## Implementation Tips
- Any new root-level HTML or meta tags should go in `index.html`; Vite injects the build output automatically.
- If you introduce routing or state management, establish the entry point in `App.tsx` and leave `main.tsx` as the minimal renderer.
- Namespaces for DOM globals are provided by the ESLint config; avoid adding browser globals manually unless Vite cannot infer them.
- Line endings are normalized to LF via `.gitattributes`; editors on Windows should keep LF endings to avoid churn.
- Commit only source files—`dist/` is ignored via `globalIgnores(['dist'])`, so rely on the build step rather than checking in artifacts.
