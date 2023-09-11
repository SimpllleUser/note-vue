<template>
  <div class="full-width">
    <div ref="editorRef" class="editor"></div>
    <button @click="saveContent">Save Content</button>
    <div v-html="savedContent" class="output"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import Paragraph  from '@editorjs/paragraph';
import Table  from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Marker  from '@editorjs/marker';
import ColorPlugin from 'editorjs-text-color-plugin';

export default {
  data() {
    return {
      editor: null,
      savedContent: '',
    };
  },
  setup() {
    const editorRef = ref(null);

    onMounted(() => {
      const editor = new EditorJS({
        autofocus: true,
        holder: editorRef.value,
        tools: {
          table: Table,
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'SHIFT+C',
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          image: {
            class: SimpleImage,
          },
          header: {
            class: Header,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
              defaultColor: '#FF1300',
              type: 'text',
              customPicker: true // add a button to allow selecting any colour
            }
          },
        },
      });

      editorRef.value.editor = editor;
    });

    return { editorRef };
  },
  methods: {
    saveContent() {
      this.editorRef.editor
        .save()
        .then((outputData) => {
          this.savedContent = JSON.stringify(outputData, null, 2);
        })
        .catch((error) => {
          console.error('Saving failed: ', error);
        });
    },
  },
};
</script>

<style>
.editor {
  border: 1px solid #ccc;
  min-height: 300px;
  width: 100%;
}
.output {
  margin-top: 20px;
}

.emoji-icon {
  cursor: pointer;
  font-size: 24px;
}

.emoji-wrapper {
  display: inline-block;
}
</style>
