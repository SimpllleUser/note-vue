<script setup lang="ts">
import { computed } from 'vue';
import { isActive } from '@tiptap/vue-3';

interface Props {
  editor: Editor;
  colors?: Array<string>;
}

const props = defineProps<Props>();

const defaultColors = [
  'red',
  '#ffc078',
  '#8ce99a',
  '#74c0fc',
  '#b197fc',
  '#ffa8a8',
];
const colors = computed(() =>
  props.colors?.length ? props.colors : defaultColors
);

const setColor = (color: string) => {
  props.editor.chain().focus().toggleHighlight({ color }).run();
};

const isActive = (color: string) =>
  props.editor.isActive('highlight', { color });

const toggleHighlight = () => {
  props.editor.chain().focus().toggleHighlight().run();
};

const isActiveHighlight = computed(() => props.editor.isActive('highlight'));
</script>

<template>
  <div class="row">
    <q-btn
      no-caps
      @click="toggleHighlight"
      :class="{ 'is-active': isActiveHighlight }"
    >
      Toggle highlight
    </q-btn>
    <q-btn
      no-caps
      unelevated
      v-for="color in colors"
      :key="color"
      @click="setColor(color)"
      :class="{ 'is-active': isActive(color) }"
      :style="`background-color: ${color}; color: ${color}`"
    >
      {{ c }}
    </q-btn>
    <q-btn
      no-caps
      @click="editor.chain().focus().unsetHighlight().run()"
      :disabled="!isActiveHighlight"
    >
      Unset highlight
    </q-btn>
  </div>
</template>

<style lang="scss" scoped></style>
