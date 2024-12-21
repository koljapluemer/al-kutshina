<template>
    <div class="flex flex-col gap-2 mt-10">
        <div v-for="(row, r) in grid" class="flex flex-row gap-2 justify-center">
            <FieldRenderer v-for="(field, c) in row" :field="field" :coordinate="{ row: r, col: c }" :key="field.itemId + field.extraImage?.id"
                @dragStartedFromField="onDragStarted" @dropHappenedOnField="onDropHappened" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { useCellSize } from '../../../composables/useCellSize';
import { getGridDimensions } from '../../../utils/arrayUtils';
import FieldRenderer from './grid/FieldRenderer.vue';
import type { Coordinate, Field, Grid, ItemNameGrid } from '../../../types';
import { GameHelper } from '../../../classes/GameHelper';

const props = defineProps<{
    grid: ItemNameGrid
}>();

const gridDimensions = computed(() => getGridDimensions(props.grid));
const rows = computed(() => gridDimensions.value.rows);
const cols = computed(() => gridDimensions.value.cols);
const { cellSize } = useCellSize(rows.value, cols.value);

const sendingFieldCoord = ref(undefined as (undefined | Coordinate))

const emit = defineEmits(['interactionHappened'])


function onDragStarted(coord: Coordinate) {
    // console.log('got data', toRaw(toRaw(coord.row)))
    console.log('got data', coord, coord.row, coord.col)
    sendingFieldCoord.value = coord
    console.log('sending field now', sendingFieldCoord.value.col)
}

function onDropHappened(receivingFieldCoord: Coordinate) {
    if (!sendingFieldCoord.value) return;
    if (!grid.value) return;

    const senderField = getFieldAtCoord(sendingFieldCoord.value)
    const receiverField = getFieldAtCoord(receivingFieldCoord)

    if (!receiverField || !senderField) return

    const affordances = GameHelper.getInteractionsBetweenFields(
        senderField,
        receiverField
    )
    affordances.forEach(affordance => {
        const actionString = senderField.itemId + '-' + affordance + '-' + receiverField.itemId
        emit('interactionHappened', actionString)

        const rec = GameHelper.getFieldAfterAffordanceTriggered(senderField, receiverField, affordance)
        const send = GameHelper.getFieldAfterCapabilityTriggered(senderField, affordance)
        grid.value![receivingFieldCoord.row][receivingFieldCoord.col] = rec
        grid.value![sendingFieldCoord.value!.row][sendingFieldCoord.value!.col] = send
    })
}

function getFieldAtCoord(coord: Coordinate): (Field | undefined) {
    if (!grid.value) return undefined
    return grid.value[coord.row][coord.col]
}

const grid = ref(undefined as (Grid | undefined))

onMounted(() => {
    grid.value = GameHelper.createGameGrid(props.grid)
    console.log('created grid', grid.value)
})



</script>