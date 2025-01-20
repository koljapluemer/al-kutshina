<template>
    <div class="text-center mt-10  p-3 text-5xl bg-slate-200 rounded">
        {{ TranslationHelper.getTranslationForKey(language, questKey) }}
    </div>

</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { TranslationHelper } from '../../../classes/TranslationHelper';


const props = defineProps<{
    questKey: string,
    language: string
}>();

const emit = defineEmits(['exerciseHasNoTranslation'])

onMounted(() => {
    setTimeout(() => {
        playQuestSound()
    }, 400)
})

function playQuestSound() {
    const audio = new Audio(TranslationHelper.getAudioPathForKey(props.language, props.questKey));
    audio.autoplay = true;
    audio.play();
}

if (!TranslationHelper.getTranslationForKey(props.language, props.questKey) || !TranslationHelper.getAudioPathForKey(props.language, props.questKey)) {
    console.error('no translation found for key', props.questKey)
    emit('exerciseHasNoTranslation')
}




</script>