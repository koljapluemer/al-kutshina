<template>
  <header class="p-2 flex justify-center flex-col items-center bg-primary-100">
    <router-link to="/" class="text-center">
      <h1 class="font-bold text-2xl">al kutshina</h1>
      <h2 class="font-bold text-2xl">الكـُتشينـَة</h2>
    </router-link>
  </header>
  <main class="m-auto max-w-screen-lg grow ">
    <RouterView></RouterView>
  </main>
  <footer class="m-auto mt-4 text-xs p-4 flex flex-col items-center gap-1">
    <p class="text-center">Anonymous learning data is collected for research and to make this game
      better. No personal data and no
      device-related data is saved.</p>
      <p class="text-center">
        Made by <a href="https://koljapluemer.com/" class="link" target="_blank">Kolja Sam Pluemer</a>.
      </p>
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
