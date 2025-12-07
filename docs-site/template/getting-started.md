# Getting Started with the Template

This guide will help you create your own Obsidian plugin using this template.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git
- Obsidian (for testing)

## Quick Start

### 1. Clone the Template

```bash
git clone https://github.com/bright-fakl/obsidian-plugin-template.git your-plugin-name
cd your-plugin-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Convert to Your Own Repository (Optional)

To create a separate repository for your plugin:

```bash
# Remove the existing .git folder
rm -rf .git

# Initialize new git repository
git init

# Create new repository on GitHub/GitLab
# Then add the remote:
git remote add origin https://github.com/yourusername/your-plugin-name.git

# Commit and push
git add .
git commit -m "Initial commit: Obsidian plugin from template"
git push -u origin main
```

### 5. Build and Test

```bash
# Development mode (watches for changes)
npm run dev

# Production build
npm run build

# Run tests
npm test
```

### 6. Load in Obsidian

**For development**: Place the entire repository folder in your Obsidian vault's plugins folder:
```
YourVault/.obsidian/plugins/your-plugin-name/
```

**For production**: Copy just `main.js` and `manifest.json` to your vault's plugins folder.

## Development Workflow

### Build Commands

```bash
npm run dev          # Development mode (watches for changes)
npm run build        # Production build
npm test             # Run tests
npm run test:watch   # Watch mode for tests
npm run test:coverage # Coverage report
```

### Documentation Commands

```bash
npm run docs:dev     # Development server
npm run docs:build   # Build documentation
npm run docs:preview # Preview documentation
```

## Next Steps

For more advanced usage:
- [Customize your plugin](/template/customization)
- [Set up testing](/template/testing)
- [Prepare for deployment](/template/deployment)

## Getting Help

- **Issues**: Report bugs on [GitHub Issues](https://github.com/bright-fakl/obsidian-plugin-template/issues)
- **API Documentation**: Check [Obsidian API docs](https://github.com/obsidianmd/obsidian-api)