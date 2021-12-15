<template>
  {{ currentTime }}
</template>

<script>
import { defineComponent } from 'vue'
const { format } = require('date-fns')
const getCurrentTime = () => format(new Date(), 'h:mm:ss a')

const LiveClock = defineComponent({
  data() {
    return {
      currentTime: getCurrentTime(),
    }
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = getCurrentTime()
    },
  },
  created() {
    setInterval(() => this.updateCurrentTime(), 1000)
  },
})

export default LiveClock
</script>

<style scoped></style>
