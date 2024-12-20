<template>

<GridRenderer :gridWithItemNames="exercise.grid" />

<QuestDisplay :questKey="'hello world'" />
    
</template>

<script setup lang="ts">
import type { Exercise } from '../../data/exercises';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';

const props = defineProps<{
    exercise: Exercise
}>();


</script>