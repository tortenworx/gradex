<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-serif text-oct-green dark:text-lime-400 tracking-tighter">Delete this user?</h1>
                    <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
                </div>
            </template>
            <p>Are you sure you want to delete this user? This change is irreversible, are you <bold>really</bold> sure?</p>
            <template #footer>
                <div class="flex items-center justify-end gap-2">
                    <UButton icon="i-lucide-check" @click="yes" color="red">Yes</UButton>
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
    useFetch(`/api/admins/accounts/${props.id}`, {
        method: "DELETE",
        onResponse({ response }) {
            if (response.ok) {
                emit('success')
            }
        }
    })
}
</script>