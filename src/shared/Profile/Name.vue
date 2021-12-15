<template>
  <h1 class="name lead text-gray-600 rock-salt text-center">
    {{ author }}
  </h1>
</template>

<script setup>
/* library imports */
import { computed } from 'vue'
import { useStore } from 'vuex'

/* state management */
const store = useStore()
const author = computed(() => store.getters.getAppAuthor)
</script>

<style scoped>
.name {
  padding: 70px 0;
}
</style>
