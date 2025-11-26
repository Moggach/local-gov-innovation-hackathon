# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Vite + React scaffold and counter demo (`src/App.tsx`).
- Tooling setup (`npm run dev`, `npm run build`, `npm run lint`, `npm run preview`).
- Devcontainer provisioning for Codespaces/Dev Containers with Node 20 and Pandoc.
- Vitest + Testing Library tooling (`package.json`, `vitest.config.ts`, `src/App.test.tsx`, `src/setupTests.ts`).
- Enforced LF line endings across platforms via `.gitattributes`.

### Changed

- Converted Word documentation in `docs/` to Markdown companions and moved originals into `docs/docx/` for easier diffing.
- Exposed the Vite dev server on all interfaces via `vite.config.ts` to simplify container access.

### Fixed

- Imported `cases` data in `src/PersonPage.tsx` so person detail routes render correctly.

## [0.1.0] - 2025-11-26

- Baseline project bootstrapped from Vite React TypeScript template.
