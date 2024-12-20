<template>

    <div class="" v-if="collection">
        let's play from collection: {{ collection.id }}
    </div>
    <div class="" v-else>
        ...collection loading...
    </div>


</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gameDataStore } from '../stores/gameData';
import type { Collection } from '../iguanodo/types/Collection';

const props = defineProps<{
    id: string
}>();

const collection = ref(undefined as (Collection | undefined))

onMounted(() => {
    collection.value = gameDataStore.getCollectionById(props.id)
})

</script>