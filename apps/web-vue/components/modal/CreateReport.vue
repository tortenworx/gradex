<script lang="ts" setup>
import type Class from '~/types/Class';

const props = defineProps<{
    report_id: Ref<string>
}>()

interface Modal extends Class {
    key?: any;
    disabled?: boolean;
}

const emit = defineEmits({
    information: null
})
const classes: Class&any[] = await $fetch('/api/classes')
const selected = ref(classes["name"])

</script>

<template>
    <UModal>
        <UCard>
            <template #header>
                <h1 class="text-2xl font-serif text-oct-green dark:text-lime-400">Create new grade report</h1>
            </template>
            <p class="mb-2">To begin, select the class you want to make a report.</p>
            <UInputMenu @change="emit('information', { selected })" v-model="selected" :options="classes" option-attribute="name" by="_id" placeholder="Select one of your classes">
                <template #option="{ option: classData }">
                    <span class="truncate">{{ classData.name }} - {{ classData.linked_class.program }} {{ classData.linked_class.class_name }}</span>
                </template>
            </UInputMenu>
        </UCard>
    </UModal>
</template>