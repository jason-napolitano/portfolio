<template>
  <div :class="`text-${align}`">
    <div v-if="svgPosition === 'top' && showSvg">
      <img
        class="loading-image top-50 bottom-50"
        :src="`./img/${image}.svg`"
        :height="height"
        :width="width"
        alt="Loading SVG"
      />
    </div>
    <div>
      <slot name="message">
        <!-- INTENTIONALLY LEFT BLANK -->
      </slot>
    </div>
    <div v-if="svgPosition === 'bottom' && showSvg">
      <img
        class="loading-image top-50 bottom-50"
        :src="`./img/${image}.svg`"
        :height="height"
        :width="width"
        v-if="showSvg"
        alt="Loading SVG"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String,
    default: 'wheel',
    required: false,
    validator: (value) =>
      ['squares', 'pie', 'wheel', 'bars', 'pulse'].includes(value),
  },
  align: {
    type: String,
    default: 'center',
    required: false,
    validator: (value) => ['center', 'left', 'right', 'justify'].includes(value)
  },
  showSvg: {
    type: Boolean,
    default: true,
  },
  svgPosition: {
    type: String,
    default: 'top',
    required: false,
    validator: (value) => ['top', 'bottom'].includes(value),
  },
  width: {
    type: [Number, String],
    default: 80,
    required: false,
  },
  height: {
    type: [Number, String],
    default: 80,
    required: false,
  },
})
</script>

<style scoped>
.loading-image {
  margin: 0 auto !important;
}
</style>
