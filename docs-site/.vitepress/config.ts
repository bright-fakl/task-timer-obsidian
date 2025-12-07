import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Obsidian Plugin Template',
  description: 'Professional template for building Obsidian plugins',
  base: '/obsidian-plugin-template/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Template', link: '/template/getting-started' },
      { text: 'Example', link: '/example/index' },
      { text: 'Contributing', link: '/contributing/index' },
      { text: 'GitHub', link: 'https://github.com/bright-fakl/obsidian-plugin-template' }
    ],

    sidebar: [
      {
        text: 'Template Usage',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/template/getting-started' },
          { text: 'Architecture', link: '/template/architecture' },
          { text: 'Customization Guide', link: '/template/customization' },
          { text: 'Testing Your Plugin', link: '/template/testing' },
          { text: 'Deployment', link: '/template/deployment' },
          { text: 'API Reference', link: '/template/api' }
        ]
      },
      {
        text: 'Example Plugin',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/example/index' },
          { text: 'Installation', link: '/example/installation' },
          { text: 'Usage', link: '/example/usage' },
          { text: 'Configuration', link: '/example/configuration' }
        ]
      },
      {
        text: 'Contributing',
        collapsed: true,
        items: [
          { text: 'How to Contribute', link: '/contributing/index' },
          { text: 'Development Setup', link: '/contributing/development-setup' },
          { text: 'Testing the Template', link: '/contributing/testing' }
        ]
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Your Name'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bright-fakl/obsidian-plugin-template' }
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