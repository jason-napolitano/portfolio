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
/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { defineProps } from 'vue'

/* --------------------------------------------------------------------------
 * Component Props
 * ----------------------------------------------------------------------- */
defineProps({
  // Which image do we want to use?
  image: {
    type: String,
    default: 'wheel',
    required: false,
    validator: (value) => ['wheel', 'bars'].includes(value),
  },
  // How do we want to align the
  // message body text?
  align: {
    type: String,
    default: 'center',
    required: false,
    validator: (value) =>
      ['center', 'left', 'right', 'justify'].includes(value),
  },
  // Do we want to show the loading
  // image?
  showSvg: {
    type: Boolean,
    default: true,
  },
  // Do we want the loading icon on
  // top or on bottom of the text?
  svgPosition: {
    type: String,
    default: 'top',
    required: false,
    validator: (value) => ['top', 'bottom'].includes(value),
  },
  // Width of loading image
  width: {
    type: [Number, String],
    default: 80,
    required: false,
  },
  // Height of loading image
  height: {
    type: [Number, String],
    default: 80,
    required: false,
  },
})
</script>

<!-- Scoped CSS -->
<style scoped>
.loading-image {
  margin: 0 auto !important;
}
</style>
