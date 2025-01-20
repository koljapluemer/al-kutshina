<template>
    <ExerciseRenderer v-if="currentExercise" :exercise="currentExercise" :language="language"
        @exercise-over="handleExerciseDone" />

    <div class="bg-slate-100 rounded p-4 m-2" v-if="!tutorialDone">
        <p class="font-bold"><span class="bg-yellow-300">Tutorial: </span>Drag and drop the card to solve the puzzle.</p>
        <img src="/tutorial.webp" alt="Graphic demonstrating how to drag the card onto the correct card." class="opacity-80 w-72">
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ExerciseRenderer from '../components/game/ExerciseRenderer.vue';
import { GameHelper } from '../classes/GameHelper';
import type { Exercise } from '../types';
import { defineProps } from 'vue';

defineProps({
    language: {
        type: String,
        required: true,
    },
});


const currentExercise = ref(undefined as (Exercise | undefined))


onMounted(() => {
    startNextExercise()
})

function handleExerciseDone() {
    tutorialDone.value = true
    localStorage.setItem('tutorial-done', 'true')
    currentExercise.value = undefined
    setTimeout(() => {
        startNextExercise()
    }, 100)
}

function startNextExercise() {
    if (tutorialDone.value) {
        currentExercise.value = GameHelper.generateRandomExercise()
    } else {
        currentExercise.value = tutorialExercise
    }
}


// TUTORIAL STUFF

const tutorialDone = ref(false)
onMounted(() => {
    if (localStorage.getItem('tutorial-done')) {
        tutorialDone.value = true
    }
})

// feed cat
const tutorialExercise: Exercise = {
    grid: [[
        { key: 'cat', itemId: 'cat_brown' },
        { key: 'cat_food', itemId: 'cat_food' }
    ]],
    quest: 'cat_food-feed-cat',
}

</script>