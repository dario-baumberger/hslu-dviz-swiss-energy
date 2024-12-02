<template>
  <div class="flex h-auto w-full flex-col">
    <div class="relative h-auto min-h-4 pt-10 pb-5">
      <span class="absolute top-0 left-0">{{ min }}</span>
      <span class="absolute top-0 right-0">{{ max }}</span>
      <label v-if="min && max && knob1 !== null">
        <span class="sr-only">Limit 1</span>
        <input
          class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
          type="range"
          v-model.number="knob1"
          :min="min"
          :max="max"
          @input="updateKnob1"
        />
      </label>
      <label v-if="min && max && knob2 !== null">
        <span class="sr-only">Limit 2</span>
        <input
          class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200"
          type="range"
          v-model.number="knob2"
          :min="min"
          :max="max"
          @input="updateKnob2"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const knob1 = ref(props.low)
    const knob2 = ref(props.high)

    watch(
      () => props.low,
      (newVal) => {
        knob1.value = newVal
      },
    )

    watch(
      () => props.high,
      (newVal) => {
        knob2.value = newVal
      },
    )

    const emitChanged = () => {
      emit('changed', { low: knob1.value, high: knob2.value })
    }

    const updateKnob1 = () => {
      emit('update:low', knob1.value)
      emitChanged()
    }

    const updateKnob2 = () => {
      emit('update:high', knob2.value)
      emitChanged()
    }

    return {
      knob1,
      knob2,
      updateKnob1,
      updateKnob2,
    }
  },
})
</script>
