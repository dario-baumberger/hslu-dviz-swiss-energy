<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    const sectionRef = ref<HTMLElement | null>(null)
    const isVisible = ref(false)

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        } else {
          isVisible.value = false
        }
      })
    }

    let observer: IntersectionObserver

    onMounted(() => {
      observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.1, // Adjust the threshold as needed
      })

      if (sectionRef.value) {
        observer.observe(sectionRef.value)
      }
    })

    onBeforeUnmount(() => {
      if (sectionRef.value) {
        observer.unobserve(sectionRef.value)
      }
    })

    return {
      sectionRef,
      isVisible,
    }
  },
})
</script>

<template>
  <section
    ref="sectionRef"
    :class="{
      'opacity-1 pointer-events-auto': isVisible,
      'opacity-0 pointer-events-none	': !isVisible,
    }"
    class="bg-white relative overflow-hidden h-screen w-full"
  >
    <div class="fixed top-0 bottom-0 h-screen flex items-center justify-center w-full">
      <div class="w-full max-w-5xl m-auto">
        <h2 class="text-3xl mb-4 font-sans">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </section>
</template>
