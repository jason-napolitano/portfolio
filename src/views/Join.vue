<template>
  <div class="p-fluid">
    <div class="p-field p-grid mt-5">
      <Message :severity="errorMsg ? 'error' : 'info'" :closable="false">
        {{ infoMessage }}
      </Message>
    </div>
    <div class="p-field p-grid mt-5">
      <label for="email" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
        >Email Address</label
      >
      <div class="p-col-12 p-md-10">
        <InputText v-model="email" id="email" type="email" />
      </div>
    </div>
    <div class="p-field p-grid mt-5">
      <label for="password" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
        >Password</label
      >
      <div class="p-col-12 p-md-10">
        <Password toggleMask v-model="password">
          <template #header>
            <h6>Pick a password</h6>
          </template>
          <template #footer="sp">
            {{ sp.level }}
            <Divider />
            <p class="p-mt-2">Suggestions</p>
            <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
            </ul>
          </template>
        </Password>
      </div>
    </div>
    <div class="p-field p-grid mt-5">
      <label for="password" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
        >Confirm Password</label
      >
      <div class="p-col-12 p-md-10">
        <Password
          v-model="confirmPassword"
          :feedback="false"
          id="password"
          type="password"
        />
      </div>
    </div>
    <div class="p-field p-grid mt-5">
      <div class="p-col-12 p-md-10">
        <Button label="Create an account" @click="register" />
      </div>
    </div>
  </div>
  <div class="p-grid text-center">
    <div class="col-12">
      <Divider />
      <router-link class="no-underline" :to="{ name: 'login-view' }">
        Already have an account? Login</router-link
      >
    </div>
  </div>
  <Toast />
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import Message from 'primevue/message'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

// router & toast instance
const router = useRouter()

/* --------------------------------------------------------------------------
 * Form references
 * ----------------------------------------------------------------------- */

// Email field
const email = ref(null)

// Password field
const password = ref(null)

// Confirm password field
const confirmPassword = ref(null)

// Error message
const errorMsg = ref(null)

/* --------------------------------------------------------------------------
 * Computed properties
 * ----------------------------------------------------------------------- */

// Info message
const infoMessage = computed(() => {
  return errorMsg.value
    ? errorMsg.value
    : `Enter a valid email and password in order to create an account.`
})

/* --------------------------------------------------------------------------
 * Component methods
 * ----------------------------------------------------------------------- */

/**
 * Registration function
 *
 * @returns {Promise<void>}
 */
const register = async () => {
  if (password.value === confirmPassword.value) {
    try {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      await router.push({ name: 'login-view' })
    } catch (error) {
      errorMsg.value = error.message
    }
  }
  errorMsg.value =
    'There was an error with your registration, please try again.'
  setTimeout(() => {
    errorMsg.value = null
  }, 5000)
}
</script>
