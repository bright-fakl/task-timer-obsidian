# Testing the Template

This guide covers testing strategies for contributors working on the template itself.

## Overview

This guide is for contributors who want to test the **template itself** - ensuring the infrastructure, documentation, and example plugin work correctly. If you're creating a new plugin using this template, see [Plugin Testing](/template/testing) instead.

## Testing Strategy

### What to Test as a Template Contributor

1. **Template Infrastructure**
   - Build process works correctly
   - TypeScript compilation succeeds
   - Testing framework is functional

2. **Documentation**
   - All pages build without errors
   - Internal links work correctly
   - Examples are accurate and up-to-date

3. **Example Plugin**
   - Example plugin functionality works
   - Settings persist correctly
   - Commands register and execute

4. **Documentation Site**
   - VitePress builds successfully
   - Navigation is correct
   - Links are valid

## Testing Commands

### Full Testing Suite

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Build documentation
npm run docs:build

# Test build process
npm run build
```

### Individual Test Commands

```bash
# Just run unit tests
npm test

# Watch mode for development
npm run test:watch

# Test documentation building
npm run docs:dev

# Test TypeScript compilation
npx tsc --noEmit
```

## Testing Documentation

### Documentation Build Test

```bash
# Build documentation
npm run docs:build

# Check for broken links
npm run docs:build

# Preview built documentation
npm run docs:preview
```

### Link Validation

Check these internal links in documentation:

- **Navigation links** work in sidebar
- **Cross-references** between sections are correct
- **Example code** links to correct files
- **GitHub links** point to correct repository

### Documentation Content Validation

Verify that documentation examples:

- ✅ Are accurate and up-to-date
- ✅ Link to correct files and sections
- ✅ Use correct repository URLs
- ✅ Show current API methods

## Testing Template Components

### Build Process

```bash
# Test development build
npm run dev

# Test production build
npm run build

# Verify output files
ls -la main.js manifest.json
```

### TypeScript Configuration

```bash
# Check for type errors
npx tsc --noEmit

# Verify path aliases work
npx tsc --showConfig
```

### Testing Infrastructure

```bash
# Verify test setup
npm test

# Check test coverage
npm run test:coverage

# Test in watch mode
npm run test:watch
```

## Example Plugin Testing

### Manual Testing

1. **Build the example plugin**:
   ```bash
   npm run build
   ```

2. **Copy to test vault**:
   ```bash
   cp main.js manifest.json ~/TestVault/.obsidian/plugins/example-plugin/
   ```

3. **Test in Obsidian**:
   - Enable plugin
   - Test text transformation
   - Verify settings work
   - Check for console errors

### Automated Testing

The template includes tests for:

```typescript
// tests/plugin.test.ts - Plugin lifecycle
describe('ExamplePlugin', () => {
  it('should load settings on initialization', async () => {
    await plugin.onload();
    expect(plugin.settings).toBeDefined();
  });
});

// tests/settings.test.ts - Settings functionality
describe('Settings', () => {
  it('should have correct defaults', () => {
    expect(DEFAULT_SETTINGS.transformMode).toBe('uppercase');
  });
});
```

## Documentation Testing

### Content Validation

Check that documentation accurately reflects the current template:

1. **API Documentation** - Matches actual methods and interfaces
2. **Code Examples** - Work with current template code
3. **File References** - Point to existing files
4. **Link Validation** - All links resolve correctly

### Cross-Reference Testing

Verify links between sections:

- Template usage → Example plugin
- Example plugin → Template architecture
- Contributing guides → Development setup

## Testing Checklist

### Pre-Release Testing

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Documentation builds: `npm run docs:build`
- [ ] No type errors: `npx tsc --noEmit`
- [ ] Example plugin works in Obsidian
- [ ] All internal links work
- [ ] GitHub URLs are correct

### Documentation Testing

- [ ] Home page routes correctly
- [ ] Template section is complete
- [ ] Example section is accurate
- [ ] Contributing section is clear
- [ ] No broken internal links
- [ ] Cross-references work

### Template Testing

- [ ] Clone process works
- [ ] Installation instructions are accurate
- [ ] Customization guide is complete
- [ ] Testing setup is functional
- [ ] Deployment guide is correct

## Common Issues

### Build Failures

**Problem**: `npm run build` fails
**Solution**: Check for TypeScript errors, missing dependencies

**Problem**: Documentation build fails
**Solution**: Check for broken links, invalid markdown

### Test Failures

**Problem**: Tests don't run
**Solution**: Verify dependencies, check test configuration

**Problem**: Example plugin tests fail
**Solution**: Check mock setup, verify plugin code

### Documentation Issues

**Problem**: Links don't work
**Solution**: Check file paths, verify file existence

**Problem**: Navigation missing
**Solution**: Update VitePress config, check sidebar configuration

## CI/CD Testing

### GitHub Actions

The template includes automated testing:

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
      - run: npm run docs:build
```

### Automated Checks

- ✅ **Tests pass** on every commit
- ✅ **Build succeeds** for production
- ✅ **Documentation builds** without errors
- ✅ **No type errors** in TypeScript

## Manual Testing Scenarios

### Template User Journey

1. **Clone template** - Follow getting started guide
2. **Customize plugin** - Modify example code
3. **Build and test** - Use build commands
4. **Deploy plugin** - Follow deployment guide

### Example Plugin User Journey

1. **Install plugin** - Follow installation guide
2. **Use functionality** - Test text transformation
3. **Configure settings** - Change preferences
4. **Verify persistence** - Settings survive restart

### Contributor Journey

1. **Fork repository** - Follow development setup
2. **Make changes** - Add features or fix bugs
3. **Test changes** - Run test suite
4. **Submit PR** - Follow contributing guide

## Testing Resources

- [Vitest Documentation](https://vitest.dev/)
- [VitePress Guide](https://vitepress.dev/)
- [TypeScript Testing](https://typescript-eslint.io/docs/linting/testing)
- [Plugin Testing Guide](/template/testing)

## Next Steps

- [Submit your first contribution](/contributing/index)
- [Set up development environment](/contributing/development-setup)