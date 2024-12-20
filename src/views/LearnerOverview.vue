<template>

    <div class="flex gap-2 flex-col items-center mt-20">
        <CollectionItem v-for="collection in collections" :collection="collection"
            @click="selectedCollection = collection" :class="{ 'btn-primary': selectedCollection === collection }" />

        <button class="btn btn-primary btn-lg mt-5" v-if="selectedCollection">
            Play
        </button>
    </div>


</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IguanodoTreeParser } from '../iguanodo/utils/treeParserUtils';
import type { Collection } from '../iguanodo/types/Collection';
import CollectionItem from '../components/CollectionItem.vue';

const collections = ref([] as Collection[])
const selectedCollection = ref(undefined as (Collection | undefined))

onMounted(() => {
    collections.value = IguanodoTreeParser.getCollectionsFromJSON()
    console.log('got collections', collections)

})
</script>