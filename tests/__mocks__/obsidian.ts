/**
 * Mock Obsidian API for testing
 * This file provides minimal mocks of Obsidian's core classes for unit testing
 */

export class TFile {
  path: string;
  basename: string;
  extension: string;

  constructor(path: string, basename: string = '') {
    this.path = path;
    if (!basename) {
      this.basename = path.split('/').pop()?.replace(/\\.md$/, '') || '';
    } else {
      this.basename = basename;
    }
    this.extension = path.split('.').pop() || '';
  }
}

export class TFolder {
  path: string;
  name: string;

  constructor(path: string) {
    this.path = path;
    this.name = path.split('/').pop() || '';
  }
}

export class Vault {
  getMarkdownFiles(): TFile[] {
    return [];
  }

  getAbstractFileByPath(path: string): TFile | TFolder | null {
    return null;
  }

  async read(file: TFile): Promise<string> {
    return '';
  }

  async modify(file: TFile, data: string): Promise<void> {
    return Promise.resolve();
  }
}

export class MetadataCache {
  getFileCache(file: TFile): any {
    return null;
  }

  getFirstLinkpathDest(linkpath: string, sourcePath: string): TFile | null {
    return null;
  }
}

export class Workspace {
  on(name: string, callback: (...args: any[]) => any): any {
    return { unload: () => {} };
  }

  getActiveFile(): TFile | null {
    return null;
  }

  getActiveViewOfType<T>(type: any): T | null {
    return null;
  }
}

export class App {
  vault = new Vault();
  metadataCache = new MetadataCache();
  workspace = new Workspace();
}

export class Plugin {
  app!: App;
  manifest!: any;

  loadData(): Promise<any> {
    return Promise.resolve({});
  }

  saveData(data: any): Promise<void> {
    return Promise.resolve();
  }

  addCommand(command: any): void {}

  addRibbonIcon(icon: string, title: string, callback: () => void): any {
    return {};
  }

  addSettingTab(tab: any): void {}

  registerEvent(event: any): void {}

  registerView(type: string, viewCreator: any): void {}
}

export class PluginSettingTab {
  app: App;
  plugin: Plugin;
  containerEl!: HTMLElement;

  constructor(app: App, plugin: Plugin) {
    this.app = app;
    this.plugin = plugin;
  }

  display(): void {}

  hide(): void {}
}

export class Setting {
  settingEl: HTMLElement;

  constructor(public containerEl: HTMLElement) {
    this.settingEl = document.createElement('div');
  }

  setName(name: string): this {
    return this;
  }

  setDesc(desc: string): this {
    return this;
  }

  addText(callback: (text: any) => any): this {
    callback({
      setPlaceholder: () => ({ setValue: () => ({ onChange: () => {} }) }),
    });
    return this;
  }

  addToggle(callback: (toggle: any) => any): this {
    callback({
      setValue: () => ({ onChange: () => {} }),
    });
    return this;
  }

  addDropdown(callback: (dropdown: any) => any): this {
    callback({
      addOption: () => ({ addOption: () => ({ setValue: () => ({ onChange: () => {} }) }) }),
    });
    return this;
  }

  addButton(callback: (button: any) => any): this {
    callback({
      setButtonText: () => ({ onClick: () => {} }),
    });
    return this;
  }
}

export class ItemView {
  containerEl!: HTMLElement;
  leaf: any;

  constructor(leaf: any) {
    this.leaf = leaf;
  }

  getViewType(): string {
    return '';
  }

  getDisplayText(): string {
    return '';
  }

  async onOpen(): Promise<void> {}

  async onClose(): Promise<void> {}

  getState(): any {
    return {};
  }

  setState(state: any, result: any): Promise<void> {
    return Promise.resolve();
  }
}

export class Modal {
  app: App;
  contentEl!: HTMLElement;
  modalEl!: HTMLElement;

  constructor(app: App) {
    this.app = app;
  }

  open(): void {}

  close(): void {}

  onOpen(): void {}

  onClose(): void {}
}

export class Menu {
  addItem(callback: (item: any) => any): this {
    callback({
      setTitle: () => ({
        setIcon: () => ({
          onClick: () => {},
        }),
        onClick: () => {},
      }),
    });
    return this;
  }

  showAtMouseEvent(event: MouseEvent): void {}

  showAtPosition(position: { x: number; y: number }): void {}
}

export class Notice {
  constructor(message: string, timeout?: number) {
    // Mock notice - does nothing in tests
  }

  setMessage(message: string): this {
    return this;
  }

  hide(): void {}
}

export class Editor {
  getSelection(): string {
    return '';
  }

  replaceSelection(replacement: string): void {}

  getValue(): string {
    return '';
  }

  setValue(value: string): void {}

  getCursor(): { line: number; ch: number } {
    return { line: 0, ch: 0 };
  }
}

export class MarkdownView {
  editor: Editor;

  constructor() {
    this.editor = new Editor();
  }

  getViewType(): string {
    return 'markdown';
  }
}

export class MarkdownFileInfo {
  // Mock MarkdownFileInfo class
  constructor() {}
}

export function setIcon(el: HTMLElement, icon: string): void {
  // Mock function - does nothing
}

export function debounce(
  callback: (...args: any[]) => any,
  delay: number
): (...args: any[]) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}