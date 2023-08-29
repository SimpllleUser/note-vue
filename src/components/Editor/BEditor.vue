<template>
  <b-editor-menu v-if="editor" :editor="editor" />
  <b-ediotor-table-menu v-if="editor" :editor="editor" />
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3';
import '../../css/editor/table.scss';
import BEditorMenu from './BEditorMenu.vue';
import BEdiotorTableMenu from './BEdiotorTableMenu.vue';

import { useTable } from './composables/useTable';

const editor = ref<Editor>();

const { getTableConfig } = useTable(editor.value);

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit, ...getTableConfig()],
    content: `
        <h2>
          Hi there,
        </h2>
        `,
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style lang="scss"></style>
