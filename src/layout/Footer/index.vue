<template>
  <ul class="list-none text-center py-1">
    <li class="mb-2">&copy; {{ footerCopyright }}</li>
    <li
      v-tooltip.hover.top="'GitHub Repository'"
      class="cursor-pointer text-gray-600 mt-2"
      @click="openGithubLink"
    >
      <small class="pi pi-fw pi-github"></small>
    </li>
  </ul>
  <ConfirmDialog :closable="false" />
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useStore } from 'vuex'
import { computed } from 'vue'

/* --------------------------------------------------------------------------
 * Computed properties
 * ----------------------------------------------------------------------- */

// Vuex instance
const store = useStore()

const footerCopyright = computed(
  () =>
    `${store.getters.getFullYear} ${store.getters.getAppTitle} v.${store.getters.getAppVersion}`
)

/* --------------------------------------------------------------------------
 * Confirmation dialog
 * ----------------------------------------------------------------------- */

// PrimeVue API
const confirm = useConfirm()

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
