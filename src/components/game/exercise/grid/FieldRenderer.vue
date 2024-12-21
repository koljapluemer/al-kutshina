<template>

    <div class="bg-base-200 p-1 aspect-square" @dragover="hasItemOnIt ? $event.preventDefault() : null" @drop="onDrop($event)"
        :style="{
            height: '160px',
            width: '160px',
        }">
        <CardRenderer :parentField="field" v-if="hasItemOnIt" />
    </div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Item } from '../../../../data/items';
import { gameDataStore } from '../../../../stores/gameData';
import type { Field as Field } from '../../../../types';
import { dragDropStore } from '../../../../stores/dragDropStore';
import CardRenderer from './field/CardRenderer.vue';


const props = defineProps<{
    field: Field
}>();


function onDrop(_event: any) {
    dragDropStore.handleDrop(props.field)
}

const hasItemOnIt = computed(() => {
    return props.field.itemId !== ''
})



</script>