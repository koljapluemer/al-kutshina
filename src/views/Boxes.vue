<template>

    hi.
</template>


<script setup lang="ts">
import { BoxesHelper } from '../classes/BoxesHelper';


const boxes = BoxesHelper.getBoxes()
console.log('boxes', boxes)

</script>