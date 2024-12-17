<script lang="ts">
import bgImage from '@/assets/img/bg-image.webp'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      bgImage,
      faBolt,
    }
  },
  methods: {
    scrollToSection() {
      const section = document.getElementById('section2')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>
<template>
  <section
    class="w-full p-4 relative bg-white bg-cover relative snap-start snap-always relative z-10"
    id="section1"
  >
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }"
    ></div>
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70"></div>
    <div
      class="max-w-prose m-auto w-full h-screen p-4 flex items-center justify-center flex-col text-center relative text-white"
    >
      <div class="max-w-prose m-auto">
        <h1 class="text-6xl mb-8 font-sans uppercase font-bold">Swiss Energy</h1>
        <p class="text-xl md:text-2xl">
          In 2017, the Swiss public voted in favour of the revised Energy Act. This was the first
          step in implementing the 2050 Energy Strategy.
        </p>
        <p class="text-xl md:text-2xl">How is Switzerland doing?</p>

        <button
          @click="scrollToSection"
          class="animate-bounce mt-20 md:mt-40 inline-flex flex-col justify-center items-center hover:text-yellow-400 transition-all duration-300"
        >
          Scroll Down
          <span class="inline-block w-10 h-10">
            <font-awesome-icon :icon="faBolt" class="text-current text-4xl" />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
