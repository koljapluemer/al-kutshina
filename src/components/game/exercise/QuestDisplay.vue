<template>
    <div class="text-center mt-10">
        {{ questKey }}
    </div>

</template>


<script setup lang="ts">

const props = defineProps<{
    questKey: string
}>();


</script>