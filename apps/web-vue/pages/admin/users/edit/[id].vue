<template>
    <h1 class="text-3xl font-serif font-medium text-oct-green">Currently editing: Jarelle Emmanuel Andulan</h1>
    <h3 class="text-sm text-gray-500 font-mono">User ID: {{ $route.params.id }}</h3>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'authenticated',
})
</script>