<template>
  <div class="grid">
    <div class="col-12">
      <Message
        v-if="!isSuccess && !isError"
        :closable="false"
        class="text-justify"
      >
        Please use the following form to contact me regarding quotes or general
        inquiries. I will try my best to answer each correspondence in a timely
        fashion.
      </Message>
      <Message
        v-if="isSuccess"
        severity="success"
        :closable="false"
        class="text-justify"
      >
        {{ successMessage }}
      </Message>
      <Message
        v-if="isError"
        severity="error"
        :closable="false"
        class="text-justify"
      >
        {{ errorMessage }}
      </Message>
    </div>
  </div>
  <form
    class="p-fluid p-formgrid p-grid"
    @submit.prevent="sendEmail"
    ref="form"
  >
    <div class="p-field my-4 p-col-12">
      <label for="fullname">Full Name</label>
      <InputText name="name" required id="fullname" type="text" />
    </div>
    <div class="p-field my-4 p-col-12">
      <label for="email">Email</label>
      <InputText name="email" required id="email" type="email" />
    </div>
    <div class="p-field my-4 p-col-12">
      <label for="phone">Phone Number</label>
      <InputMask
        name="phone"
        required
        inputId="phone"
        mask="(999) 999-9999"
        v-model="phone"
        placeholder="(999) 999-9999"
      />
    </div>
    <div class="p-field my-4 p-col-12">
      <label for="city">Project Description</label>
      <Textarea name="message" v-model="description" style="height: 250px" />
    </div>
    <div class="p-field my-4 p-col-12">
      <input class="p-button p-button-info" type="submit" value="Send" />
    </div>
  </form>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Textarea from 'primevue/textarea'
import Message from 'primevue/message'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import emailjs from 'emailjs-com'
import { env } from '../utils'
import { ref } from 'vue'

/* --------------------------------------------------------------------------
 * General component references
 * ----------------------------------------------------------------------- */

// Success message
const successMessage = ref(null)

// Error message
const errorMessage = ref(null)

// Was the submission successful?
const isSuccess = ref(null)

// Was there an error?
const isError = ref(null)

/* --------------------------------------------------------------------------
 * Contact form references
 * ----------------------------------------------------------------------- */

// Description field
const description = ref(null)

// Phone number field
const phone = ref(null)

// Contact form reference
const form = ref(null)

// Timeout timer for errorMessage and successMessage
const timer = 12500

/* --------------------------------------------------------------------------
 * Component methods
 * ----------------------------------------------------------------------- */

/**
 * Send the email using EmailJS
 *
 * @returns {void}
 */
const sendEmail = () => {
  // Attempt to send the email
  emailjs
    // Using the emailjs API
    .sendForm(
      env('EMAILJS_SERVICE_ID'),
      env('EMAILJS_TEMPLATE_ID'),
      form.value,
      env('EMAILJS_USER_ID')
    )
    // If successful
    .then(() => {
      // Set isSuccess to true
      isSuccess.value = true
      // Set the successMessage value
      successMessage.value = `
          Your email was sent successfully. Please give me time to review your
          inquiry and I will contact you as soon as I am able to do so. I thank you
          for your patience.
        `
      // Reset the isSuccess message
      setTimeout(() => {
        isSuccess.value = false
      }, timer)
    })
    // Catch any errors
    .catch((error) => {
      // Set isError to true
      isError.value = true
      // Set the errorMessage value
      errorMessage.value =
        error.message ??
        `
          There was an error while sending yor message. Please try again later or contact me directly at
          jnapolitanoit@gmail.com.
        `
      // Reset the isError message
      setTimeout(() => {
        isError.value = false
      }, timer)
    })
}
</script>
