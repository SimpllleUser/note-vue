<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <h1>Test !!!</h1>
    </div>
    <div><b-editor /></div>
    <div>
      <input v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../../.quasar/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import BEditor from 'src/components/Editor/BEditor.vue';

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;
    console.log('Logged in:', user);
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
</script>
