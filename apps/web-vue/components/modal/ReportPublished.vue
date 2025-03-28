<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-serif text-oct-green dark:text-lime-400 tracking-tighter">Report has been published!</h1>
                    <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
                </div>
            </template>
            <p>This report has been published, you cannot edit or view this report unless reverted to Editing status by an Administrator</p>
            <template #footer>
                <div class="flex items-center justify-end gap-2">
                    <UButton color="gray" variant="soft" @click="modal.close()">Okay, I understand</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
const modal = useModal()
</script>