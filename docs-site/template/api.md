# API Reference

Complete API documentation for the Obsidian Plugin Template.

## Plugin Class

### `ExamplePlugin`

Main plugin class extending Obsidian's `Plugin`.

#### Properties

- `settings: ExamplePluginSettings` - Plugin configuration
- `app: App` - Obsidian app instance (inherited)
- `manifest: PluginManifest` - Plugin metadata (inherited)

#### Methods

##### `onload(): Promise<void>`

Initializes the plugin.

**Called by**: Obsidian when plugin is loaded

**Responsibilities**:
- Load settings from disk
- Register settings tab
- Register commands
- Register event handlers

##### `onunload(): Promise<void>`

Cleans up plugin resources.

**Called by**: Obsidian when plugin is unloaded

**Responsibilities**:
- Detach custom views
- Unregister event handlers
- Save final settings

##### `loadSettings(): Promise<void>`

Loads settings from Obsidian's data storage.

**Implementation**:
```typescript
async loadSettings(): Promise<void> {
  const data = await this.loadData();
  this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
  migrateSettings(this.settings);
  await this.saveSettings();
}
```

##### `saveSettings(): Promise<void>`

Persists settings to Obsidian's data storage.

**Implementation**:
```typescript
async saveSettings(): Promise<void> {
  await this.saveData(this.settings);
}
```

##### `transformText(text: string, mode: TransformMode): string`

Transforms text according to the specified mode.

**Parameters**:
- `text: string` - Text to transform
- `mode: TransformMode` - Transformation mode

**Returns**: `string` - Transformed text

**Example**:
```typescript
const result = plugin.transformText('hello world', 'uppercase');
// Returns: 'HELLO WORLD'
```

## Settings

### `ExamplePluginSettings` Interface

```typescript
interface ExamplePluginSettings {
  transformMode: 'uppercase' | 'lowercase' | 'title';
  showNotices: boolean;
}
```

### `DEFAULT_SETTINGS`

Default plugin settings.

```typescript
const DEFAULT_SETTINGS: ExamplePluginSettings = {
  transformMode: 'uppercase',
  showNotices: true,
};
```

### `migrateSettings(settings: any): ExamplePluginSettings`

Migrates settings from old versions to current format.

**When Migration Occurs**:
- When plugin version changes
- When settings structure evolves
- When new settings are added or old ones are removed

**Parameters**:
- `settings: any` - Raw settings data

**Returns**: `ExamplePluginSettings` - Migrated settings

**Example**:
```typescript
// Settings migration ensures backward compatibility
// If you add new settings in a future version:
// 1. Update the DEFAULT_SETTINGS object
// 2. The migration function will handle the transition
// 3. Users won't lose their existing preferences
```

## Settings Tab

### `ExamplePluginSettingsTab`

Settings UI class extending Obsidian's `PluginSettingTab`.

#### Methods

##### `display(): void`

Renders the settings UI.

**Implementation**:
```typescript
display(): void {
  const { containerEl } = this;
  containerEl.empty();

  // Add settings controls
}
```

## Commands

### Command Registration

Commands are registered in the `onload()` method:

```typescript
this.addCommand({
  id: 'example-plugin:transform-selected-text',
  name: 'Transform selected text',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    const selectedText = editor.getSelection();
    const transformed = this.transformText(selectedText, this.settings.transformMode);
    editor.replaceSelection(transformed);

    if (this.settings.showNotices) {
      new Notice('Text transformed!');
    }
  },
});
```

### Available Commands

#### `transform-selected-text`

Transforms selected text in the editor.

**Context**: Editor with text selected
**Shortcut**: None (configurable by user)

## Events

### Registered Events

The plugin registers the following events:

```typescript
// No events registered in base template
// Add custom events as needed
```

## Utility Functions

### Text Transformation

#### `transformText(text: string, mode: string): string`

Core text transformation logic.

**Parameters**:
- `text: string` - Input text
- `mode: string` - Transformation mode

**Supported Modes**:
- `'uppercase'` - Convert to uppercase
- `'lowercase'` - Convert to lowercase
- `'title'` - Convert to title case

**Implementation**:
```typescript
private transformText(text: string, mode: string): string {
  switch (mode) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'title':
      return this.toTitleCase(text);
    default:
      return text;
  }
}
```

#### `toTitleCase(text: string): string`

Converts text to title case.

**Parameters**:
- `text: string` - Input text

**Returns**: `string` - Title case text

**Implementation**:
```typescript
private toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}
```

## Type Definitions

### `TransformMode`

```typescript
type TransformMode = 'uppercase' | 'lowercase' | 'title';
```

## Error Handling

### Error Types

The plugin handles the following error scenarios:

1. **Invalid settings** - Falls back to defaults
2. **Missing selection** - Shows user-friendly message
3. **Plugin initialization failures** - Logs errors without crashing

### Error Messages

- `"Please select some text to transform"` - When no text is selected
- `"Text transformed!"` - Success confirmation (if enabled)

## Configuration Files

### `manifest.json`

Obsidian plugin manifest.

```json
{
  "id": "example-plugin",
  "name": "Example Plugin",
  "version": "0.0.1",
  "minAppVersion": "1.5.0",
  "description": "Example plugin demonstrating text transformation",
  "author": "Your Name",
  "authorUrl": "https://github.com/yourusername",
  "isDesktopOnly": false
}
```

### `package.json`

NPM package configuration.

```json
{
  "name": "obsidian-example-plugin",
  "version": "0.0.1",
  "description": "Example plugin demonstrating text transformation",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "dev": "rollup -c -w",
    "build": "rollup -c",
    "version": "node scripts/version.js",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "docs:dev": "vitepress dev docs-site",
    "docs:build": "vitepress build docs-site",
    "docs:preview": "vitepress preview docs-site"
  }
}
```

## Build Configuration

### `tsconfig.json`

TypeScript configuration.

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ESNext",
    "lib": ["ES6", "DOM"],
    "moduleResolution": "node",
    "outDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["vitest/globals", "node"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}
```

### `rollup.config.mjs`

Build configuration.

```javascript
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/main.ts',
  output: {
    file: 'main.js',
    format: 'cjs'
  },
  external: ["obsidian"],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' })
  ]
};
```

### `vitest.config.ts`

Testing configuration.

```typescript
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
      exclude: ['node_modules/**', 'tests/**', '*.config.*'],
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

## Extension Points

### Adding New Commands

```typescript
this.addCommand({
  id: 'your-command-id',
  name: 'Your Command Name',
  callback: () => {
    // Command logic
  },
});
```

### Adding New Settings

1. Update `ExamplePluginSettings` interface
2. Add default value to `DEFAULT_SETTINGS`
3. Add UI control in `ExamplePluginSettingsTab.display()`
4. Use setting in plugin logic

### Adding Event Handlers

```typescript
this.registerEvent(
  this.app.workspace.on('file-open', (file) => {
    // Handle file open
  })
);
```

### Adding Views

```typescript
this.registerView(
  VIEW_TYPE_YOUR_PLUGIN,
  (leaf) => new YourPluginView(leaf)
);
```

## Testing

### Test Structure

```
tests/
├── __mocks__/
│   └── obsidian.ts    # Obsidian API mocks
├── helpers/           # Test helpers
└── *.test.ts         # Test files
```

### Example Test

```typescript
import { describe, it, expect } from 'vitest';
import ExamplePlugin from '../src/main';

describe('ExamplePlugin', () => {
  it('should transform text to uppercase', () => {
    const plugin = new ExamplePlugin(app, manifest);
    const result = plugin.transformText('hello', 'uppercase');
    expect(result).toBe('HELLO');
  });
});
```

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md:1) for version history.