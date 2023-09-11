<template>
  <q-page class="row items-center justify-evenly">
    <div class="full-width">
      <text-editor />
      <b-editor v-if="false" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import BEditor from 'src/components/Editor/BEditor.vue';
import TextEditor from 'components/TextEditor.vue';

</script>
