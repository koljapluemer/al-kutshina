<template>

<div class="bg-base-200 p-1 aspect-square" @dragover.prevent @drop="onDrop($event)" :style="{
        height: '160px',
        width: '160px',
    }"
    >
    <CardRenderer :card="{item:item}" v-if="item"/>
</div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Item } from '../data/items';
import { gameDataStore } from '../stores/gameData';
import type { Coordinate } from '../types';
import CardRenderer from './CardRenderer.vue';


const props = defineProps<{
    itemId: string,
    cellSize: string,
    coordinate?: Coordinate
}>();

const emit = defineEmits(['startedDraggingFromField', 'droppedOnField'])


const item = ref(undefined as (Item | undefined))

onMounted(() => {
    item.value = gameDataStore.getItemById(props.itemId)
})


function onDrop(_event: any) {
    console.info('field registered drop')
    emit("droppedOnField", item.value, props.coordinate)
}



</script>