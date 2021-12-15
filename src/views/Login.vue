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
        <Password
          toggleMask
          :feedback="false"
          v-model="password"
          id="password"
        />
      </div>
    </div>
    <div class="p-field p-grid my-5">
      <div class="p-col-12 p-md-10 p-buttonset">
        <Button
          class="p-button-success text-offwhite"
          label="Account Login"
          @click="login"
        />
        <Button
          class="p-button-info text-offwhite"
          label="Account Logout"
          @click="logout"
        />
      </div>
    </div>
  </div>
  <!-- div class="p-grid text-center">
    <div class="col-12">
      <Divider />
      <router-link class="no-underline" :to="{ name: 'join-view' }"
        >Don't have an account? Create one!</router-link
      >
    </div>
  </div -->
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import InputText from 'primevue/inputtext'
// import Divider from 'primevue/divider'
import Password from 'primevue/password'
import Message from 'primevue/message'
import Button from 'primevue/button'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { supabase } from '../utils/supabase'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

/* --------------------------------------------------------------------------
 * General component references
 * ----------------------------------------------------------------------- */

// vue router and vuex instances
const router = useRouter()

/* --------------------------------------------------------------------------
 * Form references
 * ----------------------------------------------------------------------- */

// Email password
const email = ref(null)

// Password field
const password = ref(null)

// Error message
const errorMsg = ref(null)

/* --------------------------------------------------------------------------
 * Computed properties
 * ----------------------------------------------------------------------- */

// Info message
const infoMessage = computed(() => {
  return errorMsg.value
    ? errorMsg.value
    : `
    Please use your credentials to login to your account.
  `
})

/* --------------------------------------------------------------------------
 * Component methods
 * ----------------------------------------------------------------------- */

/**
 * Login action
 *
 * @returns {Promise<void>}
 */
const login = async () => {
  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    await router.push({ name: 'home-view' })
  } catch (error) {
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = null
    }, 5000)
  }
}

/**
 * Logout action
 *
 * @returns {Promise<void>}
 */
const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    await router.push({ name: 'home-view' })
  } catch (error) {
    errorMsg.value = error.message
  }
}
</script>

<style scoped></style>
