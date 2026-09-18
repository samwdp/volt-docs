import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import HelpSearchPage from './components/HelpSearchPage.vue'
import './custom.css'
import './home.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HelpSearchPage', HelpSearchPage)
  },
}

export default theme
