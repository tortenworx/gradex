<template>
    <main>
        <div class="flex items-center justify-between">
            <h1 class="text-oct-green text-2xl font-serif dark:text-green-600">Accounts List</h1>
            <div>
                <UButton href="/admin/users/create">
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
import { Trash, Pencil, UserRoundX, Mail, UserPlus } from 'lucide-vue-next';
import Options from '@/components/buttons/OtherOptionsSquare.vue'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue'
import { DropdownMenuItem } from 'radix-vue';
import { VueSpinnerTail } from 'vue3-spinners';
import { Gender } from '~/types/User';

const router = useRouter()

definePageMeta({
    layout: 'authenticated',
})
useHead({
    title: "All Users | GradeX",
})

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
await nextTick()

const actions = row => [
      [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => router.push('/admin/users/edit/'+row.id)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
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
const { status, data: users, refresh } = await useAsyncData('users', async () => await $fetch('/api/admins/accounts/fetchAll'))
onMounted(() => {
    nextTick(async () => {
        if (!users.value) {
            await refresh()
        }
    })
})
</script>