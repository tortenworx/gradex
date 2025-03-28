<script setup lang="ts">
import { format, parse } from 'numerable';
defineProps({
    full_name: {
        type: String,
        required: true,
    },
    sem: {
        type: Number,
        required: true
    },
    avg: {
        type: Number
    }
})
</script>

<template>
    <div class="bg-white dark:bg-gray-950 shadow-md drop-shadow-xl shadow-lime-400 border-[1px] border-zinc-800 border-opacity-50 px-4 py-2 rounded-md flex flex-col gap-2 w-full">
        <div class="grid grid-cols-2 md:grid-cols-4 text-center">
            <p class="col-span-2">
                Full Name:
                <span class="text-mono">{{ full_name }}</span>
            </p>
            <!-- <p>
                Semester:
                <span class="text-mono">
                    {{ format(sem, '0o') }}
                </span>
            </p> -->
            <UButton icon="i-vscode-icons-file-type-pdf2" class="text-right" to="/api/reports/pdf" target="_blank">Download as PDF</UButton>
        </div>
        <div class="w-full h-[1px] bg-gray-400 rounded-md"></div>
        <div class="flex flex-col gap-4">
            <slot></slot>
            <div class="border-t-[1px] border-gray-800 border-opacity-50 pt-4 mb-4 px-8 gap-3">
            <p class="text-center flex items-center justify-end gap-2">
                <span>Grade Average:</span>
                <span class="font-bold font-mono text-2xl">{{ avg || 'Inc.' }}</span>
            </p>
            </div>
        </div>
    </div>
</template>