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
            <div class="text-sm
            ">
                <span class="font-mono text-zinc-600 dark:text-zinc-400">{{ code }}</span>
                &bull;
                <span class="text-zinc-900 dark:text-zinc-600">{{ teacher || 'Professor X' }}</span>
            </div>
            <p class="text-lime-600 font-serif text-xl">{{ name }}</p>
        </div>
        <p class="text-center">
            <span class="font-bold font-mono text-2xl">{{ grade || ' ' }}</span>
        </p>
    </div>
</template>