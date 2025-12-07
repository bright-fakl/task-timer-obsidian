# Development Setup for Contributors

This guide helps contributors set up their development environment for working on the template.

## Prerequisites

### Required Software

- **Node.js** (v16 or later) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Obsidian** (latest version) - [Download](https://obsidian.md/)

### Recommended Tools

- **VS Code** - [Download](https://code.visualstudio.com/)
- **GitHub Desktop** (optional) - [Download](https://desktop.github.com/)

## Local Development Setup

### 1. Fork the Repository

1. Go to [https://github.com/bright-fakl/obsidian-plugin-template](https://github.com/bright-fakl/obsidian-plugin-template)
2. Click **"Fork"** button
3. Clone your fork locally

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/obsidian-plugin-template.git
cd obsidian-plugin-template
```

### 3. Set Up Upstream Remote

```bash
# Add upstream remote for syncing
git remote add upstream https://github.com/bright-fakl/obsidian-plugin-template.git

# Verify remotes
git remote -v
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Verify Setup

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Run tests to verify setup
npm test
```

## Development Workflow

### Starting Development

```bash
# Start development build (watches for changes)
npm run dev

# In another terminal, start docs development
npm run docs:dev
```

### Testing Changes

#### Automated Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

#### Manual Testing

1. **Build the plugin**:
   ```bash
   npm run build
   ```

2. **Create test vault** (if you don't have one):
   ```
   mkdir ~/ObsidianTestVault
   cd ~/ObsidianTestVault
   # Open with Obsidian to initialize
   ```

3. **Copy plugin files**:
   ```bash
   cp main.js manifest.json ~/ObsidianTestVault/.obsidian/plugins/example-plugin/
   ```

4. **Test in Obsidian**:
   - Open your test vault
   - Enable the plugin
   - Test functionality
   - Check developer console (`Ctrl/Cmd + Shift + I`)

### Making Changes

#### Create Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

#### Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Examples
git commit -m "feat: add new transformation mode"
git commit -m "fix: resolve text selection bug"
git commit -m "docs: update installation guide"
git commit -m "test: add unit tests for settings"
```

#### Push Changes

```bash
# Push to your fork
git push origin feature/your-feature-name
```

## Testing Strategy

### Unit Tests

Test individual functions and components:

```typescript
// tests/transform-text.test.ts
import { describe, it, expect } from 'vitest';
import { transformText } from '../src/utils/transform-text';

describe('transformText', () => {
  it('should convert to uppercase', () => {
    const result = transformText('hello', 'uppercase');
    expect(result).toBe('HELLO');
  });
});
```

### Integration Tests

Test plugin lifecycle and interactions:

```typescript
// tests/plugin.test.ts
describe('Plugin initialization', () => {
  it('should load settings on startup', async () => {
    await plugin.onload();
    expect(plugin.settings).toBeDefined();
  });
});
```

### Manual Testing Checklist

- [ ] Plugin loads without errors
- [ ] Settings tab appears
- [ ] Commands work correctly
- [ ] Settings persist across restarts
- [ ] No console errors
- [ ] Works on mobile (if applicable)

## Documentation Development

### Building Documentation

```bash
# Development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

### Documentation Structure

- **Template docs** (`docs-site/template/`) - For template users
- **Example docs** (`docs-site/example/`) - For example plugin users
- **Contributing docs** (`docs-site/contributing/`) - For contributors

### Testing Documentation Links

```bash
# Build docs and check for broken links
npm run docs:build

# Check .vitepress/dist for build output
ls -la docs-site/.vitepress/dist/
```

## Code Quality Tools

### Linting

The template includes ESLint configuration:

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Type Checking

```bash
# Run TypeScript compiler check
npx tsc --noEmit
```

## Debugging

### Common Issues

#### Plugin Not Loading

**Check**:
- `main.js` and `manifest.json` exist
- Plugin is enabled in Obsidian
- No syntax errors in console

**Fix**:
```bash
# Rebuild
npm run build

# Check for errors
npm run test
```

#### Settings Not Saving

**Check**:
- Vault has write permissions
- Plugin has data access
- No console errors

**Debug**:
```typescript
// Add to plugin code
console.log('Saving settings:', this.settings);
await this.saveData(this.settings);
console.log('Settings saved');
```

#### Tests Failing

**Check**:
- Dependencies installed: `npm install`
- Test environment: Node.js version
- Mock setup correct

**Debug**:
```bash
# Run single test
npm test -- transform-text.test.ts

# Debug mode
npm test -- --reporter=verbose
```

## Submitting Changes

### Pull Request Process

1. **Create PR** from your feature branch
2. **Fill out PR template** completely
3. **Request review** from maintainers
4. **Address feedback** and make changes
5. **Get approval** and merge

### PR Checklist

- [ ] Tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Documentation updated
- [ ] Manual testing completed
- [ ] No console errors
- [ ] Code follows style guidelines

## Staying Updated

### Sync with Upstream

```bash
# Regularly sync your fork
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Handle Conflicts

```bash
# If you have conflicts
git pull upstream main
# Resolve conflicts in your editor
git add .
git commit
```

## Getting Help

- **Issues** - Report bugs in the template
- **Discussions** - Ask questions about contributing
- **Documentation** - Check existing guides first

## Next Steps

- [Learn about testing](/contributing/testing)
- [Submit your first PR](/contributing/index)