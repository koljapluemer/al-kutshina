<template>
  <main class="m-auto max-w-screen-lg">
    <RouterView></RouterView>
  </main>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { gameDataStore } from './stores/gameData';
import { IguanodoTreeParser } from './iguanodo/utils/treeParser';
import { onMounted } from 'vue';


onMounted(() => {
  gameDataStore.setCollections(IguanodoTreeParser.getCollectionsFromJSON())
  gameDataStore.setItems(IguanodoTreeParser.getItemsFromJSON())

})
</script>
