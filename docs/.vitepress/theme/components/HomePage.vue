<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'

const menuOpen = ref(false)
const activeSection = ref('overview')
const copiedCommand = ref<string | null>(null)

const sections = ['overview', 'guides', 'architecture', 'crates', 'workflows', 'commands'] as const

const hubCards = [
  {
    tag: 'Start',
    title: 'Getting started',
    body: 'Install, launch, and take the first steps with Volt’s modal editing core.',
    href: '/getting-started',
  },
  {
    tag: 'Plugins',
    title: 'User packages',
    body: 'Create plugins, wire hooks and commands, edit builtins, and understand the compiled user library.',
    href: '/user-packages/overview',
  },
  {
    tag: 'Runtime YAML',
    title: 'Configuration',
    body: 'Edit user/config.yaml for workspace discovery, ACP, UI defaults, and oil without recompiling.',
    href: '/configuration',
  },
  {
    tag: 'Languages',
    title: 'Add a language',
    body: 'Register tree-sitter grammars, theme mappings, hooks, and optional LSP servers.',
    href: '/languages/add-language',
  },
  {
    tag: 'Catalog',
    title: 'Builtin plugins',
    body: 'Browse the shipped plugin surface — LSP, DAP, terminal, oil, picker, vim, and more.',
    href: '/plugins/catalog',
  },
  {
    tag: 'Help',
    title: 'In-editor search',
    body: 'Natural-language help ranked with client-side TF-IDF — the same index the editor opens.',
    href: '/search',
  },
] as const

const stackLayers = [
  {
    title: 'Experience Layer',
    body: 'SDL shell, pickers, hover, terminal buffers, status surfaces.',
    label: 'UI',
    tone: 'purple',
  },
  {
    title: 'Package Layer',
    body: 'Commands, hooks, keymaps, themes, LSP and DAP defaults.',
    label: 'Extensibility',
    tone: 'cyan',
  },
  {
    title: 'Core Layer',
    body: 'Editor runtime, buffers, syntax, rendering, picker, Git, jobs.',
    label: 'Engine',
    tone: 'green',
  },
  {
    title: 'Systems Layer',
    body: 'Tokio, plugin host, message flow, SDL platform integration.',
    label: 'Infrastructure',
    tone: 'rust',
  },
] as const

const insights = [
  {
    index: '01',
    title: 'Thin executable, rich bootstrap.',
    body: 'crates/volt stays lean while bootstrap assembles the runtime, user packages, registries, and shell entry points.',
  },
  {
    index: '02',
    title: 'EditorRuntime is the gravity well.',
    body: 'The runtime binds model state, services, commands, hooks, and keymaps into one programmable center.',
  },
  {
    index: '03',
    title: 'User packages shape the experience.',
    body: 'Themes, keybindings, language tools, and hooks live in the compiled user layer — not hard-wired into core.',
  },
] as const

const systems = [
  {
    tag: 'Shell',
    title: 'Editor shell and UI state',
    body: 'editor-sdl owns the SDL shell, shell-local services, picker overlays, hover flows, and workspace interactions.',
    tone: 'purple',
  },
  {
    tag: 'Plugins',
    title: 'Package metadata to behavior',
    body: 'user/sdk is the ABI-stable plugin surface; editor-plugin-host turns declarations into commands, hooks, and keybindings.',
    tone: 'cyan',
  },
  {
    tag: 'Core',
    title: 'Model, commands, hooks, keymaps',
    body: 'editor-core centers the runtime while neighboring crates handle buffers, syntax, themes, rendering, and tools.',
    tone: 'green',
  },
  {
    tag: 'Platform',
    title: 'Async systems and integration',
    body: 'Tokio jobs, terminal execution, language tooling, debugging, and SDL platform work give Volt its IDE feel.',
    tone: 'rust',
  },
] as const

const crateGroups = [
  {
    title: 'Application entry',
    items: ['volt executable', 'editor-sdl shell frontend', 'user compiled layer', 'xtask automation'],
  },
  {
    title: 'Core model',
    items: [
      'editor-core',
      'editor-buffer',
      'editor-render',
      'editor-ui',
      'editor-theme',
      'editor-syntax',
      'editor-icons',
    ],
  },
  {
    title: 'Workspace services',
    items: [
      'editor-fs',
      'editor-picker',
      'editor-jobs',
      'editor-terminal',
      'editor-git',
      'editor-db',
      'editor-path',
    ],
  },
  {
    title: 'Language tooling',
    items: ['editor-lsp', 'editor-dap', 'user/sdk', 'editor-plugin-host'],
  },
] as const

const workflows = [
  {
    step: '01',
    title: 'Boot the hidden shell smoke test',
    body: 'Use the single-frame shell path to confirm the runtime launches cleanly without staying interactive.',
  },
  {
    step: '02',
    title: 'Exercise the bootstrap path',
    body: 'The non-UI bootstrap demo is the clearest snapshot of runtime registration for commands, hooks, themes, and tooling.',
  },
  {
    step: '03',
    title: 'Validate the workspace pipeline',
    body: 'cargo xtask ci matches the CI-quality path for formatting, lint, and tests across the workspace.',
  },
] as const

const commands = [
  {
    title: 'Launch the editor shell',
    command: 'cargo run -p volt',
    body: 'Starts the SDL shell and lets you explore the interactive editor surface.',
  },
  {
    title: 'Run the hidden smoke test',
    command: 'cargo run -p volt -- --shell-hidden',
    body: 'Useful for runtime verification when you want a non-interactive shell boot.',
  },
  {
    title: 'Inspect the bootstrap flow',
    command: 'cargo run -p volt -- --bootstrap-demo',
    body: 'Prints the subsystem summary for the clearest non-UI runtime overview.',
  },
  {
    title: 'Run the full validation path',
    command: 'cargo xtask ci',
    body: 'Executes the CI-grade format, lint, and test pipeline used across the workspace.',
  },
] as const

const sidebarLinks = [
  { href: '#overview', label: 'Overview', external: false },
  { href: '#guides', label: 'Guides', external: false },
  { href: '#architecture', label: 'Architecture', external: false },
  { href: '#crates', label: 'Crates', external: false },
  { href: '#workflows', label: 'Workflows', external: false },
  { href: '#commands', label: 'Commands', external: false },
  { href: '/user-packages/overview', label: 'Packages ↗', external: true },
  { href: '/configuration', label: 'Configuration ↗', external: true },
  { href: '/languages/add-language', label: 'Languages ↗', external: true },
  { href: '/search', label: 'Help search ↗', external: true },
] as const

let copyTimer: ReturnType<typeof setTimeout> | null = null
let sectionObserver: IntersectionObserver | null = null
let revealObserver: IntersectionObserver | null = null

function linkTo(path: string): string {
  return withBase(path)
}

async function copyCommand(command: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(command)
    copiedCommand.value = command
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copiedCommand.value = null
    }, 1600)
  } catch {
    copiedCommand.value = null
  }
}

function closeMenu(): void {
  menuOpen.value = false
}

onMounted(() => {
  const revealItems = document.querySelectorAll('.volt-home .reveal')
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    )
    revealItems.forEach((item) => revealObserver?.observe(item))

    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !entry.target.id) return
          if ((sections as readonly string[]).includes(entry.target.id)) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.45, rootMargin: '-15% 0px -35% 0px' },
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObserver?.observe(el)
    })
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'))
  }
})

onUnmounted(() => {
  revealObserver?.disconnect()
  sectionObserver?.disconnect()
  if (copyTimer) clearTimeout(copyTimer)
})
</script>

<template>
  <div class="volt-home" :class="{ 'is-menu-open': menuOpen }">
    <div class="ambient ambient-one" aria-hidden="true" />
    <div class="ambient ambient-two" aria-hidden="true" />

    <div class="site-shell">
      <header class="topbar topbar--slim">
        <a class="brand" href="#top" aria-label="Volt home" @click="closeMenu">
          <span class="brand-mark">
            <img class="brand-logo" :src="linkTo('/assets/logo.svg')" alt="Volt logo" />
          </span>
          <span class="brand-copy">
            <strong>Volt</strong>
            <small>Modal editor platform</small>
          </span>
        </a>

        <button
          class="nav-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="page-sidebar"
          @click="menuOpen = !menuOpen"
        >
          Menu
        </button>

        <div class="topbar-actions">
          <a class="button button-ghost" :href="linkTo('/user-packages/overview')">User packages</a>
          <a class="button button-ghost" :href="linkTo('/configuration')">Configuration</a>
          <a class="button button-ghost" :href="linkTo('/languages/add-language')">Languages</a>
          <a class="button button-ghost" :href="linkTo('/plugins/catalog')">Plugins</a>
          <a class="button button-ghost" :href="linkTo('/search')">Help</a>
          <a class="button button-primary" href="#commands">Get started</a>
        </div>
      </header>

      <div class="page-layout">
        <main id="top">
          <section class="hero section">
            <div class="hero-copy">
              <p class="eyebrow">Rust-powered modal editor platform</p>
              <h1>Volt is a modal editor with a layered, programmable core.</h1>
              <p class="hero-text">
                Volt combines a central runtime, compiled user packages, language tooling, and an SDL
                shell into one cohesive editing environment — modular enough to grow without losing
                its shape.
              </p>

              <div class="hero-actions">
                <a class="button button-primary" href="#architecture">Explore the system</a>
                <a class="button button-ghost" :href="linkTo('/getting-started')">Read the docs</a>
              </div>

              <div class="hero-metrics">
                <article class="metric-card reveal">
                  <span class="metric-value">19</span>
                  <span class="metric-label">editor crates</span>
                </article>
                <article class="metric-card reveal">
                  <span class="metric-value">YAML</span>
                  <span class="metric-label">runtime plugin config</span>
                </article>
                <article class="metric-card reveal">
                  <span class="metric-value">TF-IDF</span>
                  <span class="metric-label">in-editor help search</span>
                </article>
              </div>
            </div>

            <aside class="hero-panel reveal" aria-label="Volt architecture snapshot">
              <div class="panel-heading">
                <span class="panel-kicker">Runtime topology</span>
                <strong>From shell to platform</strong>
              </div>

              <div class="stack">
                <article
                  v-for="layer in stackLayers"
                  :key="layer.title"
                  class="stack-layer"
                  :class="`layer-${layer.tone}`"
                >
                  <div>
                    <h2>{{ layer.title }}</h2>
                    <p>{{ layer.body }}</p>
                  </div>
                  <span>{{ layer.label }}</span>
                </article>
              </div>
            </aside>
          </section>

          <section id="overview" class="overview-grid section">
            <article class="feature-panel reveal">
              <p class="panel-label">Editor identity</p>
              <h2>Modal muscle with modern editor systems.</h2>
              <p>
                Volt bridges fast modal editing with workspace discovery, external tooling, rich
                overlays, and programmable runtime services.
              </p>
            </article>

            <article class="feature-panel reveal">
              <p class="panel-label">Customization model</p>
              <h2>User packages shape the experience.</h2>
              <p>
                Themes, language registrations, hooks, keybindings, and package metadata live in the
                compiled user layer so behavior stays declarative where possible.
              </p>
              <p class="feature-follow">
                Selected plugin settings also load from <code>user/config.yaml</code> at runtime —
                workspace roots, ACP clients, terminal defaults, and oil chords can change without a
                rebuild.
              </p>
              <p class="feature-follow">
                <a class="text-link" :href="linkTo('/user-packages/overview')">User packages guide →</a>
                ·
                <a class="text-link" :href="linkTo('/configuration')">Configuration guide →</a>
              </p>
            </article>

            <article class="feature-panel reveal">
              <p class="panel-label">Workspace shape</p>
              <h2>Small crates, clear boundaries.</h2>
              <p>
                The workspace is split by domain: text buffers, rendering, themes, syntax, terminal,
                Git, language servers, debugging, plugins, and the SDL shell each have explicit homes.
              </p>
            </article>
          </section>

          <section id="guides" class="section">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Documentation hub</p>
                <h2>Pick the guide that matches your task.</h2>
              </div>
            </div>

            <div class="doc-hub-grid">
              <a
                v-for="card in hubCards"
                :key="card.href"
                class="doc-hub-card reveal"
                :href="linkTo(card.href)"
              >
                <span class="doc-hub-tag">{{ card.tag }}</span>
                <h3>{{ card.title }}</h3>
                <p>{{ card.body }}</p>
              </a>
            </div>
          </section>

          <section id="architecture" class="section">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Architecture</p>
                <h2>The system map that drives everything else.</h2>
              </div>
              <a class="text-link" :href="linkTo('/getting-started')">Start with the guide →</a>
            </div>

            <div class="architecture-notes">
              <article v-for="item in insights" :key="item.index" class="insight-card reveal">
                <span class="insight-index">{{ item.index }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.body }}</p>
              </article>
            </div>

            <div class="systems-grid systems-follow">
              <article
                v-for="system in systems"
                :key="system.tag"
                class="system-card reveal"
                :class="`accent-${system.tone}`"
              >
                <span class="system-tag">{{ system.tag }}</span>
                <h3>{{ system.title }}</h3>
                <p>{{ system.body }}</p>
              </article>
            </div>
          </section>

          <section id="crates" class="section">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Workspace crates</p>
                <h2>The pieces that make up Volt.</h2>
              </div>
              <p class="section-copy">
                Organized by domain so each subsystem stays legible and can evolve independently.
              </p>
            </div>

            <div class="crate-grid">
              <article v-for="group in crateGroups" :key="group.title" class="crate-card reveal">
                <h3>{{ group.title }}</h3>
                <ul>
                  <li v-for="item in group.items" :key="item"><code>{{ item }}</code></li>
                </ul>
              </article>
            </div>
          </section>

          <section id="workflows" class="section">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Operator workflows</p>
                <h2>Common ways to understand and validate the editor.</h2>
              </div>
            </div>

            <div class="workflow-timeline">
              <article v-for="flow in workflows" :key="flow.step" class="workflow-step reveal">
                <span>{{ flow.step }}</span>
                <div>
                  <h3>{{ flow.title }}</h3>
                  <p>{{ flow.body }}</p>
                </div>
              </article>
            </div>
          </section>

          <section id="commands" class="section">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Commands</p>
                <h2>High-signal entry points.</h2>
              </div>
            </div>

            <div class="command-grid">
              <article v-for="cmd in commands" :key="cmd.command" class="command-card reveal">
                <div class="command-header">
                  <h3>{{ cmd.title }}</h3>
                  <button
                    class="copy-button"
                    type="button"
                    :class="{ 'is-copied': copiedCommand === cmd.command }"
                    @click="copyCommand(cmd.command)"
                  >
                    {{ copiedCommand === cmd.command ? 'Copied' : 'Copy' }}
                  </button>
                </div>
                <pre><code>{{ cmd.command }}</code></pre>
                <p>{{ cmd.body }}</p>
              </article>
            </div>
          </section>
        </main>

        <aside
          id="page-sidebar"
          class="page-sidebar"
          :class="{ 'is-open': menuOpen }"
          aria-label="Page navigation"
        >
          <nav class="sidebar-nav" aria-label="On this page">
            <p class="sidebar-nav-label">On this page</p>
            <ul>
              <li v-for="link in sidebarLinks" :key="link.href">
                <a
                  v-if="!link.external"
                  :href="link.href"
                  :class="{ 'is-active': activeSection === link.href.slice(1) }"
                  @click="closeMenu"
                >
                  {{ link.label }}
                </a>
                <a v-else :href="linkTo(link.href)" @click="closeMenu">{{ link.label }}</a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>

      <footer class="site-footer">
        <p>
          <strong>Volt</strong> pairs Vim-style editing with a layered Rust runtime, compiled
          customization, and modern tooling integration.
        </p>
        <div class="site-footer-links">
          <a :href="linkTo('/getting-started')">Docs</a>
          <a href="https://github.com/samwdp/volt">GitHub</a>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  </div>
</template>
