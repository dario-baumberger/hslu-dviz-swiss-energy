<template>
  <div class="flex h-auto w-full flex-col">
    <div class="relative h-auto min-h-4 pt-8 pb-5">
      <div class="absolute top-0 left-0 right-0 flex justify-between">
        <span class="font-sans text-sm">{{ min }}</span>
        <span class="font-sans text-sm">{{ value }}</span>
        <span class="font-sans text-sm">{{ max }}</span>
      </div>
      <span class="absolute left-0 right-0 h-1 flex justify-between px-3 z-10">
        <span v-for="_ in max - min + 1" :key="_" class="w-2px h-full bg-slate-500"> </span>
      </span>
      <label v-if="min !== null && max !== null && value !== null">
        <span class="sr-only">Limit 1</span>
        <input
          class="appearance-none h-1 w-full absolute pointer-events-none bg-slate-200 rounded-full"
          type="range"
          v-model.number="localValue"
          :min="min"
          :max="max"
          @input="emitChanged"
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
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localValue = ref(props.value)

    watch(
      () => props.value,
      (newVal) => {
        localValue.value = newVal
      },
    )

    const emitChanged = () => {
      emit('update:value', localValue.value)
      emit('changed', localValue.value)
    }

    return {
      localValue,
      emitChanged,
    }
  },
})
</script>
