<template>

<img :src="filePath()" :alt="item.id"  class="object-contain absolute" draggable="false">

</template>

<script setup lang="ts">
import type { Item } from '../data/items';


const props = defineProps<{
    item: Item
}>();



function filePath(): string {
    return '/assets/items/' + props.item.id + '.webp'
}

</script>

<style scoped>
img {
    max-width: 97%; 
    max-height: 97%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

</style>