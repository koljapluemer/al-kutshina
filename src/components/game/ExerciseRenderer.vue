<template>
    <div v-if="grid">
        <Alert :type="feedbackForAction?.type" :msg="feedbackForAction?.message" v-if="feedbackForAction" />
        <GridRenderer :grid="grid" @interactionHappened="onInteractionHappened" />

        <QuestDisplay :questKey="exercise.quest" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Exercise } from '../../data/exercises';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';
import Alert from '../Alert.vue';
import { GameHelper } from '../../classes/GameHelper';
import type { Grid } from '../../types';

const props = defineProps<{
    exercise: Exercise
}>();

const emit = defineEmits(['exerciseOver'])

type Feedback = {
    type: string,
    message: string
}


const grid = ref(undefined as (Grid | undefined))

onMounted(() => {
    grid.value = GameHelper.createGameGrid(props.exercise)
    console.log('set grid to', grid.value)
})


const feedbackForAction = ref(undefined as (undefined | Feedback))


function onInteractionHappened(interaction: string) {
    if (interaction === props.exercise.quest) {
        feedbackForAction.value = {
            type: 'success',
            message: 'صـَلّـَح'
        }
    } else {
        feedbackForAction.value = {
            type: 'warning',
            message: 'غـَلـَط'
        }
    }
    emitExerciseOverWithDelay()
    
}

function emitExerciseOverWithDelay() {
    setTimeout(() => {
        emit('exerciseOver')
    }, 800)
}

</script>