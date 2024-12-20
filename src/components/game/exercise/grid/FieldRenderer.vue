<template>

    <div class="bg-base-200 p-1 aspect-square" @dragover="item ? $event.preventDefault() : null" @drop="onDrop($event)"
        :style="{
            height: '160px',
            width: '160px',
        }">
        <CardRenderer :card="{ item: item }" :parentField="field" v-if="item" />
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Item } from '../../../../data/items';
import { gameDataStore } from '../../../../stores/gameData';
import type { FieldData as FieldData } from '../../../../types';
import { dragDropStore } from '../../../../stores/dragDropStore';
import CardRenderer from './field/CardRenderer.vue';


const props = defineProps<{
    field: FieldData
}>();

const item = ref(undefined as (Item | undefined))

onMounted(() => {
    console.log('getting item', props.field.itemId)
    item.value = gameDataStore.getItemById(props.field.itemId)
})

function onDrop(_event: any) {
    dragDropStore.handleDrop(props.field)
}



</script>