<template>
    <img :src="filePath()" :alt="image.id" class="object-contain absolute" draggable="false">
</template>

<script setup lang="ts">
import type { ExtraImage } from '../../../../../types';



const props = defineProps<{
    image: ExtraImage
}>();



function filePath(): string {
    return '/assets/items/' + props.image.id + '.webp'
}

</script>

<style scoped>
img {
    max-width: 57%;
    max-height: 57%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}
</style>