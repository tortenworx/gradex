<script setup lang="ts">
import { ModalCreateReport } from '#components';
import { isFaculty } from '~/shared/utils/abilities';
import ReportsEdit from '~/pages/reports/edit/[reportId].vue'
const modal = useModal()
const created = ref()
const router = useRouter()

await authorize(isFaculty)

definePageMeta({
    title: 'Grade reports dashboard',
    layout: 'authenticated',
})
await authorize(isFaculty)

interface Record {
    _id: string,
    status: "EDITING" | "PUBLISHED" | "REVIEWING";
    type: "SHS" | "COLLEGE";
    createdAt: string;
    subject: {
      _id: string;
      name: string;
      code: string;
      linked_class: {
        _id: string;
        class_name: string;
      }
    };
    created_by: string;
    semester: number;
}

const { data } = useFetch<Record[]>('/api/reports/')

function createNew() {
    modal.open(ModalCreateReport, {
        report_id: created,
        onInformation: (res) => {
            const { data, status } = useFetch('/api/reports/', {
                method: 'POST',
                body: res.selected,
                onResponse({ response, request }) {
                    navigateTo(`/reports/edit/${response._data._id}`)
                }
            })
            modal.close()
        }
    })
}
console.log(router.getRoutes())
</script> 

<template>
    <section class="flex items-center justify-between gap-2 mb-4">
        <div>
            <h2 class="text-md text-gray-500 tracking-tight">Grade Reports</h2>
            <h1 class="text-5xl font-serif text-oct-green font-medium dark:text-lime-400 tracking-tighter -my-2">
                Overview
            </h1>
        </div>
        <div>
            <UButton icon="i-lucide-plus" @click="createNew">New Report</UButton>
        </div>
    </section>
    <main class="grid md:grid-cols-2 gap-2">
        <ReportCardGradeReportOverview v-for="item in data" :subject="item.subject.name" :className="item.subject.linked_class.class_name" :id="item._id" :status="item.status" :date="item.createdAt" /> 
    </main>
</template>