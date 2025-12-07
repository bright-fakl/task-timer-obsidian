# Testing Guide

This guide explains how to set up and write tests for your Obsidian plugin.

## Overview

This template uses [Vitest](https://vitest.dev/) for testing, which provides a fast and modern testing experience with built-in TypeScript support.

## Test Setup

### Dependencies

The following testing dependencies are already configured in `package.json`:

- `vitest` - Test framework
- `@vitest/ui` - Web UI for tests
- `@vitest/coverage-v8` - Code coverage
- `jsdom` - DOM environment for testing
- `happy-dom` - Alternative DOM environment

### Configuration

Test configuration is in [`vitest.config.ts`](vitest.config.ts). Key features:

- **Globals enabled**: Use `describe`, `it`, `expect` without imports
- **JSDOM environment**: Simulates browser environment
- **Path aliases**: Use `@/` to import from `src/`
- **Obsidian mocking**: Automatically mocks `obsidian` module

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with web UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

### Test File Location

Place test files in the `tests/` directory with the `.test.ts` extension:

```
tests/
├── __mocks__/
│   └── obsidian.ts           # Obsidian API mock
├── plugin-settings.test.ts   # Example test
└── TESTING.md                # This file
```

### Example Test

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from 'obsidian';
import { ExamplePluginSettings, DEFAULT_SETTINGS, migrateSettings } from '../src/settings/plugin-settings';

describe('Plugin Settings', () => {
  let settings: ExamplePluginSettings;

  beforeEach(() => {
    settings = { ...DEFAULT_SETTINGS };
  });

  it('should have correct default settings', () => {
    expect(DEFAULT_SETTINGS.transformMode).toBe('uppercase');
    expect(DEFAULT_SETTINGS.showNotices).toBe(true);
  });

  it('should migrate invalid settings', () => {
    settings.transformMode = 'invalid' as any;
    migrateSettings(settings);
    expect(settings.transformMode).toBe('uppercase');
  });
});
```

### Testing with Obsidian Mocks

The `tests/__mocks__/obsidian.ts` file provides mocks for common Obsidian classes:

```typescript
import { describe, it, expect } from 'vitest';
import { Notice, Editor } from 'obsidian';

describe('Text Transformation', () => {
  it('should create a notice', () => {
    const notice = new Notice('Test message');
    expect(notice).toBeDefined();
  });

  it('should get editor selection', () => {
    const editor = new Editor();
    const selection = editor.getSelection();
    expect(selection).toBe('');
  });
});
```

## Testing Best Practices

### 1. Test Structure

Use descriptive test names and organize with `describe` blocks:

```typescript
describe('FeatureName', () => {
  describe('when condition', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = transform(input);
      
      // Assert
      expect(result).toBe('TEST');
    });
  });
});
```

### 2. Use beforeEach for Setup

Reset state before each test:

```typescript
describe('Component', () => {
  let component: YourComponent;

  beforeEach(() => {
    component = new YourComponent();
  });

  it('should initialize', () => {
    expect(component).toBeDefined();
  });
});
```

### 3. Test Edge Cases

Don't just test the happy path:

```typescript
describe('transformText', () => {
  it('should handle empty strings', () => {
    expect(transformText('')).toBe('');
  });

  it('should handle null values', () => {
    expect(transformText(null)).toBe('');
  });

  it('should handle unicode characters', () => {
    expect(transformText('café')).toBe('CAFÉ');
  });
});
```

### 4. Mock External Dependencies

Use Vitest's mocking capabilities for complex dependencies:

```typescript
import { vi } from 'vitest';

describe('File operations', () => {
  it('should read file', async () => {
    const mockRead = vi.fn().mockResolvedValue('content');
    const vault = { read: mockRead };
    
    const result = await vault.read(file);
    
    expect(mockRead).toHaveBeenCalledWith(file);
    expect(result).toBe('content');
  });
});
```

## Code Coverage

View coverage reports after running `npm run test:coverage`:

- Terminal output: Shows coverage percentages
- HTML report: Open `coverage/index.html` in a browser

Aim for:
- **80%+ statement coverage**: Most code paths tested
- **70%+ branch coverage**: Most conditions tested
- **80%+ function coverage**: Most functions tested

## Common Testing Patterns

### Testing Settings

```typescript
it('should save and load settings', async () => {
  const plugin = new ExamplePlugin();
  plugin.settings.transformMode = 'lowercase';
  
  await plugin.saveSettings();
  await plugin.loadSettings();
  
  expect(plugin.settings.transformMode).toBe('lowercase');
});
```

### Testing Commands

```typescript
it('should transform selected text', () => {
  const editor = new Editor();
  editor.getSelection = vi.fn().mockReturnValue('hello');
  editor.replaceSelection = vi.fn();
  
  plugin.transformText(editor);
  
  expect(editor.replaceSelection).toHaveBeenCalledWith('HELLO');
});
```

### Testing UI Components

```typescript
it('should render component', () => {
  const container = document.createElement('div');
  const component = new YourComponent();
  
  component.render(container);
  
  expect(container.children.length).toBeGreaterThan(0);
  expect(container.textContent).toContain('Expected text');
});
```

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors in tests:

1. Ensure `vitest/globals` is in `tsconfig.json` types
2. Check that path aliases are configured in `vitest.config.ts`
3. Verify imports use correct paths

### Mock Not Working

If Obsidian mocks aren't working:

1. Check `vitest.config.ts` has the correct alias
2. Ensure mock file is at `tests/__mocks__/obsidian.ts`
3. Try restarting the test watcher

### Test Fails in CI

If tests pass locally but fail in CI:

1. Check for timezone-dependent tests
2. Look for file system path issues
3. Ensure all dependencies are in `devDependencies`

## Next Steps

- Add tests as you add features
- Run tests before committing code
- Configure CI to run tests automatically
- Monitor code coverage trends

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)