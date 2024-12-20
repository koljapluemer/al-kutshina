<template>
    <div v-if="dragDropStore.grid">

        <GridRenderer :gridWithItemNames="dragDropStore.grid" />

        <QuestDisplay :questKey="exercise.quest" />

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { Exercise } from '../../data/exercises';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';
import { dragDropStore } from '../../stores/dragDropStore';

const props = defineProps<{
    exercise: Exercise
}>();

onMounted(() => {
    // passing the ownership of the actual grid to
    // global store, so that changes can be managed there
    dragDropStore.setGrid(props.exercise.grid)
})




</script>