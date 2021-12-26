<template>
  <main ref="container" class="container">
    <header class="grid mb-1">
      <div class="col-12">
        <AppNavbar />
      </div>
    </header>
    <section class="border-round bg-white content-container">
      <div class="p-3">
        <router-view />
      </div>
    </section>
    <footer class="grid">
      <div class="col-12">
        <AppFooter />
      </div>
    </footer>
    <section>
      <ScrollTop />
    </section>
  </main>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import ScrollTop from 'primevue/scrolltop'
import AppNavbar from './layout/Navbar'
import AppFooter from './layout/Footer'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { onMounted } from 'vue'

/* --------------------------------------------------------------------------
 * Component mounting
 * ----------------------------------------------------------------------- */
onMounted(() => {
  // Disable context menu
  window.addEventListener(`contextmenu`, (e) => e.preventDefault())
  // Disable dragging of elements
  window.ondragstart = () => false
})
</script>

<style>
.content-container {
  border: 1px solid #e1e1e1;
}
</style>
