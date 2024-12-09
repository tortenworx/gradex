<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'

defineProps({
    code: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    teacher: {
        type: String,
        default: ''
    },
})
</script>

<template>
    <DialogRoot>
        <DialogTrigger class="text-left">
                <div class="bg-white px-4 py-2 shadow-md flex flex-col items-start justify-start hover:shadow-2xl rounded-md border-[1px] border-gray-700 border-opacity-50 max-w-prose min-h-fit">
                    <div>
                        <span class="font-mono text-zinc-400 text-sm">{{ code }}</span>
                        <h1 class="font-serif text-2xl font-medium text-lime-600">{{ title }}</h1>
                    </div>
                </div>
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay class="bg-slate-800 bg-opacity-35 fixed inset-0 z-30" />
            <DialogContent class="fixed bg-white p-10 shadow-lg z-[100] top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px]">
                <DialogTitle>
                    <span class="font-mono text-zinc-400 text-sm">{{ code }}</span>
                    <h1 class="font-serif text-2xl font-medium text-lime-600">{{ title }}</h1>
                    <p class="text-zinc-600 text-md uppercase">{{ teacher }}</p>
                </DialogTitle>
                <DialogDescription class="mt-2">
                    {{ desc }}
                </DialogDescription>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>