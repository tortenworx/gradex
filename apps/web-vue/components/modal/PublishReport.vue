<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-serif text-oct-green dark:text-lime-400 tracking-tighter">Publish this report?</h1>
                    <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
                </div>
            </template>
            <p>Are you sure that you want to publish this report? You can no longer make edits on this report unless reverted back to Editing status by an Administrator</p>
            <template #footer>
                <div class="flex items-center justify-end gap-2">
                    <UButton icon="i-lucide-check" @click="yes" color="green">Yes</UButton>
                    <UButton color="gray" type="solid" @click="modal.close()">No, I changed my mind</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
const modal = useModal()

const emit = defineEmits(['success'])

const props = defineProps({
    id: {
        type: String,
        required: true
    },
})

function yes() {
    useFetch(`/api/reports/update/${props.id}`, {
        method: "PUT",
        onResponse({ response }) {
            if (response.ok) {
                emit('success')
            }
        }
    })
}
</script>