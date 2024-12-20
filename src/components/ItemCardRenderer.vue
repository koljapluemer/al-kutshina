<template>

<div class="bg-base-200 p-1 aspect-square" @dragover.prevent @drop="onDrop($event)" :style="{
        height: '160px',
        width: '160px',
    }"
    >{{ itemId }}</div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Item } from '../data/items';
import { gameDataStore } from '../stores/gameData';
import type { Coordinate } from '../types';


const props = defineProps<{
    itemId: string,
    cellSize: string,
    coordinate?: Coordinate
}>();

const emit = defineEmits(['startedDraggingFromField', 'droppedOnField'])


const item = ref(undefined as (Item | undefined))
const isBeingDragged = ref(false)



onMounted(() => {
    item.value = gameDataStore.getItemById(props.itemId)
})

function onDragStart(event: any) {
    console.info('field registered drag start')
    isBeingDragged.value = true
    if (typeof item.value != "undefined") {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        emit("startedDraggingFromField", item.value, props.coordinate);
    }
}

function onDrop(_event: any) {
    console.info('field registered drop')
    isBeingDragged.value = false
    emit("droppedOnField", item.value, props.coordinate)
}

</script>