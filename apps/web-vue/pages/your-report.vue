<script setup lang="ts">
definePageMeta({
    layout: 'authenticated',
})

const { user } = useUserSession()
</script>

<template>
    <main>
        <section>
            <h1 class="text-4xl font-medium font-serif text-oct-gren dark:text-lime-600">
                Your latest grade report
            </h1>
            <h3 class="text-mono text-gray-600">
                Report for user {{ user._id }}
            </h3>
        </section>
        <UButton icon="i-lucide-download">Get a copy</UButton>
        <section class="rounded-md bg-gray-200 border-[1px] border-gray-700 py-2 px-4 md:max-w-[70dvw] flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
                <p>{{ user.last_name }}, {{ user.first_name }}</p>
                <p>Semester One</p>
                <!-- <p>{{ user._id }}</p> -->
            </div>
            <Seperator />
            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                    <div class="w-[75%]">
                        <p class="text-sm text-gray-600">SH003 &bull; Jane Doe</p>
                        <h1 class="text-md font-medium text-lg text-green-600 overflow-ellipsis">Understanding Culture, Society, and Politics</h1>
                    </div>
                    <p class="font-bold text-3xl text-oct-othagreen">
                        82
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="w-[75%]">
                        <p class="text-sm text-gray-600">SH001 &bull; Jake Doe</p>
                        <h1 class="text-md font-medium text-lg text-green-600 overflow-ellipsis">Practical Research 1</h1>
                    </div>
                    <p class="font-bold text-3xl text-oct-othagreen">
                        92
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="w-[75%]">
                        <p class="text-sm text-gray-600">MATH002 &bull; Jane Doe</p>
                        <h1 class="text-md font-medium text-lg text-green-600 overflow-ellipsis">Statistics and Probability</h1>
                    </div>
                    <p class="font-bold text-3xl text-oct-othagreen">
                        86
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="w-[75%]">
                        <p class="text-sm text-gray-600">FIL002 &bull; Jane Doe</p>
                        <h1 class="text-md font-medium text-lg text-green-600 overflow-ellipsis">Pagbasa at Pagsusuri sa Iba't ibang Teksto tungo sa Pananaliksik</h1>
                    </div>
                    <p class="font-bold text-3xl text-oct-othagreen">
                        85
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="w-[75%]">
                        <p class="text-sm text-gray-600">ENG001 &bull; Jane Doe</p>
                        <h1 class="text-md font-medium text-lg text-green-600 overflow-ellipsis">Oral Communication in Context</h1>
                    </div>
                    <p class="font-bold text-3xl text-oct-othagreen">
                        88
                    </p>
                </div>
                <div class="flex items-center text-3xl justify-end text-right">
                    <p class="mr-2">Grade Avg.</p>
                    <span class="font-bold text-oct-othagreen">{{ Math.floor(86.6) }}</span>
                </div>
            </div>
        </section>
    </main>
</template>