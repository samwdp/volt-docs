<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import DocSearch from './components/DocSearch.vue'
import HomePage from './components/HomePage.vue'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template>
  <HomePage v-if="page.isHome" />
  <Layout v-else>
    <template #nav-bar-content-before>
      <DocSearch />
    </template>
  </Layout>
</template>
