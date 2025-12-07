/**
 * Version Management Script
 *
 * This script updates version numbers across manifest.json and package.json
 * Usage: npm run version <version-number>
 * Example: npm run version 1.0.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get version from command line arguments
const targetVersion = process.argv[2];

if (!targetVersion) {
  console.error('Error: Version number required');
  console.error('Usage: npm run version <version-number>');
  console.error('Example: npm run version 1.0.0');
  process.exit(1);
}

// Validate version format (basic semver validation)
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(targetVersion)) {
  console.error(`Error: Invalid version format "${targetVersion}"`);
  console.error('Version must be in format: MAJOR.MINOR.PATCH (e.g., 1.0.0)');
  process.exit(1);
}

// File paths
const manifestPath = path.join(__dirname, '..', 'manifest.json');
const packagePath = path.join(__dirname, '..', 'package.json');

// Update manifest.json
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const oldVersion = manifest.version;
  manifest.version = targetVersion;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`✓ Updated manifest.json: ${oldVersion} → ${targetVersion}`);
} catch (error) {
  console.error(`Error updating manifest.json: ${error.message}`);
  process.exit(1);
}

// Update package.json
try {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const oldVersion = packageJson.version;
  packageJson.version = targetVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`✓ Updated package.json: ${oldVersion} → ${targetVersion}`);
} catch (error) {
  console.error(`Error updating package.json: ${error.message}`);
  process.exit(1);
}

console.log('\nVersion update complete!');
console.log('\nNext steps:');
console.log('1. Update CHANGELOG.md with release notes');
console.log('2. Commit changes: git commit -am "Release v' + targetVersion + '"');
console.log('3. Create git tag: git tag ' + targetVersion);
console.log('4. Push changes: git push origin main --tags');