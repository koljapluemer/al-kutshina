<template>
  <main class="m-auto max-w-screen-lg">
    <RouterView></RouterView>
  </main>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { GameHelper } from './classes/GameHelper';

onMounted(()=> {
  GameHelper.getAllPossibleExerciseStrings()
})

</script>
