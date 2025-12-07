# Customization Guide

This guide shows you how to customize the template to build your own Obsidian plugin.

## Overview

The template is designed to be easily customizable. You can modify the example plugin functionality or completely replace it with your own logic.

## Quick Customization

### 1. Rename the Plugin

Update these essential files:

#### `manifest.json`
```json
{
  "id": "your-plugin-id",
  "name": "Your Plugin Name",
  "version": "0.0.1",
  "minAppVersion": "1.5.0",
  "description": "Your plugin description",
  "author": "Your Name",
  "authorUrl": "https://github.com/yourusername",
  "isDesktopOnly": false
}
```

#### `package.json`
```json
{
  "name": "obsidian-your-plugin-name",
  "version": "0.0.1",
  "description": "Your plugin description"
}
```

### 2. Customize Settings

#### Update Settings Interface (`src/settings/plugin-settings.ts`)

```typescript
export interface YourPluginSettings {
  // Add your settings here
  yourSetting: string;
  yourOption: boolean;
  // Keep or modify existing settings
  transformMode: 'uppercase' | 'lowercase' | 'title';
  showNotices: boolean;
}

export const DEFAULT_SETTINGS: YourPluginSettings = {
  // Add your defaults
  yourSetting: 'default value',
  yourOption: true,
  // Keep or modify existing defaults
  transformMode: 'uppercase',
  showNotices: true,
};
```

## Adding Commands

### Simple Command

```typescript
// In src/main.ts, in the onload() method:
this.addCommand({
  id: 'your-plugin-id:your-command',
  name: 'Your Command Name',
  callback: () => {
    // Your command logic
    console.log('Your command executed!');
  },
});
```

### Editor Command

```typescript
this.addCommand({
  id: 'your-plugin-id:editor-command',
  name: 'Editor Command Name',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    const selectedText = editor.getSelection();
    if (!selectedText) {
      new Notice('Please select some text first');
      return;
    }

    // Process selected text
    const result = processText(selectedText);
    editor.replaceSelection(result);

    if (this.settings.showNotices) {
      new Notice('Command executed!');
    }
  },
});
```

## Next Steps

- [Set up testing](/template/testing) for your customizations
- [Learn about deployment](/template/deployment)

## Getting Help

- **Issues** - Report bugs in GitHub Issues
- **Discussions** - Ask questions in GitHub Discussions