<script setup lang="ts">
import { ModalPublishReport, ModalReportPublished, UAccordion } from '#components';
import { readGrades } from '~/shared/utils/xlsx';
import type { GradeRecord, GradeReport } from '~/types/GradeReport';
import { Gender } from '~/types/User';
import { useDropZone } from '@vueuse/core'
const route = useRoute()
const toast = useToast()
const modal = useModal()
const router = useRouter()
const dropZoneRef = ref<HTMLDivElement>()
definePageMeta({
    layout: 'authenticated',
})
const { data } = await useFetch<GradeReport>(`/api/reports/${route.params.reportId}`)
if (!data.value) throw createError({
    statusCode: 404,
    message: "No grade report found."
})
useHead({
    title: `Grade Report for ${data.value.subject.name} - GradeX`
})
if (data.value?.status !== 'EDITING') {
    modal.open(ModalReportPublished)
}
const sortByGenderAndLastName = (data: GradeRecord[]): GradeRecord[] => {
  const genderPriority: Record<Gender, number> = { "MALE": 0, "FEMALE": 1, "OTHER": 2 };

  return data.sort((a, b) => {
    // First, sort by gender group (MALE first, then FEMALE, then OTHER)
    const genderDiff = genderPriority[a.user.gender] - genderPriority[b.user.gender];
    if (genderDiff !== 0) return genderDiff;

    // If same gender, sort alphabetically by last name
    return a.user.last_name.localeCompare(b.user.last_name);
  });
};

const getMiddleInitial = (middleName?: string): string => {
  if (!middleName || middleName.trim() === "") return "";
  return middleName.trim().charAt(0).toUpperCase() + ".";
};

const sortstudents = sortByGenderAndLastName(data.value.records)

function updateGrades() {
    const peen = data.value?.records.map((i) => {
        if (i.user) return { ...i, user: i.user._id }
    })
    useFetch(`/api/reports/update/${route.params.reportId}`, {
        method: "PATCH",
        body: peen,
        onResponseError({ response }) {
            toast.add({
                title: 'An error occured.',
                description: response._data.message,
                color: "red",
                icon: 'i-lucide-circle-x'
            })
        },
        onResponse({ response }) {
            if (response.ok) {
                toast.add({
                    title: 'Records updated',
                    description: 'Records are now updated in the database.',
                    icon: 'i-lucide-check-check',
                    color: 'green'
                })
            }
        }
    })
}

function eatShitInvalidValue(num: number | null) {
    if (!num) return null;
    if (num > 100 || num < 0) {
        return null
    }
    return num
}

async function readFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    if (!file.name.match(/.(xlsx)$/i)) {
        return toast.add({
            icon: 'i-lucide-badge-x',
            title: 'Invalid file format!',
            description: 'Only spreadsheet files are allowed!',
            color: 'red'
        })
    }
    toast.add({
        title: "Read file sucessfully.",
        icon: 'i-lucide-check',
        color: 'green'
    })
    const blob = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    const buffer = await blob.arrayBuffer()
    const grades = await readGrades(buffer)
    data.value?.records.map(e => ({
        ...e,
        avg: grades?.find((a: any) => String(e.user?._id) === String(a.id))?.grades ?? e.avg
    }));
}


async function onDrop(files: File[] | null) {
    if (!files) return;
    const file = files[0];
    if (!file.name.match(/.(xlsx)$/i)) {
        return toast.add({
            icon: 'i-lucide-badge-x',
            title: 'Invalid file format!',
            description: 'Only spreadsheet files are allowed!',
            color: 'red'
        })
    }
    toast.add({
        title: "Read file sucessfully.",
        icon: 'i-lucide-check',
        color: 'green'
    })
const blob = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    const buffer = await blob.arrayBuffer()
    const results = await readGrades(buffer)
    data.value?.records.map(e => (e.avg = results?.find((a: any) => e.user._id == a.id)?.grades || e.avg, e));
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  // control multi-file drop
  multiple: false,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
})

function downloadEzGrade() {
    const { data: buffer } =  useFetch<Buffer>(`/api/reports/ezgrade/${route.params.reportId}`, { responseType: "arrayBuffer" })
    if (!buffer.value) throw new Error('ezGrade did not find the report!')
    const content = new Blob([buffer.value], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

    const encodedUri = window.URL.createObjectURL(content);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ezgrade-${route.params.reportId}.xlsx`);

    link.click()
}

function publishGrades() {
    updateGrades()
    if (!data.value) return;
    modal.open(ModalPublishReport, {
        id: data.value._id,
        onSuccess: () => {
            router.push('/reports')
            toast.add({
                title: 'Report published!',
                description: 'Your report is now viewable by your students.',
                icon: 'i-lucide-disk',
                color: 'green'
            })
        }
    })
}

const faqItems = ref([
    {
        label: "How does ezGrade work?",
        content: "ezGrade generates a spreadsheet where teachers can input their students' grades. Once completed, the spreadsheet can be uploaded to the system, making grade encoding faster and more efficient compared to manual entry in the web portal."
    },
    {
        label: "What are the benefits of using ezGrade?",
        content: "ezGrade saves time by allowing bulk grade entry in a structured spreadsheet format, reducing errors and minimizing the need for repeated manual input."
    },
    {
        label: "Is there a specific format for the generated spreadsheet?",
        content: "Yes, ezGrade provides a standardized template with predefined columns for student names, IDs, and grade entries to ensure compatibility when uploading the file back into the system."
    },
    {
        label: "Can I edit the spreadsheet before uploading it?",
        content: "Yes, teachers can modify grades within the provided template, but they must follow the required format to ensure a smooth upload process."
    },
    {
        label: "What should I do if I encounter an error while uploading the spreadsheet?",
        content: "If an upload error occurs, check for formatting issues, missing data, or incorrect file types. If the issue persists, refer to the help documentation or contact support for assistance."
    },
])
</script>

<template>
    <header class="flex items-center justify-between mb-4">
        <div>
            <h2 class="text-md text-gray-500 tracking-tight">Grade Reports</h2>
            <h1 class="text-5xl font-serif text-oct-green font-medium dark:text-lime-400 tracking-tighter -my-2">
                Editing a report
            </h1>
        </div>
        <div class="flex flex-col md:flex-row items-end md:items-center justify-end gap-2">
            <UButton v-if="data?.status == 'EDITING'" icon="i-lucide-save" @click="updateGrades">Save</UButton>
            <UButton v-if="data?.status == 'EDITING'" icon="i-lucide-send" variant="soft" @click="publishGrades">Save and Publish</UButton>
            <UButton v-if="data?.status !== 'EDITING'" icon="i-lucide-arrow-left" @click="navigateTo('/reports')">Go Back</UButton>
        </div>
    </header>
    <main>
        <header>
            <span class="text-xs font-mono text-gray-400 dark:text-gray-600">{{ data?._id }}</span>
            <h1 class="text-3xl font-sans font-light truncate">{{ data?.subject.name }}</h1>
            <span class="font-mono text-gray-601 dark:text-gray-400">{{ data?.subject.linked_class.class_name }} &bull; {{ (new Date(data.createdAt).toLocaleDateString() ) }} </span>
        </header>
        <section class="mt-2">
            <UTabs :items="[{ label: 'Manual Input', slot: 'manual' }, { label: 'ezGrade', slot: 'automatic' }]">
                <template #manual="{ item }" class="flex flex-col gap-2">
                    <div class="grid grid-cols-[1fr_auto_auto] px-4 py-2 gap-4">
                        <p class="font-bold text-oct-othagreen text-lg">Student Name (Last Name, First Name MI)</p>
                        <p class="text-center text-oct-green font-medium">1st Quarter</p>
                        <p class="text-center text-oct-green font-medium">2nd Quarter</p>
                    </div>
                    <div v-for="student in sortstudents">
                        <div class="grid grid-cols-[1fr_auto_auto] px-4 py-2 gap-4">
                            <div class="w-full">
                                {{ student.user.last_name }},
                                {{ student.user.first_name }}
                                {{ getMiddleInitial(student.user.middle_name) }}
                            </div>
                            <div class="w-20">
                                <UInput
                                    v-model="student.avg[0]"
                                    type="number"
                                    :min="0"
                                    :max="100"
                                    @change="student.avg[0] = eatShitInvalidValue(student.avg[0])"
                                    :disabled="data?.status !== 'EDITING'"
                                    class="text-center"
                                />
                            </div>
                            <div class="w-20">
                                <UInput
                                    v-model="student.avg[1]"
                                    type="number"
                                    :min="0"
                                    :max="100"
                                    @change="student.avg[1] = eatShitInvalidValue(student.avg[1])"
                                    :disabled="data?.status !== 'EDITING'"
                                    class="text-center"
                                />
                            </div>
                        </div>
                    </div>
                </template>
                <template #automatic="{ item }">
                    <div class="flex flex-col md:grid grid-cols-2 grid-rows-1 grid-flow-col md:gap-4">
                        <div>
                            <UAlert
                                title="About ezGrade"
                                description="ezGrade simplifies grade encoding by leveraging the power of spreadsheets. Teachers can use this familiar interface to input grades more effectively. Click the button to learn more and get started."
                                icon="i-lucide-sheet"
                                class="h-fit"
                                :actions="[{ 
                                    variant: 'solid', 
                                    color: 'primary', 
                                    label: 'Download Sheet', 
                                    click: downloadEzGrade
                                    }]"
                                />
                            <div class="mt-4">
                                <h1 class="text-2xl font-medium text-oct-othagreen dark:text-green-500 mb-2">Upload your spreadsheet down below</h1>
                                <div class="flex items-center justify-center w-full" ref="dropZoneRef">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500" :class="{ 'bg-green-400': isOverDropZone }">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">GradeX generated ezGrade .xlsx files only.</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" @change="readFile" :disabled="data.status !== 'EDITING'" />
                                    </label>
                                </div> 
                            </div>
                        </div>
                        <div class="mt-4">
                            <h2 class="text-2xl font-medium text-oct-othagreen dark:text-green-500">Frequently Asked Questions (FAQ)</h2>
                            <UAccordion :items="faqItems" />
                        </div>
                    </div>
                </template>
            </UTabs>
        </section>
    </main>
</template>
