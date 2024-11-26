<script lang="ts">
export default {
  props: {
    title: String,
  },
}
</script>
<template>
  <section
    class="w-full px-8 md:px-16 relative bg-white py-20 relative z-10"
    id="section2"
    style="
      box-shadow:
        0 -2em 5em rgba(255, 255, 255, 1),
        0 2em 5em rgba(255, 255, 255, 1);
    "
  >
    <div class="max-w-prose m-auto w-full">
      <h2 class="text-4xl mb-4 font-sans">{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>
