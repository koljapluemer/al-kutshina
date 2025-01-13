<template>
    <div>
        <Alert :type="feedbackForAction?.type" :msg="feedbackForAction?.message" v-if="feedbackForAction" />
        <GridRenderer :grid="exercise.grid" @interactionHappened="onInteractionHappened" />

        <QuestDisplay :questKey="exercise.quest" @exerciseHasNoTranslation="skipExercise" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';
import Alert from '../Alert.vue';
import { GameHelper } from '../../classes/GameHelper';
import type { Exercise, Grid } from '../../types';

const props = defineProps<{
    exercise: Exercise
}>();

const emit = defineEmits(['exerciseOver'])

type Feedback = {
    type: string,
    message: string
}


const grid = ref(undefined as (Grid | undefined))

const feedbackForAction = ref(undefined as (undefined | Feedback))


function onInteractionHappened(interaction: string) {
    console.log('interaction', interaction)
    if (interaction === props.exercise.quest) {
        feedbackForAction.value = {
            type: 'success',
            message: 'nice!'
            // message: 'صـَلّـَح'
        }
    } else {
        feedbackForAction.value = {
            type: 'warning',
            message: 'incorrect.'
            // message: 'غـَلـَط'
        }
    }
    emitExerciseOverWithDelay()

}

function emitExerciseOverWithDelay() {
    setTimeout(() => {
        emit('exerciseOver')
    }, 800)
}

function skipExercise() {
    emit('exerciseOver')
}

</script>