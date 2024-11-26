<script lang="ts">
import bgImage from '@/assets/img/bg-image.webp'

export default {
  data() {
    return {
      bgImage,
    }
  },
}
</script>
<template>
  <section
    class="w-full p-4 relative bg-white bg-cover relative snap-start snap-always"
    id="section1"
  >
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }"
    ></div>
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
    <div
      class="max-w-prose m-auto w-full h-screen p-4 flex items-center justify-center flex-col text-center relative text-white"
    >
      <div>
        <h1 class="text-6xl mb-8 font-sans uppercase font-bold">Swiss Energy</h1>
        <p class="font-serif">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi provident fugiat nihil eum
          laboriosam excepturi explicabo, nisi consequuntur odio praesentium ea, reiciendis iste
          eveniet tempora labore perspiciatis qui officia ullam!
        </p>

        <a
          href="#section2"
          class="animate-bounce mt-10 inline-flex flex-col justify-center items-center mt-40"
        >
          Scroll Down
          <span class="inline-block w-10 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white">
              <path
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
