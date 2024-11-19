<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
    error: Object as () => NuxtError
})

const handleError = clearError({ redirect: '/' });
</script>

<template>
    
</template>