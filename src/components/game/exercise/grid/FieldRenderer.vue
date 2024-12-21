<template>

    <div class="bg-base-200 p-1 aspect-square" @dragover="hasItemOnIt ? $event.preventDefault() : null" @drop="onDrop($event)"
        :style="{
            height: '160px',
            width: '160px',
        }">
        <CardRenderer :parentField="field" v-if="hasItemOnIt" @dragStarted="onCardDragStarted" />
    </div>

</template>

<script setup lang="ts">
import { computed} from 'vue';
import type { Field as Field } from '../../../../types';
import CardRenderer from './field/CardRenderer.vue';


const props = defineProps<{
    field: Field
}>();

const emit = defineEmits(['dragStartedFromField', 'dropHappenedOnField'])

function onCardDragStarted() {
    emit('dragStartedFromField', props.field.coordinate)
}


function onDrop(_event: any) {
    console.info('drop!')
    emit('dropHappenedOnField',  props.field.coordinate)
}

const hasItemOnIt = computed(() => {
    return props.field.itemId !== ''
})




</script>