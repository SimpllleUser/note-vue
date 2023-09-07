<script setup lang="ts">
import { colors } from 'components/Editor/constants';
import { computed, ref } from 'vue';
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
}>()

interface Emits {
  (event: 'set-color', payload: string): void
  (event: 'update:modelValue', payload: string): void
}

const emit = defineEmits<Emits>()


const colorSelected = useVModel(props, 'modelValue', emit)
const setColor = (color: string) => {
  colorSelected.value = color;
  emit('set-color', color);
}

const colorFromInputPicker = ref('')
const iconColorSelectorStyle = computed(() => `color: ${colorSelected.value}`)
</script>


<template>
  <div class="row items-center">
    <input v-model="colorFromInputPicker" class="hidden" type="color" name="input-color-picker" id="input-color-picker"
           @input="setColor(colorFromInputPicker)"/>

    <label for="input-color-picker">
      <q-icon name="color_lens" size="md" :style="iconColorSelectorStyle"/>
    </label>
  </div>
  <q-btn
    v-for="color in colors"
    :key="color"
    @click="setColor(color)"
    no-caps
    unelevated
    size="sm"
    class="q-ma-sm"
    :class="{'shadow-up-3': color === colorSelected}"
    :style="`background-color: ${color}; color: ${color}`"
  >
    <div class="test">
      c
    </div>
  </q-btn>
</template>

<style lang="scss">

</style>


