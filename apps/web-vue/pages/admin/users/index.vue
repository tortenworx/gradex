<template>
    <main>
        <div class="flex items-center justify-between">
            <h1 class="text-oct-green text-2xl font-serif dark:text-green-600">Accounts List</h1>
            <div class="flex gap-2">
                <NuxtLink href="/admin/users/create">
                    <button class="bg-oct-othagreen px-4 py-2 rounded-md text-white hover:bg-oct-lime transition-colors duration-300 flex items-center justify-center gap-2">
                        <UserPlus :size="20"/>
                        <span>New User</span>
                    </button>
                </NuxtLink>
            </div>
        </div>
        <UTable :rows="rows" :columns="columns" v-if="rows" />
    </main>
</template>

<script setup lang="ts">
import { Trash, Pencil, UserRoundX, Mail, UserPlus } from 'lucide-vue-next';
import Options from '@/components/buttons/OtherOptionsSquare.vue'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue'
import { DropdownMenuItem } from 'radix-vue';
import { VueSpinnerTail } from 'vue3-spinners';
import { Gender } from '~/types/User';

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const columns = [
    {
        key: "id",
        label: "User ID"
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
]

const rows:any[] = []

definePageMeta({
    layout: 'authenticated',
})
useHead({
    title: "All Users | GradeX",
})
await $fetch('/api/admins/accounts/fetchAll', {
    method: "GET"
}).then((data) => {
    data.forEach((item: any) => {
        rows.push({
            id: item._id,
            id_number: item.id_number,
            full_name: `${item.last_name}, ${item.first_name} ${item.middle_name}`,
            mobile_number: '0'+item.mobile_number,
            personal_email: item.personal_email_address,
            school_email: item.educational_email_address,
            gender: toTitleCase(item.gender),
        })
    })
}).catch(error => {
    throw new Error('An bug has occured', { cause: error.statusMessage })
})
</script>