<template>
  <header class="p-2 flex justify-center flex-col items-center bg-primary-100">
    <router-link to="/" class="text-center">
      <h1 class="font-bold text-2xl">al kutshina</h1>
      <h2 class="font-bold text-2xl">الكـُتشينـَة</h2>
    </router-link>
  </header>
  <main class="m-auto max-w-screen-lg">
    <RouterView></RouterView>
  </main>
  <footer class="footer">
    <p class="text-center m-auto mt-4 text-xs">Anonymous learning data is collected for research and to make this game
      better. No personal data and no
      device-related data is saved.</p>
  </footer>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { GameHelper } from './classes/GameHelper';

onMounted(() => {
  GameHelper.getAllPossibleExerciseStrings()
})

</script>
