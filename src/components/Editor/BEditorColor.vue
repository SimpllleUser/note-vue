<template>
  <div class="row items-center justify-between">
    <div class="row q-pb-md">
      <q-btn
        v-for="color in colors"
        :key="color.value"
        @click="setColor(color.value)"
        no-caps
        unelevated
        class="q-ma-sm"
        :class="{ 'is-active': isActive(color.value) }"
        :style="`background-color: ${color.value}; color: ${color.value}`"
      >
        c
      </q-btn>
    </div>
    <input
      type="color"
      @input="setColor($event.target.value)"
      :value="getCurrentColor()"
    />
    <q-btn @click="unsetColor()">Unset Color</q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Editor } from '@tiptap/vue-3';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();

const colors = ref([
  { label: 'Purple', value: '#958DF1' },
  { label: 'Red', value: '#F98181' },
  { label: 'Orange', value: '#FBBC88' },
  { label: 'Yellow', value: '#FAF594' },
  { label: 'Blue', value: '#70CFF8' },
  { label: 'Teal', value: '#94FADB' },
  { label: 'Green', value: '#B9F18D' },
]);

const setColor = (color: string) => {
  props.editor.chain().focus().setColor(color).run();
};

const unsetColor = () => {
  props.editor.chain().focus().unsetColor().run();
};

const getCurrentColor = () => {
  return props.editor.getAttributes('textStyle').color;
};

const isActive = (color: string) => {
  return props.editor.isActive('textStyle', { color });
};
</script>
