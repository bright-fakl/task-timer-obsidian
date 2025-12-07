# Using the Example Plugin

This guide shows you how to use the text transformation features of the example plugin.

## Basic Usage

### Transforming Text

1. **Open any note** in your Obsidian vault
2. **Type some text** or select existing text
3. **Select the text** you want to transform (drag with mouse or use keyboard shortcuts)
4. **Open command palette**:
   - Windows/Linux: `Ctrl + P`
   - macOS: `Cmd + P`
5. **Search for "Transform selected text"**
6. **Press Enter** to execute the command
7. **Your text is transformed** according to your settings!

### Example Workflow

**Step 1: Select Text**
```
Hello world, this is a test.
```

**Step 2: Run Command**
- Press `Ctrl/Cmd + P`
- Type "Transform selected text"
- Press Enter

**Step 3: See Result**
```
HELLO WORLD, THIS IS A TEST.
```

## Transformation Modes

### UPPERCASE
Converts all letters to uppercase.

**Before**: "Hello World"
**After**: "HELLO WORLD"

**Best for**:
- Headers and titles
- Emphasis
- Constants and variables in code
- Acronyms and abbreviations

### lowercase
Converts all letters to lowercase.

**Before**: "HELLO WORLD"
**After**: "hello world"

**Best for**:
- URLs and file names
- Email addresses
- Cleaning up accidental caps lock
- Consistent tag formatting

### Title Case
Capitalizes the first letter of each word.

**Before**: "hello world"
**After**: "Hello World"

**Best for**:
- Article titles
- Proper nouns
- Section headers
- Names and places

## Command Options

### Standard Command
- **Name**: "Transform selected text"
- **Shortcut**: None (configurable by user)
- **Behavior**: Uses current settings

### Adding Custom Shortcuts

You can add keyboard shortcuts for faster access:

1. **Open Obsidian Settings** (`Ctrl/Cmd + ,`)
2. **Go to Hotkeys**
3. **Search for** "Transform selected text"
4. **Click the + button**
5. **Press your desired key combination**

**Recommended shortcuts**:
- `Ctrl/Cmd + Shift + U` - Quick uppercase
- `Ctrl/Cmd + Shift + L` - Quick lowercase
- `Ctrl/Cmd + Shift + T` - Quick title case

## Advanced Usage

### Partial Text Selection

You can select any portion of text, not just whole words:

**Selected**: "Hello **world**"
**Result**: "Hello **WORLD**"

### Multiple Lines

The plugin works with multi-line selections:

**Selected**:
```
Line 1
Line 2
Line 3
```

**Result** (UPPERCASE):
```
LINE 1
LINE 2
LINE 3
```

### Special Characters

The plugin preserves special characters:

**Before**: "Hello, world! 123 Main St."
**After**: "HELLO, WORLD! 123 MAIN ST."

## Settings Configuration

### Changing Default Mode

1. **Open Settings** (`Ctrl/Cmd + ,`)
2. **Go to Community plugins**
3. **Find "Example Plugin"**
4. **Click settings icon**
5. **Change "Transform Mode"** to your preference
6. **Settings save automatically**

### Enabling/Disabling Notifications

**Show Notices**: 
- **Enabled**: Shows "Text transformed!" message after each use
- **Disabled**: Silent operation, no notifications

Choose based on your preference for feedback vs. distraction.

## Tips and Tricks

### Efficient Workflows

1. **Set up shortcuts** for your most-used transformation modes
2. **Use with search and replace** to transform multiple instances
3. **Combine with other plugins** for powerful text processing
4. **Create templates** with common transformations

### Common Use Cases

#### Writing Articles
```
Original: "the benefits of using obsidian for note taking"
Transformed: "The Benefits of Using Obsidian for Note Taking"
```

#### Code Comments
```javascript
// original: constant declaration
const API_URL = "https://api.example.com";
// becomes:
const API_URL = "HTTPS://API.EXAMPLE.COM";
```

#### Social Media
```
Original: "check out my new blog post!"
Transformed: "CHECK OUT MY NEW BLOG POST!"
```

### Best Practices

1. **Preview before transforming** - Select text carefully
2. **Use appropriate modes** - Choose the right transformation for context
3. **Set up shortcuts** - Speed up your workflow
4. **Test on samples** - Try with small selections first
5. **Undo if needed** - Use `Ctrl/Cmd + Z` to undo transformations

## Troubleshooting

### Command Not Working

**Problem**: "Transform selected text" command doesn't appear
**Solution**:
- Plugin not enabled? Check Community plugins
- Text selected? Select some text first
- Plugin loaded? Check for errors in console

**Problem**: Command appears but does nothing
**Solution**:
- Check that text is selected
- Verify plugin is enabled
- Look for console errors (`Ctrl/Cmd + Shift + I`)

### Unexpected Results

**Problem**: Text transforms differently than expected
**Solution**:
- Check your settings mode (UPPERCASE, lowercase, Title Case)
- Verify text selection is correct
- Test with simple examples first

**Problem**: Settings not saving
**Solution**:
- Check vault permissions
- Restart Obsidian
- Check for console errors

### Performance Issues

**Problem**: Plugin slows down Obsidian
**Solution**:
- Disable notifications to reduce overhead
- Check for conflicts with other plugins
- Update to latest version

## Keyboard Shortcuts Reference

### Default Shortcuts
- `Ctrl/Cmd + P` - Open command palette
- `Ctrl/Cmd + Z` - Undo transformation

### Recommended Custom Shortcuts
- `Ctrl/Cmd + Shift + U` - Quick uppercase
- `Ctrl/Cmd + Shift + L` - Quick lowercase  
- `Ctrl/Cmd + Shift + T` - Quick title case

### Navigation Shortcuts
- `Ctrl/Cmd + A` - Select all text
- `Shift + Arrow` - Select text by characters
- `Ctrl/Cmd + Shift + Arrow` - Select text by words

## Examples by Context

### Academic Writing
**Use**: Title Case for headings
```
"research methodology" → "Research Methodology"
```

### Technical Documentation
**Use**: UPPERCASE for code constants
```
"api endpoint" → "API ENDPOINT"
```

### Content Creation
**Use**: lowercase for URLs and handles
```
"@Username" → "@username"
```

### Data Organization
**Use**: Title Case for consistent formatting
```
"file names" → "File Names"
```

## Integration with Other Tools

### With Search and Replace
1. Use transformation on selected text
2. Use "Replace" to apply to multiple instances
3. Combine for powerful text processing

### With Templates
1. Create templates with placeholder text
2. Transform after inserting template
3. Ensure consistent formatting

### With Other Plugins
- Works with any text selection
- Compatible with markdown editors
- Integrates with Obsidian's command system

## Next Steps

Now that you know how to use the example plugin:

- [Configure your preferences](/example/configuration)
- [Install and set up the plugin](/example/installation)
- [Learn about the plugin architecture](/template/architecture)
- [Create your own plugin using this template](/template/getting-started)

## Getting Help

- **Issues**: Report problems with the plugin on [GitHub Issues](https://github.com/bright-fakl/obsidian-plugin-template/issues)
