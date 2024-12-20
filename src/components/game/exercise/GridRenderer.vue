<template>
    <div class="flex flex-col gap-2 mt-10">
        <div v-for="(row, r) in gridWithItemNames" class="flex flex-row gap-2 justify-center">
            <FieldRenderer v-for="(cell, c) in row" :field="{ itemId: cell, cellSize: cellSize, coordinate: [r, c] }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCellSize } from '../../../composables/useCellSize';
import { getGridDimensions } from '../../../utils/arrayUtils';
import FieldRenderer from './grid/FieldRenderer.vue';

const props = defineProps<{
    gridWithItemNames: string[][]
}>();

const gridDimensions = computed(() => getGridDimensions(props.gridWithItemNames));
const rows = computed(() => gridDimensions.value.rows);
const cols = computed(() => gridDimensions.value.cols);
const { cellSize } = useCellSize(rows.value, cols.value);


</script>