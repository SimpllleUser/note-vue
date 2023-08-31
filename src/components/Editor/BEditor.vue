<template>
  <b-editor-menu v-if="editor" :editor="editor" />
  <b-ediotor-table-menu v-if="editor" :editor="editor" />
  <b-editor-color v-if="editor" :editor="editor" />
  <b-editor-hilight v-if="editor" :editor="editor" />
  <hr />
  <q-btn @click="editor.chain().focus().setHorizontalRule().run()">
    Set horizontal rule
  </q-btn>
  <editor-content v-if="editor" :editor="editor" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3';
import '../../css/editor/table.scss';
import BEditorMenu from './BEditorMenu.vue';
import BEdiotorTableMenu from './BEdiotorTableMenu.vue';
import BEditorColor from './BEditorColor.vue';
import BEditorHilight from './BEditorHilight.vue';
import Focus from '@tiptap/extension-focus';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { useTable } from './composables/useTable';

const editor = ref<Editor>();

const { getTableConfig } = useTable(editor.value);

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      HorizontalRule,
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      ...getTableConfig(),
    ],
    autofocus: true,
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

<style lang="scss">
.has-focus {
  border-radius: 3px;
  box-shadow: 0 0 0 3px #68cef8;
}
</style>
