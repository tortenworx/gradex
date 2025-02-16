<template>
    <main>
        <div class="flex items-center justify-between">
            <h1 class="text-oct-green text-2xl font-serif dark:text-green-600">Accounts List</h1>
            <div class="flex gap-2">
                <UButton @click="createUser()">
                    New User
                </UButton>
                <UButton @click="refresh">
                    Refresh
                </UButton>
            </div>
        </div>
        <UTable 
            :rows="users || []"
            :columns="columns"
            :loading="status === 'pending'"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
            >
            <template #actions-data="{ row }">
                <UDropdown :items="actions(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </main>
</template>

<script setup lang="ts">
import { isAdmin } from '~/shared/utils/abilities';
import { ModalCreateUser, ModalDeleteUser } from '#components';

const router = useRouter()
const modal = useModal()
const toast = useToast()
await authorize(isAdmin)

definePageMeta({
    layout: 'authenticated',
})
useHead({
    title: "All Users | GradeX",
})

function createUser() {
    modal.open(ModalCreateUser, {
        onSuccess: () => {
            toast.add({
                title: 'User created sucessfully',
                icon: 'i-lucide-circle-check',
                color: 'green',
                timeout: 3000
            })
            modal.close()
        }
    })
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
await nextTick()

const actions = (row: any) => [
    [{
    label: 'Edit',
    icon: 'i-lucide-pencil',
    click: () => router.push('/admin/users/edit/'+row.id)
  }], [{
    label: 'Reset Password',
    icon: 'i-lucide-square-asterisk',
    click: () => resetRequest(row.id_number)
  }], [{
    label: 'Delete',
    icon: 'i-lucide-trash',
    click: () => deleteUser(row.id)
  }]
]

const columns = [
    {
        key: "id",
        label: "User ID"
    },
    {
        key: "full_name",
        label: "Full Name"
    },
    {
        key: "id_number",
        label: "ID Number"
    },
    {
        key: "mobile_number",
        label: "Phone Number"
    },
    {
        key: "personal_email",
        label: "E-mail Address"
    },
    {
        key: "school_email",
        label: "School E-mail Address"
    },
    {
        key: "gender",
        label: "Gender"
    },
    {
        key: "actions"
    }
]

function deleteUser(id: string) {
    modal.open(ModalDeleteUser, {
        id: id,
        onSuccess: () => {
            toast.add({
                title: "User deleted sucessfully.",
                icon: "i-lucide-check",
                color: "red"
            })
            modal.close()
        }
    })
}

function resetRequest(id_number: string) {
    useFetch('/api/admins/accounts/reset_req', {
        method: "POST",
        body: {
            username: id_number
        },
        onRequest() {
            toast.add({
                id: 'reset_toast',
                title: 'Sending reset link...',
                description: 'Please wait...',
                icon: 'i-svg-spinners-eclipse',
                timeout: 0
            })
        },
        onResponseError({ response }) {
            toast.update('reset_toast', {
                title: 'An error occured.',
                description: response._data.message,
                color: "red",
                icon: 'i-lucide-circle-x',
                timeout: 3000
            })
        },
        onResponse({ response }) {
            if (response.ok) {
                toast.update('reset_toast', {
                    title: 'Password reset sent sucessfully',
                    description: 'Ask the user to check their INBOX or SPAM folders.',
                    icon: 'i-lucide-check-check',
                    color: 'green',
                    timeout: 3000
                })
            }
        }
    })
}

const { status, data: users, refresh } = await useAsyncData('users', async () => await $fetch('/api/admins/accounts/fetchAll'))
onMounted(() => {
    nextTick(async () => {
        if (!users.value) {
            await refresh()
        }
    })
})
</script>