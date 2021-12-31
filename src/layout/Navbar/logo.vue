<template>
  <div class="flex justify-content-start flex-wrap">
    <div class="flex align-items-center justify-content-center">
      <router-link
        class="text-charcoal no-underline rock-salt"
        :to="{ name: 'home-view' }"
      >
        {{ appTitle }}
      </router-link>
    </div>
    <div class="flex align-items-center justify-content-center">
      <router-link :to="{ name: 'home-view' }">
        <img
          src="../../assets/images/navbar-logo.svg"
          :alt="appTitle"
          class="ml-1"
          width="30"
          height="24"
        />
      </router-link>
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
 * Computed properties
 * ----------------------------------------------------------------------- */

// Vuex store instance
const store = useStore()

// Application title
const appTitle = computed(() => store.getters.getAppTitle)
</script>
