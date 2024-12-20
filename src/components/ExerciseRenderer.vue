<template>

I'm the exercise renderer
<br>
<GridRenderer :gridWithItemNames="exercise.grid"></GridRenderer>
<br>

<QuestDisplay :questKey="'hello world'" />
    
</template>

<script setup lang="ts">
import type { Exercise } from '../data/exercises';
import GridRenderer from './GridRenderer.vue';
import QuestDisplay from './QuestDisplay.vue';

const props = defineProps<{
    exercise: Exercise
}>();


</script>