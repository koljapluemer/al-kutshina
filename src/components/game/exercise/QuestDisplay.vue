<template>
    <div class="text-center mt-10 text-4xl">
        {{ TranslationHelper.getTranslationForKey(questKey) }}
    </div>
    <!-- <center>
        {{ questKey }}
    </center> -->

</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { TranslationHelper } from '../../../classes/TranslationHelper';


const props = defineProps<{
    questKey: string
}>();

onMounted(() => {
    setTimeout(() => {
        playQuestSound()
    }, 400)
})

function playQuestSound() {
    const audio = new Audio(TranslationHelper.getAudioPathForKey(props.questKey));
    audio.autoplay = true;
    audio.play();
}


</script>