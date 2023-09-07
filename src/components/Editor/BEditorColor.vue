<template>
  <div class="row items-center justify-between">
      <color-picker v-model="color" @set-color="setColor"  />
    <q-btn @click="unsetColor()" size="sm" icon="format_color_reset" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Editor } from '@tiptap/vue-3';
import ColorPicker from 'components/Editor/ColorPicker.vue';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();

const color = ref('');

const setColor = (color: string) => {
  props.editor.chain().focus().setColor(color).run();
};

const unsetColor = () => {
  color.value = ''
  props.editor.chain().focus().unsetColor().run();
};

</script>
