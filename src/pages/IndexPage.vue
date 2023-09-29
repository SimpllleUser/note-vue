<template>
  <q-page class="row items-center justify-evenly">
    <div class="editor-container shadow-5">
      <text-editor v-model="textEditorValue" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BEditor from 'src/components/Editor/BEditor.vue';
import TextEditor from 'components/TextEditor.vue';

const textEditorValue = ref('')

</script>

<style lang="scss" scoped>
  .editor-container {
    width: 37.5rem;
    border-radius: 0.25rem;
    :deep(.editor) {
      padding: 0.5rem;
      min-height: 5rem;
      border-style: none;
      .codex-editor__redactor {
        padding-bottom: 0px !important;
      }
    }
  }
</style>
