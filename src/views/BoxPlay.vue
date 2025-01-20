<!-- unused currently -->
<template>
    <h2>
        you are playing {{  boxName }}
    </h2>
</template>


<script setup lang="ts">


import { ref } from 'vue';
import { BoxesHelper } from '../classes/BoxesHelper';
import { useRoute } from 'vue-router';

const boxes = ref(BoxesHelper.getBoxes())
console.log('boxes', boxes)

const boxName = useRoute().params.box
console.log('boxName', boxName)


</script>