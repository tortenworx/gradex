<script setup lang="ts">
defineProps({
    code: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
        required: true,
    },
    teacher: {
        type: String,
        default: '',
    },
    grade: {
    }
})
</script>

<template>
    <div class="flex items-center justify-between px-8 gap-3">
        <div class="flex flex-col">
            <span class="font-mono text-zinc-600 text-xs">{{ code }}</span>
            <p class="text-lime-600 font-serif text-xl">{{ name }}</p>
            <p class="text-zinc-900 text-sm uppercase">{{ teacher || 'Professor X' }}</p>
        </div>
        <p class="text-center">
            <span class="font-bold font-mono text-2xl">{{ grade || 'X' }}</span>
        </p>
    </div>
</template>