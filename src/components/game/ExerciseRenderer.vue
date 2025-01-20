<template>
    <!-- change color when right/wrong -->
    <div class="bg-slate-100 rounded p-4 m-2" :class="{
        'bg-green-200': exerciseState === ExerciseState.DoneCorrect,
        'bg-red-200': exerciseState === ExerciseState.DoneIncorrect
    }">
        <GridRenderer :grid="exercise.grid" @interactionHappened="onInteractionHappened"
            @drag-started="onDragStarted" />

        <QuestDisplay :questKey="exercise.quest" @exerciseHasNoTranslation="skipExercise" :language="language" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import GridRenderer from './exercise/GridRenderer.vue';
import QuestDisplay from './exercise/QuestDisplay.vue';
import { GameHelper } from '../../classes/GameHelper';
import type { Exercise, Grid } from '../../types';
import { useFirestore } from '../../composables/useFireStore';
import { v4 as uuidv4 } from 'uuid';
import { useIndexedDB } from '../../composables/useIndexedDB';

const props = defineProps<{
    exercise: Exercise,
    language: string
}>();

const emit = defineEmits(['exerciseOver'])

type Feedback = {
    type: string,
    message: string
}


const feedbackForAction = ref(undefined as (undefined | Feedback))

const store = useFirestore();

const { addLog } = useIndexedDB('LearningLogDB', 'learning-logs');

// check if 'user-id' is set in localstorage, otherwise generate uuidv4 and save it
const userID = ref('')

enum ExerciseState {
    Waiting,
    DoneCorrect,
    DoneIncorrect
}

const exerciseState = ref(ExerciseState.Waiting)

onMounted(() => {
    if (!localStorage.getItem('user-id')) {
        localStorage.setItem('user-id', uuidv4())
    }
    userID.value = localStorage.getItem('user-id')!
})

function onInteractionHappened(interaction: string) {
    const gridSize = props.exercise.grid.length * props.exercise.grid[0].length
    if (interaction === props.exercise.quest) {
        exerciseState.value = ExerciseState.DoneCorrect
        playSuccessSound()
        const logObject = { user: userID.value, exercise: props.exercise.quest, solved: true, timestamp: new Date(), drags: dragsAttempted.value, gridSize: gridSize }
        store.writeToCollection('learning-data', { "data": logObject })
        addLog(logObject)

    } else {
        exerciseState.value = ExerciseState.DoneIncorrect

        const logObject = { user: userID.value, exercise: props.exercise.quest, solved: false, timestamp: new Date(), dragsAttempted: dragsAttempted.value, gridSize: gridSize }
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

const dragsAttempted = ref(0)
function onDragStarted() {
    dragsAttempted.value++
}


function playSuccessSound() {
    const audio = new Audio('/assets/sounds/success_short.mp3');
    audio.volume = 0.2;
    audio.play().catch((err) => {
        console.error("Failed to play the sound:", err);
    });
}

</script>