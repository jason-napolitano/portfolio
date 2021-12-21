<template>
  <ul class="list-none text-center py-1">
    <li class="mb-2">{{ appTitle }} <small>v</small>.{{ appVersion }}</li>
    <li class="mt-2">&copy; {{ fullYear }}</li>
    <li class="mt-2" @click="openGithubLink">
      <small class="cursor-pointer text-gray-500 pi pi-fw pi-github"></small>
    </li>
  </ul>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { useStore } from 'vuex'
import { computed } from 'vue'

/* --------------------------------------------------------------------------
 * Render variables & computed properties
 * ----------------------------------------------------------------------- */

// Vuex instance
const store = useStore()

// Application version
const appVersion = computed(() => store.getters.getAppVersion)

// Full year
const fullYear = computed(() => store.getters.getFullYear)

// Application title
const appTitle = computed(() => store.getters.getAppTitle)

/* --------------------------------------------------------------------------
 * Component methods
 * ----------------------------------------------------------------------- */

/**
 * Open GitHub link
 *
 * @returns {void}
 */
const openGithubLink = () => {
  window.open('https://github.com/jason-napolitano/portfolio', '_blank')
}
</script>
