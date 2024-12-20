<template>
    <div class="text-center mt-10">
        you should try doing this quest: {{ questKey }}

    </div>

</template>


<script setup lang="ts">

const props = defineProps<{
    questKey: string
}>();


</script>