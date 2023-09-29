<template>
  <q-page class="row items-center justify-evenly">
    <div class="full-width">
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
