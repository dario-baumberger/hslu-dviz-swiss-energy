<script lang="ts">
import bgImage from '@/assets/img/bg-image.webp'

export default {
  data() {
    return {
      bgImage,
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentColor"
              class="w-6"
            >
              <path
                d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
