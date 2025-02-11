<script setup lang="ts">
import Class from '~/types/Class'
const modal = useModal()
const props = defineProps({
    data: {
        type: Class,
        required: true
    }
})
</script>

<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-serif text-oct-green tracking-tighter">About this class</h1>
                    <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
                </div>
            </template>
            <h1 class="text-2xl font-serif text-oct-green dark:text-lime-600 mb-2">{{ data.name }}</h1>
            <div>
                {{ data.description }}
            </div>
        </UCard>
    </UModal>
</template>