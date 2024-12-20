<template>
    <div class="toast">
        <div class="alert alert-info">
            <span>{{ text }}</span>
        </div>
    </div>
</template>


<script setup lang="ts">


const props = defineProps<{
    text: string
}>();

</script>
