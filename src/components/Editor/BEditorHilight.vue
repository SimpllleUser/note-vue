<script setup lang="ts">
import { computed, ref} from 'vue';
import { Editor } from '@tiptap/vue-3';
import ColorPicker from "components/Editor/ColorPicker.vue";

interface Props {
  editor: Editor;
  colors?: Array<string>;
}

const props = defineProps<Props>();

const setColor = (color: string) => {
  props.editor.chain().focus().toggleHighlight({ color }).run();

};

const isActive = (color: string) =>
  props.editor.isActive('highlight', { color });

const toggleHighlight = () => {
  props.editor.chain().focus().toggleHighlight().run();
};

const color = ref('')
const isActiveHighlight = computed(() => props.editor.isActive('highlight'));
</script>

<template>
  <div class="row justify-between">
    <q-btn
      @click="toggleHighlight"
      :class="{ 'is-active': isActiveHighlight }"
      icon="border_color"
      size="sm"
    />
    <color-picker v-model="color" @set-color="setColor" />
    <q-btn
      @click="editor.chain().focus().unsetHighlight().run()"
      :disabled="!isActiveHighlight"
      icon="format_color_reset"
      size="sm"
    />
  </div>
</template>
