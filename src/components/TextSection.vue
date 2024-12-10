<script lang="ts">
export default {
  props: {
    title: String,
    hasShadowTop: {
      type: Boolean,
      default: true,
    },
    hasShadowBottom: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedStyle() {
      let boxShadow = ''
      if (this.hasShadowTop) {
        boxShadow += '0 -2em 5em rgba(255, 255, 255, 1)'
      }
      if (this.hasShadowBottom) {
        if (boxShadow) boxShadow += ', '
        boxShadow += '0 2em 5em rgba(255, 255, 255, 1)'
      }
      return { boxShadow }
    },
  },
}
</script>
<template>
  <section
    class="w-full px-8 md:px-16 relative bg-white py-16 relative z-10"
    id="section2"
    :style="computedStyle"
  >
    <div class="max-w-prose m-auto w-full">
      <h2 class="text-3xl md:text-4xl mb-4 font-sans">{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>
