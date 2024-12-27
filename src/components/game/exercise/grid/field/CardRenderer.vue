<template>

    <div class="draggable-component grow relative h-full w-full card rounded shadow-md bg-gray-200"
        :class="{ 'being-dragged': isBeingDragged }" @dragstart="onDragStart($event)" @dragend="onDragEnd($event)"
        draggable="true">
        <ItemRenderer :item="item" v-if="item" />
        <ExtraImageRenderer :image="parentField.extraImage" v-if="parentField.extraImage" />

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Card, Field, } from '../../../../../types';
import ItemRenderer from './card/ItemRenderer.vue';
import type { Item } from '../../../../../data/items';
import ExtraImageRenderer from './card/ExtraImageRenderer.vue';
import { GameHelper } from '../../../../../classes/GameHelper';


const item = ref(undefined as (Item | undefined))


const props = defineProps<{
    parentField: Field,
}>();
const emit = defineEmits(['dragStarted'])

const isBeingDragged = ref(false)


onMounted(() => {
    console.log('getting item', props.parentField.itemId)
    item.value = GameHelper.getItemById(props.parentField.itemId)
})


function onDragStart(event: DragEvent) {
    isBeingDragged.value = true
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move"
    }
    emit('dragStarted')
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