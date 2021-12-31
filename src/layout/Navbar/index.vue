<template>
  <Menubar class="menu-bar" :model="items">
    <template #end>
      <HeaderLogo />
    </template>
  </Menubar>
  <ConfirmDialog :closable="false" />
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import ConfirmDialog from 'primevue/confirmdialog'
import Menubar from 'primevue/menubar'
import HeaderLogo from './logo'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { useConfirm } from 'primevue/useconfirm'
import { ref } from 'vue'

/* --------------------------------------------------------------------------
 * Main menu items
 * ----------------------------------------------------------------------- */

// Menu items
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: { name: 'home-view' },
  },
  {
    label: 'About Me',
    icon: 'pi pi-fw pi-info-circle',
    to: { name: 'about-view' },
  },
  {
    label: 'Contact Me',
    icon: 'pi pi-fw pi-envelope',
    to: { name: 'contact-view' },
  },
  {
    label: 'License',
    icon: 'pi pi-fw pi-calendar',
    to: { name: 'license-view' },
  },
  {
    label: 'Follow Me',
    icon: 'pi pi-pw pi-instagram',
    command: () => {
      openInstagramPage()
    },
  },
])

/* --------------------------------------------------------------------------
 * Menu commands
 * ----------------------------------------------------------------------- */

// Confirmation dialog
const confirm = useConfirm()

/**
 * Open instagram page
 *
 * @returns {void}
 */
const openInstagramPage = () => {
  confirm.require({
    message: 'Are you sure you want to leave?',
    accept: () => {
      window.open('https://instagram.com/napolitano.photos/', '_blank')
    },
    reject: () => {
      console.info('The redirect was rejected')
    },
  })
}
</script>

<!-- Scoped CSS -->
<style scoped>
.menu-bar {
  border-radius: 0 0 0.25rem 0.25rem !important;
  margin-top: -0.25rem;
}
</style>
