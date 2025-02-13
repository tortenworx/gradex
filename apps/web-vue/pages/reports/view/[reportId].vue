<script setup lang="ts">
const route = useRoute()
definePageMeta({
    layout: 'authenticated'
})

const blank = ref(false)
const blank2 = ref(false)
</script>

<template>
    <header class="flex items-center justify-between mb-4">
        <div>
            <h2 class="text-md text-gray-500 tracking-tight">Grade Reports</h2>
            <h1 class="text-5xl font-serif text-oct-green font-medium dark:text-lime-400 tracking-tighter -my-2">
                Editing a report
            </h1>
        </div>
        <div class="flex items-center justify-end gap-2">
            <UButton icon="i-lucide-save">Save</UButton>
            <UButton icon="i-lucide-send" variant="soft">Save and Publish</UButton>
        </div>
    </header>
    <main>
        <header>
            <span class="text-xs font-mono text-gray-400 dark:text-gray-600">00000020f51bb4362eee2a4d</span>
            <h1 class="text-3xl font-sans font-light truncate">Understanding Culture, Society and Politics</h1>
            <span class="font-mono text-gray-600 dark:text-gray-400">Lyra &bull; Febuary 13, 2025</span>
        </header>
        <section class="mt-2">
            <UTabs :items="[{ label: 'Manual Input', slot: 'manual' }, { label: 'ezGrade', slot: 'automatic' }]">
                <template #manual="{ item }" class="flex flex-col gap-2">
                    <div class="border-b-2 border-gray-400 border-opacity-50 py-2 px-4 flex items-center justify-between">
                        <div><p>Student 1</p></div>
                        <div class="flex gap-2 items-center justify-center">
                            <UCheckbox v-model="blank" name="blank" label="Blank Grades"></UCheckbox>
                            <UInput type="number" :disabled="blank" max="100" min="0"></UInput>
                        </div>
                    </div>
                    <div class="border-b-2 border-gray-400 border-opacity-50 py-2 px-4 flex items-center justify-between">
                        <div><p>Student 2</p></div>
                        <div class="flex gap-2 items-center justify-center">
                            <UCheckbox v-model="blank2" name="blank" label="Blank Grades"></UCheckbox>
                            <UInput type="number" :disabled="blank2" max="100" min="0"></UInput>
                        </div>
                    </div>
                </template>
                <template #automatic="{ item }">
                    <UAlert icon="i-lucide-file-chart-column" title="About this feature" description="ezGrade is a feature that allows teachers to encode grades more effectively by using a tool that they are already familiar with: Spreadsheets. Click the button on the side to get started.">
                        <template #actions="{ actions }">
                            <UButton icon="i-lucide-download">Download Grading Sheet</UButton>
                        </template>
                    </UAlert>
                    <UCard>
                        <div class="text-center flex items-center justify-center">
                            You would either select a file here or drag down here.<br>
                            After that, you will be placed on the manual input tab to further edit the report.
                        </div>
                    </UCard>
                </template>
            </UTabs>
        </section>
    </main>
</template>
