<template>
    <div class="text-center mt-10  p-3 text-5xl bg-slate-200 rounded">
        <button class="btn btn-circle" @click="playQuestSound" v-if="audioState === AudioState.Waiting">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-20">
                <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
        </button>
        <button class="btn btn-circle" disabled v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-volume-2">
                <path
                    d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                <path d="M16 9a5 5 0 0 1 0 6" />
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
            </svg>
        </button>

        {{ TranslationHelper.getTranslationForKey(language, questKey) }}
    </div>

</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TranslationHelper } from '../../../classes/TranslationHelper';


const props = defineProps<{
    questKey: string,
    language: string
}>();

const emit = defineEmits(['exerciseHasNoTranslation'])

enum AudioState  {
    Waiting,
    Playing,
}

const audioState = ref(AudioState.Waiting)

onMounted(() => {
    setTimeout(() => {
        playQuestSound()
    }, 400)
})

function playQuestSound() {
    audioState.value = AudioState.Playing
    const audio = new Audio(TranslationHelper.getAudioPathForKey(props.language, props.questKey));
    audio.autoplay = true;
    audio.play();

    audio.onended = () => {
        audioState.value = AudioState.Waiting
    }
}

if (!TranslationHelper.getTranslationForKey(props.language, props.questKey)) {
    console.error('no translation found for key', props.language, props.questKey)
    emit('exerciseHasNoTranslation')
}

if (!TranslationHelper.getAudioPathForKey(props.language, props.questKey)) {
    console.error('no auio found for key', props.language, props.questKey)
    emit('exerciseHasNoTranslation')
}




</script>