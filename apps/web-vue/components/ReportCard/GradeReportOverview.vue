<script setup lang="ts">
defineProps<{ id: string; subject: string; status: "EDITING" | "PUBLISHED" | "REVIEWING", className: string; date: string }>()
</script>

<template>
    <div 
        class="border-t-4 border-oct-othagreen bg-gray-100 dark:bg-zinc-900 shadow-md px-4 py-2 rounded overflow-hidden flex flex-col gap-2 hover:cursor-pointer"
        @click="navigateTo(`/reports/edit/${id}`, { external: true })"
    >
        <div class="flex flex-col gap-1">
            <UBadge v-if="status == 'EDITING'" color="amber" :label="status" :ui="{ rounded: 'rounded-xl' }" class="w-fit" />
            <UBadge v-if="status == 'PUBLISHED'" color="green" :label="status" :ui="{ rounded: 'rounded-xl' }" class="w-fit" />
            <h1 class="text-2xl font-sans font-light truncate">{{ subject }}</h1>
            <span class="text-xs font-mono text-gray-400 dark:text-gray-600">{{ id }}</span>
        </div>
        <Seperator></Seperator>
        <div class="flex items-center justify-between font-mono text-sm dark:text-gray-600 text-gray-400">
            <p>{{ className }}</p>
            <p>{{ (new Date(date)).toLocaleDateString() }}</p>
        </div>
    </div>
</template>