<template>
    <ExerciseRenderer v-if="currentExercise" :exercise="currentExercise" @exercise-over="handleExerciseDone" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ExerciseRenderer from '../components/game/ExerciseRenderer.vue';
import { GameHelper } from '../classes/GameHelper';
import type { Exercise } from '../types';

const currentExercise = ref(undefined as (Exercise | undefined))

onMounted(() => {
    startNextExercise()
})

function handleExerciseDone() {
    currentExercise.value = undefined
    setTimeout(() => {
        startNextExercise()
    }, 100)
}

function startNextExercise() {
    currentExercise.value = GameHelper.generateRandomExercise()
}


</script>