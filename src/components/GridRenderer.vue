<template>

    I'm a grid:

    <div class="row" v-for="row in gridWithItemNames">
        <div class="cell" v-for="cell in row">
            <ItemCardRenderer :itemId="cell" />
        </div>
    </div>
</template>


<script setup lang="ts">
import ItemCardRenderer from './ItemCardRenderer.vue';



const props = defineProps<{
    gridWithItemNames: string[][]
}>();


</script>