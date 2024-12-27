<template>
    <ExerciseRenderer v-if="currentExercise" :exercise="currentExercise" @exercise-over="handleExerciseDone" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ExerciseRenderer from '../components/game/ExerciseRenderer.vue';
import type { Exercise } from '../data/exercises';
import { GameHelper } from '../classes/GameHelper';

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
    const grid:string[][] = GameHelper.generateRandomGrid()
    currentExercise.value = {
        grid: grid,
        quest: "hi",
        collections: []
    }
}


</script>