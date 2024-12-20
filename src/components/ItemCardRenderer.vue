<template>

    <div class="card">
        item!
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Item } from '../data/items';
import { gameDataStore } from '../stores/gameData';


const props = defineProps<{
    itemId: string
}>();

const item = ref(undefined as (Item | undefined))

onMounted(() => {
    item.value = gameDataStore.getItemById(props.itemId)
})

</script>