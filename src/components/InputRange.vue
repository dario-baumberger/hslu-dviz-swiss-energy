<template>
  <div class="flex h-auto w-full flex-col">
    <div class="relative h-auto min-h-4 pt-10 pb-5">
      <span class="absolute top-0 left-0">{{ min }}</span>
      <span class="absolute top-0 right-0">{{ max }}</span>
      <input
        class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
        type="range"
        v-model.number="knob1"
        :min="min"
        :max="max"
        @input="updateChart"
      />
      <input
        class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
        type="range"
        v-model.number="knob2"
        :min="min"
        :max="max"
        @input="updateChart"
      />
    </div>
  </div>
  test
</template>

<script lang="ts">
export default {
  data() {
    return {
      min: 0,
      max: 100,
      knob1: 10,
      knob2: 40,
    }
  },
  methods: {
    updateChart() {
      console.log('updateChart')
    },
  },
}
</script>
