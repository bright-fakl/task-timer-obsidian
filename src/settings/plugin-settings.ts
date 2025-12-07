/**
 * Plugin settings interface
 * Define your plugin's settings here
 */
export interface ExamplePluginSettings {
  // Example setting: text transformation mode
  transformMode: 'uppercase' | 'lowercase' | 'title';
  
  // Example setting: whether to show confirmation notices
  showNotices: boolean;
}

/**
 * Default settings
 * These values are used when the plugin is first installed
 */
export const DEFAULT_SETTINGS: ExamplePluginSettings = {
  transformMode: 'uppercase',
  showNotices: true,
};

/**
 * Settings migration function
 * Use this to migrate settings when you change the settings schema
 * 
 * @param settings - The loaded settings object
 */
export function migrateSettings(settings: ExamplePluginSettings): void {
  // Example migration: ensure transformMode is valid
  const validModes: Array<ExamplePluginSettings['transformMode']> = [
    'uppercase',
    'lowercase',
    'title',
  ];
  
  if (!validModes.includes(settings.transformMode)) {
    settings.transformMode = DEFAULT_SETTINGS.transformMode;
  }
  
  // Add more migration logic here as your settings evolve
  // For example:
  // if (settings.version === undefined) {
  //   settings.version = 1;
  //   // migrate old settings format to new format
  // }
}