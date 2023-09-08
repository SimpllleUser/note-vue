<template>
  <b-editor-menu v-if="editor" :editor="editor" />
  <b-ediotor-table-menu v-if="editor" :editor="editor" />
  <b-editor-color v-if="editor" :editor="editor" />
  <b-editor-hilight v-if="editor" :editor="editor" />
  <hr />
  <q-btn @click="editor.chain().focus().setHorizontalRule().run()">
    <q-icon :name="getIconFromPublicByFileName('pan-horizontal')" style="transform: rotate(90deg)" />
    <q-tooltip :delay="300">
      Set horizontal rule
    </q-tooltip>
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
  <div v-if="editor">
    <b-editor-list :editor="editor" />
  </div>
  <div v-if="editor">
    <button
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      toggleCodeBlock
    </button>
    <button
      @click="editor.chain().focus().setCodeBlock().run()"
      :disabled="editor.isActive('codeBlock')"
    >
      setCodeBlock
    </button>
  </div>
  <editor-content v-if="editor" :editor="editor" />
</template>

<script setup lang="ts">
import './style/code-theme/atom-one-light.css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent } from '@tiptap/vue-3';
import '../../css/editor/table.scss';
import BEditorMenu from './BEditorMenu.vue';
import BEdiotorTableMenu from './BEdiotorTableMenu.vue';
import BEditorColor from './BEditorColor.vue';
import BEditorHilight from './BEditorHilight.vue';
import BEditorList from './BEditorList.vue';
import Focus from '@tiptap/extension-focus';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import BulletList from '@tiptap/extension-bullet-list';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import { useTable } from './composables/useTable';
import { lowLightConfig } from './config/useCodeLowLight.ts';
import { getIconFromPublicByFileName } from 'boot/tools'

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
      BulletList,
      OrderedList,
      ListItem,
      Highlight.configure({ multicolor: true }),
      HorizontalRule,
      lowLightConfig,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      // Focus.configure({
      //   className: 'has-focus',
      //   mode: 'all',
      // }),
      Link.configure({
        openOnClick: true,
      }),
      ...getTableConfig(),
    ],
    autofocus: true,
    content: `
        <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
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

.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  pre {
    color: #abb2bf;
    background: #282c34;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }
}
</style>
