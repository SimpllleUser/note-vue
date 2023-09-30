<template>
  <q-page class="row items-center justify-evenly">
    <div class="editor-container q-pa-sm shadow-5">
      <q-input v-model="title" placeholder="Name" borderless dense />
      <text-editor v-model="textEditorValue" placeholder="Let`s write an awesome" />
     <div class="row items-center justify-end">
       <q-btn no-caps size="sm" flat >Save</q-btn>
     </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BEditor from 'src/components/Editor/BEditor.vue';
import TextEditor from 'components/TextEditor.vue';

const textEditorValue = ref('')
const title = ref('')

</script>

<style lang="scss" scoped>
  .editor-container {
    width: 37.5rem;
    border-radius: 0.25rem;
    :deep(.editor) {
      padding: 0.5rem;
      padding-top: 0px;
      min-height: 5rem;
      border-style: none;
      .codex-editor__redactor {
        padding-bottom: 0px !important;
      }
    }
  }
</style>
