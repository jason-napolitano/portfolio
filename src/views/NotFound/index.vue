<template>
  <main class="grid">
    <section class="col-12">
      <Message severity="info" :closable="false">
        <div class="text-justify">
          Despite its best efforts, the application could not find the requested
          route. Please use the back button below in order to go back to your
          previous location.
        </div>
      </Message>
    </section>
    <section class="col-12">
      <img
        class="mt-2 img-fluid"
        src="../../assets/images/404.jpg"
        alt="404 Error"
      />
    </section>
    <div class="col-12">
      <br />
    </div>
    <section class="col-12">
      <div class="text-center">
        <Button
          label="Go Back to your previous location"
          class="p-button-info mb-2"
          @click="goBack"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import Message from 'primevue/message'
import Button from 'primevue/button'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { useRouter } from 'vue-router'

/* --------------------------------------------------------------------------
 * Component variables
 * ----------------------------------------------------------------------- */

// Router instance
const router = useRouter()

/* --------------------------------------------------------------------------
 * Component methods
 * ----------------------------------------------------------------------- */

/**
 * Go back to the previous location
 *
 * @returns {void}
 */
const goBack = () => {
  router.go(-1)
}
</script>
