import { Editor, MarkdownView, Notice, Plugin, MarkdownFileInfo } from 'obsidian';
import {
  ExamplePluginSettings,
  DEFAULT_SETTINGS,
  migrateSettings,
} from './settings/plugin-settings';
import { ExamplePluginSettingsTab } from './settings/settings-tab';

/**
 * Example Plugin
 * A minimal plugin demonstrating text transformation functionality
 */
export default class ExamplePlugin extends Plugin {
  settings!: ExamplePluginSettings;

  async onload() {
    // Load settings
    await this.loadSettings();

    // Register settings tab
    this.addSettingTab(new ExamplePluginSettingsTab(this.app, this));

    // Register command: Transform selected text
    this.addCommand({
      id: 'transform-text',
      name: 'Transform selected text',
      editorCallback: (editor: Editor, ctx: MarkdownView | MarkdownFileInfo) => {
        const selection = editor.getSelection();

        if (!selection) {
          new Notice('No text selected');
          return;
        }

        // Transform text based on settings
        const transformed = this.transformText(selection, this.settings.transformMode);

        // Replace selected text
        editor.replaceSelection(transformed);

        // Show notice if enabled
        if (this.settings.showNotices) {
          new Notice(`Text transformed to ${this.settings.transformMode}`);
        }
      },
    });

    // Optional: Add ribbon icon
    // Uncomment this to add a button to the left sidebar
    /*
    this.addRibbonIcon('text-cursor-input', 'Transform text', () => {
      new Notice('Click on text and use the command palette (Ctrl/Cmd+P) to transform text');
    });
    */

    // Optional: Register event handlers
    // Example: Listen for file changes
    /*
    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        if (file) {
          console.log('File opened:', file.path);
        }
      })
    );
    */
  }

  onunload() {
    // Cleanup code here (if needed)
    // For example, if you registered custom views:
    // this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);
  }

  /**
   * Transform text based on the specified mode
   */
  private transformText(text: string, mode: ExamplePluginSettings['transformMode']): string {
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

  /**
   * Convert text to Title Case
   */
  private toTitleCase(text: string): string {
    return text.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  /**
   * Load plugin settings
   */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    migrateSettings(this.settings);
    await this.saveSettings();
  }

  /**
   * Save plugin settings
   */
  async saveSettings() {
    await this.saveData(this.settings);
  }
}