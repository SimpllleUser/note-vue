<template>
  <div class="row items-center justify-between">
    <button
      v-for="btn in buttons"
      :key="btn.label"
      @click="btn.action()"
      :class="{ 'is-active': btn.isActive }"
      :disabled="btn.isDisabled"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Editor } from '@tiptap/vue-3';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();
const editor = props.editor;

const buttons = computed(() => [
  {
    label: 'toggleBulletList',
    action: () => editor.chain().focus().toggleBulletList().run(),
    isActive: editor.isActive('bulletList'),
    isDisabled: false,
  },
  {
    label: 'toggleOrderedList',
    action: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor.isActive('orderedList'),
    isDisabled: false,
  },
  {
    label: 'splitListItem',
    action: () => editor.chain().focus().splitListItem('listItem').run(),
    isActive: false,
    isDisabled: !editor.can().splitListItem('listItem'),
  },
  {
    label: 'sinkListItem',
    action: () => editor.chain().focus().sinkListItem('listItem').run(),
    isActive: false,
    isDisabled: !editor.can().sinkListItem('listItem'),
  },
  {
    label: 'liftListItem',
    action: () => editor.chain().focus().liftListItem('listItem').run(),
    isActive: false,
    isDisabled: !editor.can().liftListItem('listItem'),
  },
]);
</script>
