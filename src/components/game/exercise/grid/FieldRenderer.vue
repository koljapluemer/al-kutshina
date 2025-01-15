<template>

    <div class="bg-base-200 p-1 aspect-square" @dragover="hasItemOnIt ? $event.preventDefault() : null" @drop="onDrop($event)"
        :style="{
            height: cellSize,
            width: cellSize,
        }">
        <CardRenderer :parentField="field" v-if="hasItemOnIt" @dragStarted="onCardDragStarted" />
    </div>

</template>

<script setup lang="ts">
import { computed} from 'vue';
import type { Coordinate, Field as Field } from '../../../../types';
import CardRenderer from './field/CardRenderer.vue';



const props = defineProps<{
    field: Field,
    coordinate: Coordinate,
    cellSize: string
}>();

const emit = defineEmits(['dragStartedFromField', 'dropHappenedOnField'])

function onCardDragStarted() {
    emit('dragStartedFromField', props.coordinate)
}


function onDrop(_event: any) {
    console.info('drop!')
    emit('dropHappenedOnField',  props.coordinate)
}

const hasItemOnIt = computed(() => {
    return props.field.itemId !== ''
})




</script>