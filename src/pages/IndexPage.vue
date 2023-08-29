<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <q-card class="q-ma-md">
        <q-card-section>
          <div class="text-h6">Add Tiptap Extensions</div>
          <div class="q-gutter-sm">
            <q-chip
              v-for="url in urls"
              :key="url"
              clickable
              @click="openURL(url)"
            >
              {{ getNameFromURL(url) }}
            </q-chip>
          </div>
        </q-card-section>
      </q-card>
      <!-- <div>
        add
        <div>https://tiptap.dev/api/extensions/color</div>
        <div>https://tiptap.dev/api/extensions/focus</div>
        <div>https://tiptap.dev/api/marks/highlight</div>
        <div>https://tiptap.dev/api/extensions/history</div>
        <div>https://tiptap.dev/api/nodes/horizontal-rule</div>
        <div>https://tiptap.dev/api/marks/link</div>
        <div>https://tiptap.dev/api/nodes/list-item</div>
        <div>https://tiptap.dev/api/extensions/placeholder</div>
      </div> -->
      <b-editor />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../../.quasar/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import BEditor from 'src/components/Editor/BEditor.vue';

const urls = ref([
  'https://tiptap.dev/api/extensions/focus',
  'https://tiptap.dev/api/marks/highlight',
  'https://tiptap.dev/api/extensions/history',
  'https://tiptap.dev/api/nodes/horizontal-rule',
  'https://tiptap.dev/api/marks/link',
  'https://tiptap.dev/api/nodes/list-item',
  'https://tiptap.dev/api/extensions/placeholder',
]);

const getNameFromURL = (url: string) => {
  return url.split('/').pop() || '';
};

const openURL = (url: string) => {
  window.open(url, '_blank');
};

const showMoreInfo = () => {
  console.log('Showing more info...');
};
</script>
