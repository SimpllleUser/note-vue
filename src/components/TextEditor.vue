<template>
  <div class="full-width">
    <div ref="editorRef" class="editor" id="editorjs"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import EditorJS, {API} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import ColorPlugin from 'editorjs-text-color-plugin';
import RawTool from '@editorjs/raw';
import { useVModel } from '@vueuse/core'
interface Props {
  modelValue: string

}

interface Emits {
  (event: 'update:modelValue', payload: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})
const emit = defineEmits<Emits>()

const savedContent = useVModel(props, 'modelValue', emit)

const editorRef = ref<HTMLElement | null>(null);


onMounted(() => {
  const editor = new EditorJS({
    autofocus: true,
    holder: editorRef.value,
    data: savedContent.value ? JSON.parse(savedContent.value) : '',
    tools: {
      raw: RawTool,
      table: Table,
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
        inlineToolbar: true,
      },
      inlineCode: {
        class: InlineCode,
        shortcut: 'SHIFT+C',
        inlineToolbar: true,
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      header: {
        class: Header,
        inlineToolbar: true,
      },
      linkTool: {
        class: LinkTool,
        inlineToolbar: true,
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      Color: {
        class: ColorPlugin,
        config: {
          colorCollections: [
            '#EC7878',
            '#9C27B0',
            '#673AB7',
            '#3F51B5',
            '#0070FF',
            '#03A9F4',
            '#00BCD4',
            '#4CAF50',
            '#8BC34A',
            '#CDDC39',
            '#FFF',
          ],
          defaultColor: '#FF1300',
          type: 'text',
          customPicker: true, // add a button to allow selecting any color
        },
      },
    },
    onInit: (editorInstance: { blocks: { render: (arg0: never[]) => void; }; }) => {
      console.log('Editor.js is initialized and ready to use');

      editorInstance.blocks.render([
      ]);

    },
    onChange(api: API, event: BlockMutationEvent | BlockMutationEvent[]) {
      saveContent()
    }
  });

  editorRef.value!.editor = editor;
});

const saveContent = () => {
  editorRef.value!.editor
    .save()
    .then((outputData) => {
      savedContent.value = JSON.stringify(outputData, null, 2);
    })
    .catch((error) => {
      console.error('Saving failed: ', error);
    });
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
