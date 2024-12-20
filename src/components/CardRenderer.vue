<template>

    <div class="draggable-component grow relative h-full w-full card rounded shadow-md bg-gray-200"
        :class="{ 'being-dragged': isBeingDragged }" @dragstart="onDragStart($event)" draggable="true">
        <ItemRenderer :item="card.item" v-if="card.item" />
        <!-- todo: renderer for possible extra cards -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Card } from '../types';
import ItemRenderer from './ItemRenderer.vue';


const props = defineProps<{
    card: Card
}>();

const isBeingDragged = ref(false)

function onDragStart(event: any) {
    console.info('field registered drag start')
    isBeingDragged.value = true
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    // emit("startedDraggingFromField", item.value, props.coordinate);
}



</script>

<style scoped>
.draggable-component {
    touch-action: none;
}

.being-dragged {
    transform: translateX(-9999px);
    transition: 0.01s;
    background-color: 'transparent';
}
</style>