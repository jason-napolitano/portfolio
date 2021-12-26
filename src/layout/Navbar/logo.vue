<template>
  <div class="flex justify-content-start flex-wrap">
    <div class="flex align-items-center justify-content-center">
      <span class="rock-salt">{{ appTitle }}</span>
    </div>
    <div class="flex align-items-center justify-content-center">
      <img
        src="../../assets/images/navbar-logo.svg"
        width="30"
        height="24"
        :alt="appTitle"
        class="ml-1"
      />
    </div>
  </div>
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
