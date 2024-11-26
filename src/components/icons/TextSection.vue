<script lang="ts">
export default {
  props: {
    title: String,
  },
}
</script>
<template>
  <section
    class="w-full px-4 relative bg-white"
    id="section2"
    style="filter: drop-shadow(2em 5em 1em rgb(255 255 255 / 1))"
  >
    <div class="max-w-prose m-auto w-full">
      <h2 class="text-3xl mb-4 font-sans">{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>
