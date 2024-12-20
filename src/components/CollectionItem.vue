<template>

    <button class="btn max-w-20">{{ collection.id }}</button>
</template>

<script setup lang="ts">

import type { Collection } from '../iguanodo/types/Collection';

interface Props {
    collection: Collection
}

const props = defineProps<Props>();

</script>