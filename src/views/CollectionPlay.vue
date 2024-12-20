<template>

    <div class="" v-if="collection">
        let's play from collection: {{ collection.id }}

        <ExerciseRenderer v-if="currentExercise" :exercise="currentExercise" />
        <div class="" v-else>no exercise found</div>
    </div>
    <div class="" v-else>
        ...collection loading...
    </div>


</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gameDataStore } from '../stores/gameData';
import type { Collection } from '../iguanodo/types/Collection';
import ExerciseRenderer from '../components/ExerciseRenderer.vue';
import type { Exercise } from '../data/exercises';
import { CollectionHelper } from '../iguanodo/types/classes/CollectionHelper';

const props = defineProps<{
    id: string
}>();

const collection = ref(undefined as (Collection | undefined))
const currentExercise = ref(undefined as (Exercise | undefined))

onMounted(() => {
    collection.value = gameDataStore.getCollectionById(props.id)
    if (collection.value) currentExercise.value = CollectionHelper.getRandomExerciseFromCollection(collection.value)
})

</script>