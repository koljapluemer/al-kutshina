<!-- unused currently -->
<template>

    hi.

    <!-- link to BoxPlay for every box -->
    <div v-for="box in boxes" :key="box">
        <router-link :to="{ name: 'box-play', params: { box: box } }">
            <div class="box">
                <h2>{{ box }}</h2>
            </div>
        </router-link>
    </div>

</template>


<script setup lang="ts">
import { ref } from 'vue';
import { BoxesHelper } from '../classes/BoxesHelper';


const boxes = ref(BoxesHelper.getBoxes())
console.log('boxes', boxes)

</script>