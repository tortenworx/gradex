<template>
    <main>
        <h1 class="text-oct-green text-3xl font-serif">Accounts List</h1>
        <section>
            <h1 class="">peekaboo</h1>
            <ol>
                <li v-for="user in res" class="grid grid-cols-7 gap-2 md:gap-4 odd:bg-slate-200 px-2 py-4 place-items-stretch">
                    <div class="col-span-2 md:col-span-1">
                        {{ user.id_number }}
                    </div>
                    <div class="col-span-3 md:col-span-2">
                        <span class="font-bold uppercase">{{ user.last_name }}</span>, {{ user. first_name }} {{ user.middle_name }}
                    </div>
                    <div>
                        {{ user.gender }}
                    </div>
                    <div class="invisible hidden md:flex md:visible md:col-span-2 items-center justify-start gap-2">
                        {{ user.educational_email_address }}
                        <TooltipProvider>
                            <TooltipRoot>
                                <TooltipTrigger class="text-slate-600">
                                    <a v-bind:href="'mailto:'+user.educational_email_address">
                                        <Mail :size="18" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipPortal>
                                    <TooltipContent class="bg-white text-oct-othagreen px-2 py-1 text-sm rounded">
                                        Send an e-mail
                                        <TooltipArrow class="fill-white" :width="8" />
                                    </TooltipContent>
                                </TooltipPortal>
                            </TooltipRoot>
                        </TooltipProvider>
                    </div>
                    <div class="flex items-center justify-center md:justify-end md:pr-4">
                        <Options>
                            <DropdownMenuItem value="Edit" class="text-oct-othagreen px-4 py-2 rounded-md hover:bg-oct-green hover:text-white flex items-center justify-start gap-1 hover:cursor-pointer" @click="navigateTo(`/admin/users/edit/${user._id}`)">
                                <Pencil :size="16" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem value="Disable Account" class="text-oct-green px-4 py-2 rounded-md hover:bg-slate-200 hover:text-black flex items-center justify-start gap-1 hover:cursor-pointer">
                                <UserRoundX :size="16" />
                                <span>Disable Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem value="Delete Account" class="text-red-600 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white flex items-center justify-start gap-1 hover:cursor-pointer">
                                <Trash :size="16" />
                                <span>Delete Account</span>
                            </DropdownMenuItem>
                        </Options>
                    </div>
                </li>
            </ol>
        </section>
    </main>
</template>

<script setup lang="ts">
import { Trash, Pencil, UserRoundX, Mail } from 'lucide-vue-next';
import Options from '@/components/buttons/OtherOptionsSquare.vue'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue'
import { DropdownMenuItem } from 'radix-vue';

definePageMeta({
    layout: 'authenticated',
})
useHead({
    title: "All Users | GradeX",
})
const res = await $fetch('/api/admins/accounts/fetchAll', {
    method: "GET"
})
console.log(res)
</script>