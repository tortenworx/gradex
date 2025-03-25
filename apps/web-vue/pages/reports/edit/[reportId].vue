<script setup lang="ts">
import { ModalPublishReport, ModalReportPublished } from '#components';
import { readGrades } from '~/shared/utils/xlsx';
const route = useRoute()
const toast = useToast()
const modal = useModal()
definePageMeta({
    layout: 'authenticated'
})

const router = useRouter()

interface Record {
    _id: string;
    user: {
        _id: string;
        first_name: string;
        middle_name: string;
        last_name: string;
    };
    avg: number | null
}

interface GradeReport {
    _id: string,
    status: "PUBLISHED" | "EDITING" | "REVIWEING",
    type: "SHS" | "COLLEGE"
    records: Record[],
    subject: {
        name: string,
        linked_class: {
            class_name: string,
        }
    }
    createdAt: string
}

const { data } = await useFetch<GradeReport>(`/api/reports/${route.params.reportId}`)
console.log(data)
if (!data.value) throw createError({
    statusCode: 404,
    message: "No grade report found."
})

if (data.value?.status !== 'EDITING') {
    modal.open(ModalReportPublished)
}

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

// function publishGrades() {
//     modal.open(ModalPublishReport, {
//         id: data.value._id,
//         onSuccess: () => {
//             console.log('ok')
//         }
//     })

function eatShitInvalidValue(num: number | null) {
    if (!num) return null;
    if (num > 100 || num < 0) {
        toast.add({
            title: 'Invalid Value',
            description: 'You have placed an invalid value, the field has been reset.',
            color: 'red',
            icon: 'i-lucide-circle-x'
        })
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
    data.value?.records.map(e => (e.avg = grades?.find(a => a.id == e.user._id)?.grades || e.avg, e));
    return console.log(grades)
}
function publishGrades() {
    updateGrades()
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
                    <div class="" v-for="(grade, index) in data?.records">
                        <div class="flex items-center justify-between px-4 py-2" v-if="grade.user">
                        <div>
                            {{ grade.user.last_name }},
                            {{ grade.user.first_name }}
                            {{ grade.user.middle_name }}
                        </div>
                        <div class="flex items-center gap-2">
                            <!-- {{ index }}
                            {{ grade }} -->
                            <UInput
                                v-model="grade.avg"
                                type="number"
                                :min="0"
                                :max="100"
                                @change="grade.avg = eatShitInvalidValue(grade.avg)"
                                :disabled="data?.status !== 'EDITING'"
                                />
                        </div>
                        </div>
                    </div>
                </template>
                <template #automatic="{ item }">
                    <UAlert
                        title="About ezGrade"
                        description="ezGrade simplifies grade encoding by leveraging the power of spreadsheets. Teachers can use this familiar interface to input grades more effectively. Click the button to learn more and get started."
                        icon="i-lucide-sheet"
                        :actions="[{ 
                            variant: 'solid', 
                            color: 'primary', 
                            label: 'Download Sheet', 
                            click: () => {
                                return navigateTo(`/api/reports/ezgrade/${$route.params.reportId}`, { open: { target: '_blank' } })
                            }
                            }]"
                        />
                    <div class="mt-4">
                        <!-- <UInput type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /> -->
                        <input type="file" :disabled="data?.status !== 'EDITING'" @change="readFile" />
                    </div>
                </template>
            </UTabs>
        </section>
    </main>
</template>
