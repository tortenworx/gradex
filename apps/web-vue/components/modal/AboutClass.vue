<script setup lang="ts">
import { isFaculty } from '~/shared/utils/abilities';
import Class from '~/types/Class';

const modal = useModal()
const props = defineProps({
    data: {
        type: Class,
        required: true
    }
})
</script>

<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-serif text-oct-green tracking-tighter">About this class</h1>
                    <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
                </div>
            </template>
            <h1 class="text-2xl font-serif text-oct-green dark:text-lime-600 mb-2">{{ data.name }}</h1>
            <div>
                {{ data.description }}
            </div>
            <Can :ability="isFaculty">
                <div class="mt-4">
                    <h3 class="text-xl font-serif">Students</h3>
                    <section class="mt-2">
                        <div v-for="student in data.students" class="rounded-md bg-gray-100 flex items-center justify-start gap-2">
                            <div>
                                <UAvatar :src="student.image" icon="i-lucide-image"></UAvatar>
                            </div>
                            <div class="flex-grow">
                                <p>
                                    {{ student.first_name }}
                                    {{ student.middle_name }}
                                    {{ student.last_name }}
                                </p>
                            </div>
                        </div>
                        <div v-if="data.students.length == 0">
                            <p>No students found :'(</p>
                        </div>
                    </section>
                </div>
            </Can>
        </UCard>
    </UModal>
</template>