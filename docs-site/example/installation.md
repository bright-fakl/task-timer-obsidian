# Installing the Example Plugin

This guide shows you how to install and try out the example plugin functionality.

## From Releases

### 1. Download the Plugin

Go to the [releases page](https://github.com/bright-fakl/obsidian-plugin-template/releases) and download the latest release.

### 2. Install in Obsidian

**Extract the files** to your Obsidian vault's plugins folder:

```
YourVault/.obsidian/plugins/example-plugin/
├── main.js
├── manifest.json
└── styles.css (optional)
```

**Enable the plugin** in Obsidian:

1. Open **Settings**
2. Go to **Community plugins**
3. Find **"Example Plugin"** in the list
4. Click **Enable**

## From Source (Development)

### 1. Clone the Repository

```bash
git clone https://github.com/bright-fakl/obsidian-plugin-template.git
cd obsidian-plugin-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Plugin

```bash
npm run build
```

### 4. Copy Files to Obsidian

Copy the built files to your vault:

```
YourVault/.obsidian/plugins/example-plugin/
├── main.js
├── manifest.json
```

### 5. Enable in Obsidian

Same as above - enable through Community plugins settings.

## For Development Testing

If you're developing and want to test changes:

### Option 1: Symlink (Recommended)

```bash
# From your vault's plugins folder
ln -s /path/to/your/plugin/repo example-plugin
```

### Option 2: Copy Repository

Place the entire repository folder in your plugins directory:

```
YourVault/.obsidian/plugins/example-plugin/
├── src/
├── tests/
├── package.json
├── main.js (built)
├── manifest.json
└── ...
```

## Verification

### Check Installation

1. **Open command palette** (`Ctrl/Cmd + P`)
2. **Search for** "Transform selected text"
3. **Command should appear** if plugin is properly installed

### Test Functionality

1. **Create a new note** or open existing
2. **Type some text** (e.g., "hello world")
3. **Select the text**
4. **Run the command** "Transform selected text"
5. **Text should transform** according to your settings

## Troubleshooting

### Plugin Not Loading

**Symptoms**: Plugin doesn't appear in settings or commands don't work

**Solutions**:
1. **Check file locations** - Ensure `main.js` and `manifest.json` are in the correct folder
2. **Verify plugin is enabled** - Check Community plugins settings
3. **Check developer console** - Open with `Ctrl/Cmd + Shift + I` for errors
4. **Restart Obsidian** - Sometimes required after installation

### Settings Not Saving

**Symptoms**: Settings reset on restart

**Solutions**:
1. **Check vault permissions** - Ensure Obsidian can write to your vault
2. **Verify plugin permissions** - Plugin needs access to vault data
3. **Check console for errors** - Look for data persistence errors

### Command Not Working

**Symptoms**: Command appears but doesn't transform text

**Solutions**:
1. **Check text selection** - Ensure you have text selected
2. **Verify command registration** - Check that plugin loaded successfully
3. **Check console errors** - Look for JavaScript errors

## Updating

### From Releases

1. **Download new version** from releases
2. **Replace files** in your plugins folder
3. **Restart Obsidian** (recommended)

### From Source

```bash
# Pull latest changes
git pull origin main

# Rebuild
npm run build

# Copy files to vault
cp main.js manifest.json YourVault/.obsidian/plugins/example-plugin/
```

## Next Steps

Now that you have the plugin installed:

- Learn [how to use it](/example/usage)
- [Configure your preferences](/example/configuration)
- Or [create your own plugin](/template/getting-started) using this template