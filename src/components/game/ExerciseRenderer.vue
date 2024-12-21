<template>
    <div v-if="grid">

        <GridRenderer :grid="grid" />

        <QuestDisplay :questKey="exercise.quest" />

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Exercise } from '../../data/exercises';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';
import { dragDropStore } from '../../stores/dragDropStore';
import type { Grid } from '../../types';
import { GameHelper } from '../../classes/GameHelper';

const props = defineProps<{
    exercise: Exercise
}>();

const grid = ref(undefined as (Grid | undefined)) 

onMounted(() => {
    grid.value = GameHelper.createGameGrid(props.exercise.grid)
    console.log('created grid', grid.value)
})




</script>