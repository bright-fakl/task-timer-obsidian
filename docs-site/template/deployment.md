# Deployment Guide

This guide covers how to build, test, and deploy your Obsidian plugin created from this template.

## Step-by-Step Deployment Process

### 1. Pre-Deployment Preparation
**Purpose**: Ensure your code is ready for deployment

**Actions**:
```bash
# Run all tests
npm test

# Check TypeScript
npx tsc --noEmit

# Verify build succeeds
npm run build
```

**Manual Testing Checklist**:
- [ ] Plugin loads without errors
- [ ] All commands work
- [ ] Settings save and persist
- [ ] No console errors
- [ ] Works on target platforms (Desktop/Mobile)

### 2. Update Documentation
**Purpose**: Ensure all documentation is current

**Actions**:
- Update README.md with plugin-specific information
- Update plugin documentation to include new features and changes
- Locally test documentation build and preview
```bash
# Build and preview documentation locally
npm run docs:build
npm run docs:preview
```

<details>
<summary>Documentation Deployment</summary>

A workflow for automatically deploying documentation to GitHub Pages is included in the template. The workflow is triggered on pushes to the `main` branch and builds the documentation using VitePress.

To set up GitHub Pages for documentation deployment in your repository:

**Enable GitHub Pages** in your repository settings:
  - Go to Settings → Pages
  - Select `GitHub Actions` as the source
</details>

### 3. Production Build
**Purpose**: Create optimized production build

**Actions**:
```bash
# Clean previous builds
rm -rf main.js *.js.map

# Install fresh dependencies
npm install

# Run production build
npm run build

# Verify build output
ls -la main.js manifest.json
du -h main.js manifest.json
```

### 4. Test Production Build
**Purpose**: Validate the production build works in a clean environment

**Actions**:
- Test in a clean Obsidian vault
- Enable plugin
- Test all functionality
- Check for errors

<details class="manual">
<summary>Testing in Separate Obsidian Vault</summary>

If you need to test in a separate vault:
```bash
# Copy to test vault
cp main.js manifest.json ~/TestVault/.obsidian/plugins/your-plugin-name/
```
</details>

### 5. Update Version and Changelog
**Purpose**: Prepare for release

**Actions**:
- Update version in `manifest.json` and `package.json`
```bash
# Update version (automated)
npm run version 1.0.0
```
- Update CHANGELOG.md with release notes following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format:
```markdown
## [1.0.0] - 2024-01-01

### Added
- New feature descriptions

### Changed
- Improvements made

### Fixed
- Bug fixes
```
- Commit and push changes 
```bash
git commit -am "Release v1.0.0"
git push origin main
```

<details class="manual">
<summary>Alternative: Manual Version Update</summary>

If you prefer to update the version manually:

**Update `manifest.json`**:
```json
{
  "version": "1.0.0",
  "minAppVersion": "1.5.0",
  "id": "your-plugin-id",
  "name": "Your Plugin Name"
}
```

**Update `package.json`**:
```json
{
  "version": "1.0.0",
  "name": "obsidian-your-plugin-name"
}
```
</details>

### 6. Create Git Tag and Release
**Purpose**: Create version tag and release

**Actions**:
```bash
# Create and push tag
git tag 1.0.0
git push origin 1.0.0
```

The GitHub Action will automatically:
- Build your plugin
- Create a GitHub release
- Upload `main.js` and `manifest.json` as release assets

<details class="manual">
<summary>Alternative: Manual Release Process</summary>

If you prefer manual control over releases:

1. **Create release notes**:
   ```bash
   git tag 1.0.0
   git push origin 1.0.0
   ```

2. **Go to GitHub releases**: https://github.com/yourusername/your-plugin/releases

3. **Create new release**:
   - Tag version: `1.0.0`
   - Release title: `v1.0.0`
   - Description: Include changelog and installation instructions

4. **Upload assets**:
   - `main.js` - Main plugin file
   - `manifest.json` - Plugin manifest
</details>

### 7. Submit to Community Plugin Directory
**Purpose**: Make plugin available to users

**Actions**:
1. Fork https://github.com/obsidianmd/obsidian-releases
2. Add plugin entry to `community-plugins.json`
3. Submit pull request

<details>
<summary>Plugin Entry Example</summary>

```json
{
  "id": "your-plugin-id",
  "name": "Your Plugin Name",
  "author": "Your Name",
  "description": "Brief description",
  "repo": "yourusername/your-plugin-repo"
}
```
</details>

### 8. Post-Deployment Monitoring
**Purpose**: Monitor and maintain the release

**Actions**:
- Monitor GitHub issues
- Track download counts
- Respond to user feedback
- Plan next updates

## Distribution Strategies

### GitHub Releases vs Community Plugin Directory

| Aspect | GitHub Releases | Community Plugin Directory |
|-------|----------------|---------------------------|
| **Installation** | Manual download | One-click |
| **Updates** | Manual | Automatic |
| **Discoverability** | Low | High |
| **Review Process** | None | Required |
| **Best For** | Development, testing | Production, users |

### Recommended Approach

Use **both** strategies:
1. **Community Plugin Directory** - For easy user installation
2. **GitHub Releases** - For development builds and beta testing

## Build Optimization

The template includes optimized build configuration. For advanced build optimization, you can modify the Rollup configuration:

```javascript
// rollup.config.mjs - Optimize build output
export default {
  output: {
    format: 'cjs',
    sourcemap: false, // Disable for production
    compact: true,    // Minimize output
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false, // Disable for production
    })
  ]
};
```

## Troubleshooting

### Common Build Issues

#### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit

# Fix common issues:
# - Missing type annotations
# - Incorrect imports
# - Missing null checks
```

#### Rollup Build Failures
```bash
# Check external dependencies
# - Ensure 'obsidian' is marked as external
# - Check import paths
# - Verify plugin configuration
```

#### Plugin Loading Issues
- **Check manifest.json** is valid JSON
- **Verify main.js** exists and is correct format
- **Test in clean vault** to rule out conflicts

### Testing Issues

#### Tests Not Running
```bash
# Check test configuration
# - Verify vitest.config.ts
# - Check test file patterns
# - Ensure dependencies installed
```

#### Plugin Tests Failing
```bash
# Check mock setup
# - Verify obsidian.ts mocks
# - Check plugin initialization
# - Test in isolation
```

## Security Considerations

### Code Security
- **No hardcoded secrets** in source code
- **Validate user inputs** properly
- **Use HTTPS** for any network requests
- **Review dependencies** for vulnerabilities

```bash
# Check for security vulnerabilities
npm audit

# Fix automatically
npm audit fix
```

### Distribution Security
- **Sign releases** (optional)
- **Provide checksums** for files
- **Use official channels** for distribution
- **Monitor for unauthorized copies**

## Legal Considerations

### Licensing
1. **Choose appropriate license** (MIT recommended)
2. **Include license file** in repository
3. **Respect third-party licenses** for dependencies

### Privacy
- **No data collection** without user consent
- **Local storage only** unless explicitly stated
- **Clear privacy policy** if applicable


## Getting Help

1. **[GitHub Issues](https://github.com/bright-fakl/obsidian-plugin-template/issues)** - For bugs, feature requests, and general questions
2. **[Documentation](/)** - Template and API documentation
3. **[Obsidian Developer Resources](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)** - Official Obsidian plugin development guides

## Next Steps

- [Set up automated testing](/template/testing)