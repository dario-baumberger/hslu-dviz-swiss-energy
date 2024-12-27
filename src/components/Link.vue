<script lang="ts">
export default {
  name: 'StyledLink',
  props: {
    tag: {
      type: String,
      default: 'a',
    },
  },
}
</script>
<template>
  <component class="underline hover:decoration-2 transition-all duration-300" :is="tag">
    <slot />
  </component>
</template>
