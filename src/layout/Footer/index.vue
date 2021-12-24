<template>
  <ul class="list-none text-center py-1">
    <li class="mb-2">&copy; {{ footerCopyright }}</li>
    <li class="mt-2"><LiveClock /></li>
    <li v-tooltip.hover.top="'Github Repo'" class="mt-2" @click="openGithubLink">
      <small class="cursor-pointer text-gray-500 pi pi-fw pi-github"></small>
    </li>
  </ul>
  <ConfirmDialog :closable="false" />
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import LiveClock from '../../shared/LiveClock'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { useConfirm } from 'primevue/useconfirm'
import { useStore } from 'vuex'
import { computed } from 'vue'

/* --------------------------------------------------------------------------
 * Render variables & computed properties
 * ----------------------------------------------------------------------- */

// Confirmation dialog
const confirm = useConfirm()

// Vuex instance
const store = useStore()

const footerCopyright = computed(() =>
  `${store.getters.getFullYear} ${store.getters.getAppTitle} v.${store.getters.getAppVersion}`
)

/* --------------------------------------------------------------------------
 * Component methods
 * ----------------------------------------------------------------------- */

/**
 * Open GitHub link
 *
 * @returns {void}
 */
const openGithubLink = () => {
  confirm.require({
    message: 'Are you sure you want to leave?',
    accept: () => {
      window.open('https://github.com/jason-napolitano/portfolio', '_blank')
    },
    reject: () => {
      console.info('The redirect was rejected')
    },
  })
}
</script>
