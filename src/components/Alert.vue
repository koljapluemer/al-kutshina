<template>
    <div class="toast toast-center toast-middle fixed top-0 mt-10 z-10" style="opacity:60%">
        <div class="alert" :class="{'alert-success':type === 'success'}">
            <span>{{ msg }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    msg: string,
    type: string
}>();

</script>