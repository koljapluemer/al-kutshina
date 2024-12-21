<template>
    <div>

        <GridRenderer :grid="exercise.grid" @interactionHappened="onInteractionHappened" />

        <QuestDisplay :questKey="exercise.quest" />

    </div>
</template>

<script setup lang="ts">
import type { Exercise } from '../../data/exercises';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';

const props = defineProps<{
    exercise: Exercise
}>();


function onInteractionHappened(interaction:string) {
    if (interaction === props.exercise.quest) {
        alert('fire!')
    } else {
        alert("you're trash")
    }

}


</script>