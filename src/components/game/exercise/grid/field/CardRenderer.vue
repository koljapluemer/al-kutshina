<template>

    <div class="draggable-component grow relative h-full w-full card rounded shadow-md bg-gray-200"
        :class="{ 'being-dragged': isBeingDragged }" @dragstart="onDragStart($event)" @dragend="onDragEnd($event)"
        draggable="true">
        <ItemRenderer :item="card.item" v-if="card.item" />
        <ExtraImageRenderer :image="dragDropStore.extraImage"
            v-if="dragDropStore.extraImage && areCoordinatesEqual(dragDropStore.extraImage.coordinate, parentField.coordinate)" />

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Card, FieldData, } from '../../../../../types';
import { dragDropStore } from '../../../../../stores/dragDropStore';
import ItemRenderer from './card/ItemRenderer.vue';
import ExtraImageRenderer from './card/ExtraImageRenderer.vue';
import { areCoordinatesEqual } from '../../../../../utils/arrayUtils';


const props = defineProps<{
    card: Card,
    parentField: FieldData,
}>();

const isBeingDragged = ref(false)

function onDragStart(event: DragEvent) {
    isBeingDragged.value = true
    if (event.dataTransfer) {
        event.dataTransfer.setData("text/plain", props.card.item.id)
        event.dataTransfer.dropEffect = "move"
    }
    dragDropStore.dragStartedFromField = props.parentField
}

function onDragEnd(_event: DragEvent) {
    isBeingDragged.value = false
    // actual drops are handled by the field their dropped on
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