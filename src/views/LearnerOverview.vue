<template>

    <div class="flex gap-2 flex-col items-center mt-20">
        <CollectionItem v-for="collection in gameDataStore.collections" :collection="collection"
            @click="selectedCollection = collection" :class="{ 'btn-primary': selectedCollection === collection }" />


        <router-link :to="{ name: 'collectionPlay', params: { id: selectedCollection.id } }" v-if="selectedCollection">
            <button class="btn btn-primary btn-lg mt-5">
                Play
            </button>
        </router-link>

    </div>


</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IguanodoTreeParser } from '../iguanodo/utils/treeParser';
import type { Collection } from '../iguanodo/types/Collection';
import CollectionItem from '../components/CollectionItem.vue';
import { gameDataStore } from '../stores/gameData';

const selectedCollection = ref(undefined as (Collection | undefined))


</script>