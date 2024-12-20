<template>
    you should try doing this quest: {{ questKey }}

</template>


<script setup lang="ts">

const props = defineProps<{
    questKey: string
}>();


</script>