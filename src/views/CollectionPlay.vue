<template>
    <div class="" v-if="collection">
        <ExerciseRenderer v-if="currentExercise" :exercise="currentExercise" @exercise-over="handleExerciseDone" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { gameDataStore } from '../stores/gameData';
import type { Collection } from '../iguanodo/types/Collection';
import ExerciseRenderer from '../components/game/ExerciseRenderer.vue';
import type { Exercise } from '../data/exercises';
import { CollectionHelper } from '../iguanodo/types/classes/CollectionHelper';

const props = defineProps<{
    id: string
}>();

const collection = ref(undefined as (Collection | undefined))
const currentExercise = ref(undefined as (Exercise | undefined))

onMounted(() => {
    collection.value = gameDataStore.getCollectionById(props.id)
    startNextExercise()
})

function handleExerciseDone() {
    currentExercise.value = undefined
    setTimeout(() => {
        startNextExercise()
    }, 100)
}

function startNextExercise() {
    if (collection.value) currentExercise.value = CollectionHelper.getRandomExerciseFromCollection(collection.value)
}


</script>