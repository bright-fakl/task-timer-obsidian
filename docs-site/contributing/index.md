# Contributing to the Template

Thank you for your interest in improving the Obsidian Plugin Template! This guide covers the essentials for contributing.

## Quick Start

### 1. Fork and Clone
```bash
git clone https://github.com/YOUR_USERNAME/obsidian-plugin-template.git
cd obsidian-plugin-template
npm install
```

### 2. Make Changes
- Create a feature branch: `git checkout -b feature/your-improvement`
- Make your changes
- Test thoroughly: `npm test && npm run build`

### 3. Submit a Pull Request
- Push your branch: `git push origin feature/your-improvement`
- Open a PR with a clear description
- Follow the PR template

## Development Workflow

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update` - Documentation changes

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add new testing utility
fix: resolve build issue on Windows
docs: update API documentation
```

### Testing Requirements
- All tests must pass: `npm test`
- Build must succeed: `npm run build`
- Manual testing in Obsidian recommended

## What to Contribute

### Template Improvements
- Better build tools or configurations
- Enhanced testing setup
- Improved documentation structure
- New example features
- Performance optimizations

### Bug Fixes
- Build issues
- Test failures
- Documentation errors
- Compatibility problems

### Documentation
- Clarify setup instructions
- Add missing examples
- Fix broken links
- Improve explanations

## Guidelines

### Code Quality
- Follow existing patterns in the codebase
- Add tests for new functionality
- Update documentation for changes
- Keep changes focused and minimal

### Pull Request Process
1. **Describe** what your change does
2. **Explain** why it's needed
3. **Test** that it works
4. **Update docs** if needed

### Review Process
PRs are reviewed for:
- **Functionality** - Does it work as intended?
- **Quality** - Is the code clean and well-tested?
- **Documentation** - Are docs updated?
- **Compatibility** - Does it break existing functionality?

## Getting Help

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/bright-fakl/obsidian-plugin-template/issues)

## Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project README

Thank you for helping improve the Obsidian Plugin Template! 🎉