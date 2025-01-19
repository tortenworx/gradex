<template>
    <h1 class="text-3xl font-serif font-medium text-oct-green">Currently editing: {{ res.last_name }}, {{ res.first_name }}</h1>
    <h3 class="text-sm text-gray-500 font-mono">User ID: {{ res._id }}</h3>
    <div class="grid grid-cols-4 gap-4">
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
        <FormsTextField :value="res.middle_name" label="Middle Name"></FormsTextField>
        <FormsTextField :value="res.last_name" label="Last Name"></FormsTextField>
        <FormsTextField :value="res.gender" label="Gender"></FormsTextField>
        <FormsTextField :value="res.mobile_number" label="Mobile Number" class="col-span-3">
            <template #leading>
                <PhoneIcon />
            </template>
        </FormsTextField>
        <FormsTextField :value="res.educational_email_address" label="Educational Email" class="col-span-2">
            <template #leading>
                <Mail />
            </template>
        </FormsTextField>
        <FormsTextField :value="res.personal_email_address" label="Personal Email" class="col-span-2">
            <template #leading>
                <Mail />
            </template>
        </FormsTextField>
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
import { IdCard, PhoneIcon, User, Mail } from 'lucide-vue-next';
</script>