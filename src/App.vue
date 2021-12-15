<template>
  <main ref="container" class="container">
    <header class="p-grid">
      <div class="col-12">
        <AppNavbar />
      </div>
    </header>
    <section
      class="p-grid mx-2 border-round-bottom border-round-top bg-white shadow-1"
    >
      <div class="col-12 px-4 py-1">
        <router-view />
      </div>
    </section>
    <footer class="p-grid">
      <div class="col-12">
        <AppFooter />
      </div>
    </footer>
    <section>
      <ScrollTop class="custom-scrolltop" icon="pi pi-arrow-up" />
    </section>
  </main>
</template>

<script setup>
/* imports */
import ScrollTop from 'primevue/scrolltop'
import AppNavbar from './layout/Navbar'
import AppFooter from './layout/Footer'
import { onMounted } from 'vue'

/* component mounting */
onMounted(() => {
  // Disable context menu
  window.addEventListener(`contextmenu`, (e) => e.preventDefault())
  // Disable dragging of elements
  window.ondragstart = () => false
})
</script>

<style scoped lang="scss">
::v-deep(.custom-scrolltop) {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background-color: var(--primary-color);

  &:hover {
    background-color: var(--primary-color);
  }

  .p-scrolltop-icon {
    font-size: 1rem;
    color: var(--primary-color-text);
  }
}
</style>
