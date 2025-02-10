<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-serif text-oct-green tracking-tighter">Delete this post?</h1>
                    <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
                </div>
            </template>
            <p>Are you sure you want to delete the post "{{ title }}"? You cannot reverse this!</p>
            <template #footer>
                <div class="flex items-center justify-end gap-2">
                    <UButton icon="i-lucide-check" @click="yes">Yes</UButton>
                    <UButton color="gray" type="solid" @click="modal.close()">No</UButton>
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
    title: {
        type: String,
        required: true
    }
})

function yes() {
    useFetch(`/api/admins/announcement/${props.id}`, {
        method: "DELETE",
        onResponse({ response }) {
            if (response.ok) {
                emit('success')
            }
        }
    })
}
</script>