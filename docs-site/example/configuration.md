# Configuring the Example Plugin

This guide shows you how to configure the text transformation plugin to match your preferences.

## Accessing Settings

### Method 1: Settings Tab

1. **Open Obsidian settings** (`Ctrl/Cmd + ,`)
2. **Navigate to** "Community plugins"
3. **Find** "Example Plugin" in the list
4. **Click** the settings icon (gear) next to it

### Method 2: Direct Navigation

1. **Open Obsidian settings**
2. **Scroll down** to "Community plugins" section
3. **Click on** "Example Plugin" in the left sidebar

## Available Settings

### Transform Mode

**Description**: Choose the default text transformation method

**Options**:
- **UPPERCASE** - Convert to all uppercase letters
- **lowercase** - Convert to all lowercase letters
- **Title Case** - Capitalize first letter of each word

**Default**: UPPERCASE

**When to use**:
- **UPPERCASE**: For headers, emphasis, code constants
- **lowercase**: For cleaning up accidental caps, URLs
- **Title Case**: For titles, proper nouns, headings

### Show Notices

**Description**: Display confirmation messages after transformation

**Options**:
- **Enabled** - Show "Text transformed!" message
- **Disabled** - No confirmation messages

**Default**: Enabled

**When to use**:
- **Enabled**: For feedback and confirmation
- **Disabled**: For quieter operation, less distraction

## Configuration Examples

### For Writing Tasks

```json
{
  "transformMode": "Title Case",
  "showNotices": true
}
```

**Use case**: Writing articles, creating headings, proper nouns

### For Code Development

```json
{
  "transformMode": "UPPERCASE",
  "showNotices": false
}
```

**Use case**: Constants, environment variables, code comments

### For Note Organization

```json
{
  "transformMode": "lowercase",
  "showNotices": true
}
```

**Use case**: Cleaning up tags, file names, search terms

## Advanced Configuration

### Keyboard Shortcuts

Customize keyboard shortcuts for the transform command:

1. **Go to Settings** → **Hotkeys**
2. **Search for** "Transform selected text"
3. **Click the** `+` button to add a shortcut
4. **Press your desired key combination**

**Recommended shortcuts**:
- `Ctrl/Cmd + Shift + U` - Quick uppercase
- `Ctrl/Cmd + Shift + T` - Quick title case
- `Ctrl/Cmd + Shift + L` - Quick lowercase

### Multiple Configurations

The plugin supports only one configuration at a time, but you can:

1. **Change settings** as needed for different tasks
2. **Use different vaults** for different workflows
3. **Create multiple commands** (advanced customization)

## Settings Persistence

### How It Works

- **Settings saved automatically** when changed
- **Persist across sessions** - your preferences are remembered
- **Vault-specific** - different vaults can have different settings
- **Migration support** - settings update automatically with plugin updates

### Backup & Restore

Settings are stored in your vault's `.obsidian/plugins/example-plugin/data.json` file.

**To backup**: Copy this file
**To restore**: Replace with your backup

## Troubleshooting Settings

### Settings Not Saving

**Symptoms**: Settings reset after restart

**Solutions**:
1. **Check vault permissions** - Obsidian needs write access
2. **Verify plugin permissions** - Plugin needs data access
3. **Check console errors** - Look for "Cannot save data" messages

### Settings Not Applying

**Symptoms**: Changes don't take effect

**Solutions**:
1. **Restart Obsidian** - Sometimes required for setting changes
2. **Check for errors** - Console might show validation issues
3. **Verify plugin version** - Update if using old version

### UI Not Showing

**Symptoms**: Settings tab doesn't appear

**Solutions**:
1. **Plugin enabled?** - Check Community plugins list
2. **Plugin loaded?** - Look for errors in console
3. **Restart Obsidian** - Force reload plugins

## Performance Considerations

### Impact of Settings

- **Show Notices**: Minimal performance impact
- **Transform Mode**: No performance difference between modes
- **Settings Changes**: Applied immediately, no restart required

### Resource Usage

- **Memory**: Minimal (< 1MB additional)
- **Storage**: Small JSON file (~100 bytes)
- **CPU**: Negligible for text transformations

## Resetting to Defaults

### Method 1: Manual Reset

1. **Go to plugin settings**
2. **Change settings back to defaults**:
   - Transform Mode: UPPERCASE
   - Show Notices: Enabled

### Method 2: Delete Data File

1. **Close Obsidian**
2. **Delete** `YourVault/.obsidian/plugins/example-plugin/data.json`
3. **Restart Obsidian** - Settings will reset to defaults

## Next Steps

Now that you have the plugin configured:

- [Try using it](/example/usage) with your preferred settings
- Learn about the [plugin architecture](/template/architecture)
- [Create your own plugin](/template/getting-started) using this template