# Testing Your Plugin

This guide covers testing strategies and best practices for your Obsidian plugin.

## Overview

This template includes comprehensive testing setup using Vitest:

- **Unit Tests** - Test individual functions and components
- **Integration Tests** - Test plugin integration with Obsidian
- **Mock Obsidian API** - Isolated testing without Obsidian dependency

## Testing Setup

### Prerequisites

The template comes with testing pre-configured:

- **Vitest** - Fast testing framework
- **JSDOM** - DOM environment for testing
- **Mock Obsidian API** - Isolated testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Writing Tests

### Unit Tests

Test individual functions and methods:

```typescript
// tests/transform-text.test.ts
import { describe, it, expect } from 'vitest';
import { transformText } from '../src/utils/transform-text';

describe('transformText', () => {
  it('should convert to uppercase', () => {
    const result = transformText('hello', 'uppercase');
    expect(result).toBe('HELLO');
  });

  it('should convert to lowercase', () => {
    const result = transformText('HELLO', 'lowercase');
    expect(result).toBe('hello');
  });

  it('should convert to title case', () => {
    const result = transformText('hello world', 'title');
    expect(result).toBe('Hello World');
  });
});
```

### Plugin Integration Tests

Test plugin lifecycle and integration:

```typescript
// tests/plugin.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from 'obsidian';
import ExamplePlugin from '../src/main';

describe('ExamplePlugin', () => {
  let app: App;
  let plugin: ExamplePlugin;

  beforeEach(() => {
    app = new App();
    plugin = new ExamplePlugin(app, {
      id: 'example-plugin',
      name: 'Example Plugin',
      version: '1.0.0',
      minAppVersion: '1.0.0',
      description: 'Test plugin',
      author: 'Test Author',
    });
  });

  it('should load settings on initialization', async () => {
    await plugin.onload();
    expect(plugin.settings).toBeDefined();
    expect(plugin.settings.transformMode).toBe('uppercase');
  });

  it('should register commands', async () => {
    await plugin.onload();
    // Check that commands were registered
    expect(plugin.app.commands.commands['example-plugin:transform-selected-text']).toBeDefined();
  });
});
```

### Settings Tests

Test settings functionality:

```typescript
// tests/settings.test.ts
import { describe, it, expect } from 'vitest';
import { DEFAULT_SETTINGS, migrateSettings } from '../src/settings/plugin-settings';

describe('Settings', () => {
  it('should have correct default settings', () => {
    expect(DEFAULT_SETTINGS.transformMode).toBe('uppercase');
    expect(DEFAULT_SETTINGS.showNotices).toBe(true);
  });

  it('should migrate old settings', () => {
    const oldSettings = {
      transformMode: 'uppercase',
      // Missing showNotices
    };

    const migrated = migrateSettings(oldSettings);
    expect(migrated.showNotices).toBe(true); // Should use default
  });
});
```

## Mock Obsidian API

The template includes comprehensive mocks for testing:

### Available Mocks

```typescript
// tests/__mocks__/obsidian.ts
export class TFile {
  constructor(public path: string, public basename: string = "") {}
}

export class TFolder {
  constructor(public path: string) {}
}

export class Vault {
  getMarkdownFiles(): TFile[] {
    return [];
  }
}

export class MetadataCache {
  getFileCache(file: TFile): any {
    return null;
  }
}

export class App {
  vault = new Vault();
  metadataCache = new MetadataCache();
}

export class Plugin {
  app!: App;
  manifest!: any;

  loadData(): Promise<any> {
    return Promise.resolve({});
  }

  saveData(data: any): Promise<void> {
    return Promise.resolve();
  }
}
```

### Using Mocks in Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { App, Plugin } from 'obsidian';

describe('Plugin with mocks', () => {
  let app: App;
  let plugin: Plugin;

  beforeEach(() => {
    app = new App();
    plugin = new Plugin();
    plugin.app = app;
  });

  it('should work with mocked app', () => {
    expect(plugin.app.vault).toBeDefined();
  });
});
```

## Testing Best Practices

### 1. Test Structure

```typescript
describe('Feature Name', () => {
  describe('when condition', () => {
    it('should behave correctly', () => {
      // Test implementation
    });
  });
});
```

### 2. Test Naming

```typescript
// Good
it('should convert selected text to uppercase')
it('should show notice after transformation')
it('should save settings to disk')

// Avoid
it('test 1')
it('works')
it('fix bug')
```

### 3. Arrange, Act, Assert

```typescript
it('should transform text correctly', () => {
  // Arrange
  const plugin = new ExamplePlugin(app, manifest);
  const input = 'hello world';

  // Act
  const result = plugin.transformText(input, 'uppercase');

  // Assert
  expect(result).toBe('HELLO WORLD');
});
```

### 4. Test Edge Cases

```typescript
describe('transformText edge cases', () => {
  it('should handle empty string', () => {
    expect(transformText('', 'uppercase')).toBe('');
  });

  it('should handle null input', () => {
    expect(transformText(null, 'uppercase')).toBe('');
  });

  it('should handle special characters', () => {
    expect(transformText('café', 'uppercase')).toBe('CAFÉ');
  });
});
```

### 5. Mock External Dependencies

```typescript
it('should handle vault errors gracefully', async () => {
  // Mock vault to throw error
  const mockVault = {
    read: vi.fn().mockRejectedValue(new Error('Vault error')),
  };

  app.vault = mockVault;

  await expect(plugin.loadSettings()).rejects.toThrow('Vault error');
});
```

## Testing Configuration

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'forks',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', 'tests/integration/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'tests/**',
        '*.config.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'obsidian': path.resolve(__dirname, './tests/__mocks__/obsidian.ts'),
    },
  },
});
```

### Coverage Configuration

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    'node_modules/**',
    'tests/**',
    '*.config.*',
  ],
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## Continuous Integration

### GitHub Actions Testing

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run coverage
        run: npm run test:coverage
```

## Testing Guidelines

### What to Test

- ✅ **Core functionality** - Main plugin features
- ✅ **Settings** - Loading, saving, migration
- ✅ **Commands** - Registration and execution
- ✅ **Error handling** - Edge cases and failures
- ✅ **Integration** - Plugin lifecycle

### What Not to Test

- ❌ **Obsidian internals** - Assume Obsidian API works
- ❌ **External libraries** - Test your code, not dependencies
- ❌ **UI rendering** - Focus on logic, not DOM manipulation

### Test Categories

1. **Unit Tests** - Test individual functions
2. **Integration Tests** - Test component interaction
3. **End-to-End Tests** - Test complete workflows (if applicable)

## Debugging Tests

### Common Issues

1. **Mock not working** - Check import order
2. **Async tests** - Use `await` and return promises
3. **DOM tests** - Ensure JSDOM environment
4. **Coverage issues** - Check exclude patterns

### Debugging Tips

```typescript
// Debug test values
console.log('Debug value:', someValue);

// Use debugger
debugger;

// Check mocks
expect(vi.mocked(app.vault.read)).toHaveBeenCalledWith('settings.json');
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Obsidian Plugin Testing Guide](https://github.com/bright-fakl/obsidian-plugin-template/blob/main/tests/TESTING.md)

## Next Steps

- Prepare for [Deployment](/template/deployment)
- Check the [API Reference](/template/api) for detailed documentation
- Update documentation in [`docs-site/example/`](/example/) for your plugin