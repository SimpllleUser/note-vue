<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <b-editor />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../../.quasar/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import BEditor from 'src/components/Editor/BEditor.vue';
</script>
