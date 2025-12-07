# Plugin Architecture

This document explains the architecture and design patterns used in this Obsidian plugin template.

## Overview

This plugin follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│     Obsidian Application            │
│  (Provides: Vault, Workspace, etc.) │
└─────────────────────────────────────┘
                  ↕
┌─────────────────────────────────────┐
│        Plugin Layer                 │
│  - Plugin lifecycle (main.ts)       │
│  - Command registration             │
│  - Event handling                   │
└─────────────────────────────────────┘
                  ↕
┌─────────────────────────────────────┐
│      Settings Layer                 │
│  - Settings schema                  │
│  - Settings persistence             │
│  - Settings UI                      │
└─────────────────────────────────────┘
```

## Architecture Layers

### 1. Plugin Layer (`src/main.ts`)

**Responsibilities:**
- Plugin lifecycle management (`onload`, `onunload`)
- Command registration
- Event handler registration
- Integration with Obsidian API

**Key Methods:**
- `onload()` - Initialize plugin, register commands, load settings
- `onunload()` - Cleanup resources
- `loadSettings()` - Load settings from disk
- `saveSettings()` - Persist settings to disk

### 2. Settings Layer (`src/settings/`)

**Components:**
- **plugin-settings.ts** - Settings schema, defaults, and migration logic
- **settings-tab.ts** - Settings UI using Obsidian's Setting API

**Responsibilities:**
- Define plugin configuration schema
- Provide default values
- Handle settings migration across versions
- Render settings UI

## Core Components

### Plugin Class

Extends `Plugin` from Obsidian API.

**Properties:**
- `app: App` - Obsidian app instance (inherited)
- `settings: ExamplePluginSettings` - Plugin settings
- `manifest: PluginManifest` - Plugin metadata (inherited)

**Methods:**
- `onload(): Promise<void>` - Initialize plugin
- `onunload(): void` - Cleanup
- `loadSettings(): Promise<void>` - Load settings
- `saveSettings(): Promise<void>` - Save settings

### Settings Tab

Extends `PluginSettingTab` from Obsidian API.

**Responsibilities:**
- Render settings UI
- Handle user input
- Update plugin settings
- Trigger settings save

## Design Patterns

### 1. Singleton Pattern
The plugin class is a singleton managed by Obsidian.

### 2. Strategy Pattern
Text transformation modes use strategy pattern:

```typescript
private transformText(text: string, mode: TransformMode): string {
  switch (mode) {
    case 'uppercase': return text.toUpperCase();
    case 'lowercase': return text.toLowerCase();
    case 'title': return this.toTitleCase(text);
  }
}
```

### 3. Observer Pattern
Obsidian's event system uses observer pattern:

```typescript
this.registerEvent(
  this.app.workspace.on('file-open', (file) => {
    // React to file open event
  })
);
```

### 4. Factory Pattern
Settings migration uses factory pattern:

```typescript
export function migrateSettings(settings: ExamplePluginSettings): void {
  // Transform old settings format to new format
}
```

## Extension Points

### Adding New Commands

```typescript
// In onload()
this.addCommand({
  id: 'your-command-id',
  name: 'Your Command Name',
  callback: () => {
    // Command logic
  },
});
```

### Adding New Settings

1. Update interface in `plugin-settings.ts`:
```typescript
export interface ExamplePluginSettings {
  transformMode: 'uppercase' | 'lowercase' | 'title';
  showNotices: boolean;
  newSetting: string; // Add new setting
}
```

2. Update defaults:
```typescript
export const DEFAULT_SETTINGS: ExamplePluginSettings = {
  transformMode: 'uppercase',
  showNotices: true,
  newSetting: 'default value', // Add default
};
```

3. Add UI in `settings-tab.ts`:
```typescript
new Setting(containerEl)
  .setName('New Setting')
  .setDesc('Description')
  .addText((text) =>
    text
      .setValue(this.plugin.settings.newSetting)
      .onChange(async (value) => {
        this.plugin.settings.newSetting = value;
        await this.plugin.saveSettings();
      })
  );
```

### Adding Custom Views

For plugins that need sidebar views:

1. Create view file (`src/view.ts`):
```typescript
export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
  getViewType() { return VIEW_TYPE_EXAMPLE; }
  getDisplayText() { return 'Example View'; }

  async onOpen() {
    // Render view
  }
}
```

2. Register in `main.ts`:
```typescript
// In onload()
this.registerView(
  VIEW_TYPE_EXAMPLE,
  (leaf) => new ExampleView(leaf)
);
```

## Best Practices

### 1. Always Clean Up
Unregister event listeners and views in `onunload()`:

```typescript
async onunload() {
  // Detach custom views
  this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);
}
```

### 2. Use Type Safety
Define TypeScript interfaces for all data structures:

```typescript
interface CommandOptions {
  id: string;
  name: string;
  callback: () => void;
}
```

### 3. Handle Errors Gracefully

```typescript
try {
  // Plugin logic
} catch (error) {
  new Notice('Error: ' + error.message);
  console.error('[ExamplePlugin]', error);
}
```

### 4. Debounce Expensive Operations

```typescript
import { debounce } from 'obsidian';

const debouncedSave = debounce(
  () => this.saveSettings(),
  500
);
```

### 5. Validate User Input

```typescript
export function migrateSettings(settings: ExamplePluginSettings): void {
  const validModes = ['uppercase', 'lowercase', 'title'];
  if (!validModes.includes(settings.transformMode)) {
    settings.transformMode = DEFAULT_SETTINGS.transformMode;
  }
}
```

## Performance Considerations

### 1. Lazy Loading
Load heavy resources only when needed:

```typescript
async onload() {
  // Don't load heavy resources here
}

async activateView() {
  // Load resources when view is activated
  const heavyData = await this.loadHeavyData();
}
```

### 2. Caching
Cache computed values:

```typescript
private cache = new Map<string, any>();

getData(key: string): any {
  if (!this.cache.has(key)) {
    this.cache.set(key, this.computeData(key));
  }
  return this.cache.get(key);
}
```

### 3. Async Operations
Use async/await for I/O operations:

```typescript
async loadSettings() {
  const data = await this.loadData();
  this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
}
```

## Testing Strategy

### Unit Tests
Test business logic in isolation:

```typescript
describe('transformText', () => {
  it('should convert to uppercase', () => {
    const result = plugin.transformText('hello', 'uppercase');
    expect(result).toBe('HELLO');
  });
});
```

### Integration Tests
Test plugin integration with Obsidian:

```typescript
describe('Plugin initialization', () => {
  it('should load settings on startup', async () => {
    await plugin.onload();
    expect(plugin.settings).toBeDefined();
  });
});
```

## Resources

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Obsidian Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)

## Next Steps

- Learn how to [Customize](/template/customization) your plugin
- Set up [Testing](/template/testing) for your plugin
- Prepare for [Deployment](/template/deployment)
- Check the [API Reference](/template/api) for detailed documentation