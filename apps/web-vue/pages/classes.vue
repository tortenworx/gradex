<script setup lang="ts">
import { ModalAboutClass } from '#components';
import type Class from '~/types/Class';
const modal = useModal()
const created = ref()

definePageMeta({
    title: 'Your Classes',
    layout: 'authenticated'
})

function openInfo(data: Class) {
    modal.open(ModalAboutClass, {
        data,
    })
}

const { data: classes, refresh } = useFetch<Class[]>('/api/classes')
</script>

<template>
    <header class="flex items-center justify-between gap-2">
        <h1 class="text-2xl font-serif text-oct-green dark:text-lime-500 font-medium">Your classes</h1>
        <div class="flex items-center justify-center gap-2">
        </div>
    </header>
    <main class="mt-4 grid md:grid-cols-4 gap-4">
        <div v-for="item in classes" class="bg-gray-100 dark:bg-zinc-950 px-3 py-2 border-t-2 border-oct-othagreen rounded-md hover:pointer shadow-md" @click="openInfo(item)">
            <div>
                <p class="dark:text-zinc-300 text-zinc-500">{{ item.code }}</p>
                <h1 class="text-xl text-oct-green dark:text-lime-500 font-serif mb-1">{{ item.name }}</h1>
                <p class="font-mono dark:text-zinc-500 text-dark-800 tracking-tighter">{{ item.teacher.first_name }} {{ item.teacher.last_name }}</p>
            </div>
        </div>
    </main>
</template>