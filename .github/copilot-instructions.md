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
- Preview the production build locally via `npm run preview` after running the build.

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
- Commit only source files—`dist/` is ignored via `globalIgnores(['dist'])`, so rely on the build step rather than checking in artifacts.
