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
    <!-- Ad blocker detection
    <section>
      <Dialog
        :style="{ 'max-width': '85vw' }"
        :visible="showAdBlockDialog"
        :close-on-escape="true"
        :show-header="false"
        :closable="false"
        position="top"
        :modal="true"
        class="mt-0"
      >
        <p class="text-center pt-3">
          An AdBlocker was detected. Please note that I do not advertise on this
          site.
        </p>
        <p class="text-center text-gray-600 font-light">
          (Disabling it is appreciated)
        </p>
        <template #footer>
          <Button
            @click="showAdBlockDialog = false"
            class="p-button-danger w-full"
            label="Close Window"
          />
        </template>
      </Dialog>
    </section>
    -->
  </main>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import ScrollTop from 'primevue/scrolltop'
import AppNavbar from './layout/Navbar'
import AppFooter from './layout/Footer'
//import Button from 'primevue/button'
//import Dialog from 'primevue/dialog'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { checkAdBlocker } from './utils'
import { onMounted, ref } from 'vue'

/* --------------------------------------------------------------------------
 * Component mounting
 * ----------------------------------------------------------------------- */
onMounted(async () => {
  // Disable context menu
  window.addEventListener(`contextmenu`, (e) => e.preventDefault())

  // Disable dragging of elements
  window.ondragstart = () => false

  // Ad blocker detection
  checkAdBlockerStatus()
})

/* --------------------------------------------------------------------------
 * AdBlocker references
 * ----------------------------------------------------------------------- */
// Is a ad-blocker detected?
const adBlockerDetected = ref(false)

// Show AdBlock dialog window?
const showAdBlockDialog = ref(false)

/**
 * Check the ad blocker status
 *
 * @returns {void}
 */
const checkAdBlockerStatus = async () => {
  // Detect ad-blocker
  adBlockerDetected.value = await checkAdBlocker()

  // If an ad-blocker is detected ...
  if (adBlockerDetected.value) {
    // Show the ad-block dialog window
    showAdBlockDialog.value = true
  }
}
</script>

<!-- App CSS -->
<style>
.content-container {
  border: 1px solid #e1e1e1;
}
</style>
