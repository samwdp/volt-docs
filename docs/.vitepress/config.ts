import { defineConfig } from 'vitepress'

/**
 * VitePress site configuration for Volt documentation.
 * Base path matches the GitHub Pages project site: https://samwdp.github.io/volt-docs/
 *
 * In-editor help should open: /volt-docs/search?q=<urlencoded question>
 */
export default defineConfig({
  title: 'Volt',
  description: 'Documentation for the Volt native text editor',
  base: '/volt-docs/',
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'force-dark',

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/volt-docs/assets/logo.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/volt-docs/assets/logo_32x32.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/volt-docs/assets/logo.png' }],
    ['meta', { property: 'og:image', content: '/volt-docs/assets/banner.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&family=Orbitron:wght@700;800;900&display=swap',
      },
    ],
  ],

  themeConfig: {
    siteTitle: 'Volt',
    logo: {
      src: '/assets/logo.svg',
      alt: 'Volt',
    },
    nav: [
      { text: 'Getting started', link: '/getting-started' },
      { text: 'User packages', link: '/user-packages/overview' },
      { text: 'Configuration', link: '/configuration' },
      { text: 'Plugins', link: '/plugins/catalog' },
      { text: 'Help', link: '/search' },
      { text: 'Changelog', link: '/guides/changelog' },
      { text: 'GitHub', link: 'https://github.com/samwdp/volt' },
    ],

    sidebar: [
      {
        text: 'Start here',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'Search / Help', link: '/search' },
        ],
      },
      {
        text: 'User packages',
        items: [
          { text: 'Overview', link: '/user-packages/overview' },
          { text: 'Concepts', link: '/user-packages/concepts' },
          { text: 'Build the user package', link: '/user-packages/build' },
          { text: 'Create a plugin', link: '/user-packages/create-plugin' },
          { text: 'After scaffolding', link: '/user-packages/after-scaffold' },
          { text: 'Edit a plugin', link: '/user-packages/edit-plugin' },
          { text: 'Hot reload', link: '/user-packages/hot-reload' },
          { text: 'Autocomplete', link: '/user-packages/autocomplete' },
          { text: 'Troubleshooting', link: '/user-packages/troubleshooting' },
        ],
      },
      {
        text: 'Languages & plugins',
        items: [
          { text: 'Add a language', link: '/languages/add-language' },
          { text: 'Builtin catalog', link: '/plugins/catalog' },
        ],
      },
      {
        text: 'Builtin plugins',
        collapsed: true,
        items: [
          { text: 'ACP', link: '/plugins/acp' },
          { text: 'Autocomplete', link: '/plugins/autocomplete' },
          { text: 'Browser', link: '/plugins/browser' },
          { text: 'Buffer', link: '/plugins/buffer' },
          { text: 'Calculator', link: '/plugins/calculator' },
          { text: 'Compile', link: '/plugins/compile' },
          { text: 'DAP', link: '/plugins/dap' },
          { text: 'DB', link: '/plugins/db' },
          { text: 'Git', link: '/plugins/git' },
          { text: 'Help', link: '/plugins/help' },
          { text: 'Hover', link: '/plugins/hover' },
          { text: 'Image', link: '/plugins/image' },
          { text: 'Interactive', link: '/plugins/interactive' },
          { text: 'Issues', link: '/plugins/issues' },
          { text: 'LSP', link: '/plugins/lsp' },
          { text: 'Multicursor', link: '/plugins/multicursor' },
          { text: 'Oil', link: '/plugins/oil' },
          { text: 'Pane', link: '/plugins/pane' },
          { text: 'PDF', link: '/plugins/pdf' },
          { text: 'Picker', link: '/plugins/picker' },
          { text: 'Rainbow parens', link: '/plugins/rainbow-parens' },
          { text: 'Show paren', link: '/plugins/show-paren' },
          { text: 'Terminal', link: '/plugins/terminal' },
          { text: 'Tree-sitter', link: '/plugins/treesitter' },
          { text: 'Undotree', link: '/plugins/undotree' },
          { text: 'Vim', link: '/plugins/vim' },
          { text: 'Workspace', link: '/plugins/workspace' },
          { text: 'Workspace dock', link: '/plugins/workspace-dock' },
        ],
      },
      {
        text: 'How-to guides',
        items: [
          { text: 'Builtin themes', link: '/guides/builtin-themes' },
          { text: 'Changelog', link: '/guides/changelog' },
          { text: 'Change keybindings', link: '/guides/change-keybindings' },
          { text: 'Change theme and font', link: '/guides/change-theme' },
          { text: 'Change terminal shell', link: '/guides/change-terminal-shell' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/samwdp/volt' }],

    outline: { level: [2, 3] },

    footer: {
      message: 'Volt — modal editor platform · docs optimized for in-editor help search',
      copyright: 'MIT',
    },

    search: undefined,
  },

  markdown: {
    theme: 'one-dark-pro',
  },
})
