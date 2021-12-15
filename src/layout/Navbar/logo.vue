<template>
  <span class="rock-salt">{{ appTitle }}</span>
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

// Vuex store instance
const store = useStore()

// Application title
const appTitle = computed(() => store.getters.getAppTitle)
</script>
