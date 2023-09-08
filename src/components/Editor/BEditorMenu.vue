<script setup lang="ts">
import { Editor, BubbleMenu, FloatingMenu } from '@tiptap/vue-3';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();
const bubbleButtons = [
  { label: 'Bold', command: 'toggleBold', type: 'bold' },
  { label: 'Italic', command: 'toggleItalic', type: 'italic' },
  { label: 'Strike', command: 'toggleStrike', type: 'strike' },
];
const floatingButtons = [
  { label: 'H1', command: 'toggleHeading', type: 'heading', level: 1 },
  { label: 'H2', command: 'toggleHeading', type: 'heading', level: 2 },
  { label: 'Bullet List', command: 'toggleBulletList', type: 'bulletList' },
];
</script>

<template>
  <bubble-menu
    class="bubble-menu"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <button
      v-for="button in bubbleButtons"
      :key="button.label"
      @click="editor.chain().focus()[button.command]().run()"
      :class="{ 'is-active': editor.isActive(button.type) }"
    >
      {{ button.label }}
    </button>
    <b style="color: white">|</b>
    <button
      v-for="button in floatingButtons"
      :key="button.label"
      @click="
        editor.chain().focus()[button.command]({ level: button.level }).run()
      "
      :class="{
        'is-active': editor.isActive(button.type, { level: button.level }),
      }"
    >
      {{ button.label }}
    </button>
  </bubble-menu>

  <floating-menu
    class="floating-menu"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <button
      v-for="button in floatingButtons"
      :key="button.label"
      @click="
        editor.chain().focus()[button.command]({ level: button.level }).run()
      "
      :class="{
        'is-active': editor.isActive(button.type, { level: button.level }),
      }"
    >
      {{ button.label }}
    </button>
  </floating-menu>
</template>

<style lang="scss">
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }
}

.bubble-menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.floating-menu {
  display: flex;
  background-color: #0d0d0d10;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
