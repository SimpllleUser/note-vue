<template>
  <b-editor-menu v-if="editor" :editor="editor" />
  <b-ediotor-table-menu v-if="editor" :editor="editor" />
  <b-editor-color v-if="editor" :editor="editor" />
  <b-editor-hilight v-if="editor" :editor="editor" />
  <hr />
  <q-btn @click="editor.chain().focus().setHorizontalRule().run()">
    Set horizontal rule
  </q-btn>
  <div v-if="editor">
    <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      setLink
    </button>
    <button
      @click="editor.chain().focus().unsetLink().run()"
      :disabled="!editor.isActive('link')"
    >
      unsetLink
    </button>
  </div>
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
import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3';
import '../../css/editor/table.scss';
import BEditorMenu from './BEditorMenu.vue';
import BEdiotorTableMenu from './BEdiotorTableMenu.vue';
import BEditorColor from './BEditorColor.vue';
import BEditorHilight from './BEditorHilight.vue';
import Focus from '@tiptap/extension-focus';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Link from '@tiptap/extension-link';
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
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Link.configure({
        openOnClick: true,
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

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();

    return;
  }

  // update link
  editor.value
    ?.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run();
};

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style lang="scss">
.has-focus {
  border-radius: 3px;
  box-shadow: 0 0 0 3px #68cef8;
}
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

a {
  color: #68cef8;
}
</style>
