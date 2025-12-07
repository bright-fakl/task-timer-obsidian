# Plugin Architecture Documentation

This document explains the architecture and design patterns used in this Obsidian plugin template.

## Table of Contents

1. [Overview](#overview)
2. [Architecture Layers](#architecture-layers)
3. [File Structure](#file-structure)
4. [Core Components](#core-components)
5. [Data Flow](#data-flow)
6. [Design Patterns](#design-patterns)
7. [Extension Points](#extension-points)

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

### 3. Business Logic Layer

**Location:** Plugin methods in `main.ts` (or separate files for complex plugins)

**Responsibilities:**
- Core plugin functionality
- Text transformation logic
- Data processing

**Example:**
```typescript
private transformText(text: string, mode: TransformMode): string {
  // Business logic here
}
```

## File Structure

```
src/
├── main.ts                  # Plugin entry point
└── settings/
    ├── plugin-settings.ts   # Settings schema and defaults
    └── settings-tab.ts      # Settings UI
```

### Main Plugin File (`src/main.ts`)

```typescript
export default class ExamplePlugin extends Plugin {
  settings!: ExamplePluginSettings;

  async onload() {
    // 1. Load settings
    await this.loadSettings();

    // 2. Register UI elements
    this.addSettingTab(new ExamplePluginSettingsTab(this.app, this));

    // 3. Register commands
    this.addCommand({ /* ... */ });

    // 4. Register event handlers (if needed)
    // this.registerEvent(/* ... */);
  }

  async onunload() {
    // Cleanup code
  }

  // Helper methods
  private transformText(text: string, mode: string): string { /* ... */ }

  async loadSettings() { /* ... */ }
  async saveSettings() { /* ... */ }
}
```

### Settings Schema (`src/settings/plugin-settings.ts`)

```typescript
export interface ExamplePluginSettings {
  // Define your settings here
  transformMode: 'uppercase' | 'lowercase' | 'title';
  showNotices: boolean;
}

export const DEFAULT_SETTINGS: ExamplePluginSettings = {
  // Default values
  transformMode: 'uppercase',
  showNotices: true,
};

export function migrateSettings(settings: ExamplePluginSettings): void {
  // Handle settings migration when schema changes
}
```

### Settings UI (`src/settings/settings-tab.ts`)

```typescript
export class ExamplePluginSettingsTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // Create settings UI using Obsidian's Setting API
    new Setting(containerEl)
      .setName('Setting name')
      .setDesc('Setting description')
      .addDropdown(/* ... */);
  }
}
```

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

## Data Flow

### Command Execution Flow

```
User activates command
        ↓
Command callback executed
        ↓
Read current settings
        ↓
Execute business logic
        ↓
Update Obsidian state
        ↓
Show notification (if enabled)
```

### Settings Update Flow

```
User changes setting in UI
        ↓
Setting component onChange callback
        ↓
Update plugin.settings object
        ↓
Call plugin.saveSettings()
        ↓
Settings persisted to disk
```

### Plugin Initialization Flow

```
Obsidian loads plugin
        ↓
Call onload()
        ↓
Load settings from disk
        ↓
Migrate settings (if needed)
        ↓
Register settings tab
        ↓
Register commands
        ↓
Register event handlers
        ↓
Plugin ready
```

## Design Patterns

### 1. Singleton Pattern

The plugin class is a singleton managed by Obsidian.

```typescript
export default class ExamplePlugin extends Plugin {
  // Only one instance exists
}
```

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

### Adding Event Handlers

```typescript
// In onload()
this.registerEvent(
  this.app.workspace.on('file-open', (file) => {
    if (file) {
      // Handle file open
    }
  })
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

- Review the [Testing Guide](../tests/TESTING.md) for testing best practices
- Explore the [VitePress Documentation](../docs-site/) for user-facing documentation
- Check the [README](../README.md) for quick start and customization guide