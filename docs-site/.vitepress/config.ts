import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Task Timer Plugin',
  description: 'A time tracking plugin for Obsidian that adds time tracking capabilities to tasks',
  base: '/task-timer/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/bright-fakl/task-timer-obsidian' }
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Overview', link: '/' }
        ]
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Fabian Kloosterman'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bright-fakl/task-timer-obsidian' }
    ]
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['style', { id: 'code-highlight-fix', textContent: `
      /* Improve code block visibility */
      .vitepress-code-block {
        background-color: var(--vp-code-block-bg) !important;
      }
      .vitepress-code-block .line {
        color: var(--vp-code-block-text) !important;
      }
      .vitepress-code-block .token.comment {
        color: var(--vp-code-block-comment) !important;
      }
      .vitepress-code-block .token.keyword {
        color: var(--vp-code-block-keyword) !important;
      }
      .vitepress-code-block .token.string {
        color: var(--vp-code-block-string) !important;
      }
    `}]
  ]
});