<template>
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-serif font-medium text-oct-green dark:text-green-600">Currently editing: {{ res.last_name }}, {{ res.first_name }}</h1>
            <h3 class="text-sm text-gray-500 font-mono">User ID: {{ res._id }}</h3>
        </div>
        <div class="invisible hidden md:visible md:flex gap-2">
            <button class="bg-oct-othagreen px-4 py-2 rounded-md text-white hover:bg-oct-lime transition-colors duration-300 flex items-center justify-center gap-2">
                <UserPlus :size="20"/>
                <span>Create User</span>
            </button>
            <NuxtLink href="/admin/users">
                <button class="bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-oct-green transition-colors duration-300 flex items-center justify-center gap-2">
                    <Ban :size="20"/>
                    <span>Cancel</span>
                </button>
            </NuxtLink>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div class="md:col-span-4 flex md:flex-col gap-2 items-center justify-center">
            <div class="w-32 h-32 rounded-md bg-oct-othagreen"></div>
            <span class="text-xs text-gray-600 font-mono md:text-center max-w-[50%] md:max-w-none">Click to select an image or drag a chosen image to the box. Images should be less than 5MB in size.</span>
        </div>
        <FormsTextField :value="res.id_number" label="ID Number">
            <template #leading>
                <IdCard />
            </template>
        </FormsTextField>
        <FormsTextField :value="res.first_name" label="First Name">
            <template #leading>
                <User />
            </template>
        </FormsTextField>
        <FormsTextField :value="res.middle_name" label="Middle Name">
            <template #leading>
                <User />
            </template>
        </FormsTextField>
        <FormsTextField :value="res.last_name" label="Last Name">
            <template #leading>
                <User />
            </template>
        </FormsTextField>
        <FormsSelection :value="res.gender" label="Gender">
            <template #leading>
                <PersonStanding />
            </template>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Others / Preffer Not to Say</option>
        </FormsSelection>
        <FormsTextField :value="res.mobile_number" label="Mobile Number" class="md:col-span-3">
            <template #leading>
                <span class="font-bold text-gray-700">+63</span>
            </template>
        </FormsTextField>
        <FormsTextField :value="res.educational_email_address" label="Educational Email" class="md:col-span-2">
            <template #leading>
                <Mail />
            </template>
        </FormsTextField>
        <FormsTextField :value="res.personal_email_address" label="Personal Email" class="md:col-span-2">
            <template #leading>
                <Mail />
            </template>
        </FormsTextField>
        <UInput>
            <template #leading>
                <span class="text-base mr-20">+63</span>
            </template>
        </UInput>
        <UInput icon="i-heroicons-envelope" size="md">
            <template #trailing>
                <span class="text-xs text-gray-600">@olivarezcollegetagaytay.edu.ph</span>
            </template>
        </UInput>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
definePageMeta({
    layout: 'authenticated',
})
const [res] = await $fetch(`/api/admins/accounts/fetch/${route.params.id}`, {
    method: "GET"
})
console.log(res)
</script>
<script lang="ts">
import { IdCard, PersonStanding, User, Mail, UserPlus, Ban } from 'lucide-vue-next';
</script>