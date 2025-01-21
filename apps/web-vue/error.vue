<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
    error: Object as () => NuxtError
})

</script>

<template>
    <NuxtLayout>
        <h1>{{ props.error?.statusCode }}</h1>
        <p>An error has occured</p>
        <p>{{ props.error?.cause }}</p>
    </NuxtLayout>
</template>