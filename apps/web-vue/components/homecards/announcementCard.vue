<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
    link: String
})
</script>

<template>
    <section class="rounded-md bg-white dark:bg-gray-700 p-4 border-t-4 border-oct-othagreen max-w-xs h-full mr-4 shadow-md hover:shadow-2xl hover:shadow-oct-othagreen">
        <div class="mb-4">
            <h1 class="font-serif text-xl font-medium mb-2">{{ title }}</h1>
            <p>{{ description }}</p>
        </div>
        <a :href="link" class="text-oct-lime underline underline-offset-4 hover:pointer">Read more on external site &rarr;</a>
    </section>
</template>