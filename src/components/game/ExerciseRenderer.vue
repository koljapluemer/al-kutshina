<template>
    <div>
        <Alert :type="feedbackForAction?.type" :msg="feedbackForAction?.message" v-if="feedbackForAction" />
        <GridRenderer :grid="exercise.grid" @interactionHappened="onInteractionHappened" />

        <QuestDisplay :questKey="exercise.quest" @exerciseHasNoTranslation="skipExercise" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';
import Alert from '../Alert.vue';
import { GameHelper } from '../../classes/GameHelper';
import type { Exercise, Grid } from '../../types';
import { useFirestore } from '../../composables/useFireStore';
import { useLocalStorage } from '../../composables/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { useIndexedDB } from '../../composables/useIndexedDB';

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

const store = useFirestore();

const userID = useLocalStorage('user-id', uuidv4())
const { addLog } = useIndexedDB('LearningLogDB', 'learning-logs');



function onInteractionHappened(interaction: string) {
    if (interaction === props.exercise.quest) {
        feedbackForAction.value = {
            type: 'success',
            message: 'صـَلّـَح'
        }
        const logObject = { user: userID.val.value, exercise: props.exercise.quest, solved: true, timestamp: new Date() }
        store.writeToCollection('learning-data', { "data": logObject })
        addLog(logObject)

    } else {
        feedbackForAction.value = {
            type: 'warning',
            message: 'غـَلـَط'
        }

        const logObject = { user: userID.val.value, exercise: props.exercise.quest, solved: false, timestamp: new Date() }
        store.writeToCollection('learning-data', { "data": logObject })
        addLog(logObject)

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