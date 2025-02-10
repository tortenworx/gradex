<template>
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-serif font-medium text-oct-green dark:text-green-600 flex items-center justify-start">
            <UserPlus :size="24" />
            <span class="ml-2">Create New User</span>
        </h1>
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
    <section class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        <div class="md:col-span-full flex md:flex-col gap-2 items-center justify-center">
            <!-- <div class="w-32 h-32 rounded-md bg-oct-othagreen"></div> -->
            <UAvatar icon="i-lucide-image" />
            <span class="text-xs text-gray-600 font-mono md:text-center max-w-[50%] md:max-w-none">Click to select an image or drag a chosen image to the box. Images should be less than 5MB in size.</span>
        </div>
        <FormsTextField label="ID Number">
            <template #leading>
                <IdCard />
            </template>
        </FormsTextField>
        <FormsSelection label="Role" placeholder="Select a suitable role...">
            <template #leading>
                <FileUser />
            </template>
            <option value="USER">Students</option>
            <option value="FACULTY">Teacher / Faculty</option>
            <option value="SUPERADMIN">Administrator</option>
        </FormsSelection>
        <FormsSelection label="Gender" placeholder="Select a gender...">
            <template #leading>
                <PersonStanding />
            </template>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others / Prefer not to say</option>
        </FormsSelection>
        <FormsTextField label="First Name">
            <template #leading>
                <User />
            </template>
        </FormsTextField>
        <FormsTextField label="Middle Name">
            <template #leading>
                <User />
            </template>
        </FormsTextField>
        <FormsTextField label="Last Name">
            <template #leading>
                <User />
            </template>
        </FormsTextField>
        <FormsTextField label="Mobile Number" class="">
            <template #leading>
                +63
            </template>
        </FormsTextField>
        <FormsTextField label="Personal Email Address" class="">
            <template #leading>
                <Mail />
            </template>
        </FormsTextField>
        <FormsEducEmail label="Educational Email Address" class="">
        </FormsEducEmail>
        <div class="md:invisible md:hidden md:justify-start visible flex justify-center gap-2">
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
    </section>
</template>

<script lang="ts" setup>
import { UserPlus, IdCard, User, PersonStanding, FileUser, Ban, Mail } from 'lucide-vue-next';

useHead({
    title: 'Create a New User - GradeX'
})
definePageMeta({
    layout: 'authenticated'
});



</script>