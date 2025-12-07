# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-12-06
### Added
- Improved step-by-step deployment instructions with enhanced documentation
- Collapsible and styled details blocks in deployment documentation
- Manual workflow trigger option for documentation deployment

### Fixed
- Fixed GitHub Actions release workflow parameter name (`release_name` → `name`)
- Added proper permissions (`contents: write`) to release workflow
- Fixed ES module compatibility issue in version.js script (converted from CommonJS to ES module syntax)

### Note
- This release includes commits that were missing from previous releases due to incomplete push operations

## [1.0.1] - 2025-12-06

### Fixed
- Updated GitHub Actions workflow to use actions/upload-artifact@v4 instead of deprecated v3

## [1.0.0] - 2025-12-06

### Added
- Initial project structure with complete plugin functionality
- Text transformation command with multiple mode options
- Settings management system with configurable transformation modes
- Settings tab with user interface for configuration
- Complete testing infrastructure with Vitest
- VitePress documentation site with comprehensive guides
- MIT License
- GitHub Actions for automated releases and documentation deployment
- Testing setup with mocks and utilities

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

---