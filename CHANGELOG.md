# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- `README.md` with project overview, architecture, setup, and current project health.
- `docs/architecture.md` with a diagram-style architecture overview.

### Changed
- Updated Angular toolchain and build dependencies to a stable Angular 22 setup.
- Upgraded TypeScript and compatible ESLint/Capacitor tooling versions.
- Added project health notes documenting remaining tooling advisories after audit fixes.

### Fixed
- Resolved dependency mismatches to restore a successful `npm run build-dev`.
- Verified `npm test -- --watch=false` passes.
