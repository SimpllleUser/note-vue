<template>
  <b-editor-menu v-if="editor" :editor="editor" />
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3';
import BEditorMenu from './BEditorMenu.vue';

const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
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

<style lang="scss" scope></style>
