import { App, PluginSettingTab, Setting } from 'obsidian';
import type ExamplePlugin from '../main';

/**
 * Settings tab for the plugin
 * This creates the UI for configuring plugin settings in Obsidian
 */
export class ExamplePluginSettingsTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  constructor(app: App, plugin: ExamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    // Section header
    containerEl.createEl('h2', { text: 'Example Plugin Settings' });

    // Text transformation mode setting
    new Setting(containerEl)
      .setName('Text transformation mode')
      .setDesc('Choose how text should be transformed')
      .addDropdown((dropdown) =>
        dropdown
          .addOption('uppercase', 'UPPERCASE')
          .addOption('lowercase', 'lowercase')
          .addOption('title', 'Title Case')
          .setValue(this.plugin.settings.transformMode)
          .onChange(async (value) => {
            this.plugin.settings.transformMode = value as 'uppercase' | 'lowercase' | 'title';
            await this.plugin.saveSettings();
          })
      );

    // Show notices setting
    new Setting(containerEl)
      .setName('Show confirmation notices')
      .setDesc('Display a notice when text is transformed')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showNotices)
          .onChange(async (value) => {
            this.plugin.settings.showNotices = value;
            await this.plugin.saveSettings();
          })
      );

    // You can add more settings here
    // Example:
    // new Setting(containerEl)
    //   .setName('Your setting name')
    //   .setDesc('Your setting description')
    //   .addText((text) =>
    //     text
    //       .setPlaceholder('Enter value')
    //       .setValue(this.plugin.settings.yourSetting)
    //       .onChange(async (value) => {
    //         this.plugin.settings.yourSetting = value;
    //         await this.plugin.saveSettings();
    //       })
    //   );
  }
}