<script setup lang="ts">
import { ModalCreateReport } from '#components';
import { isFaculty } from '~/shared/utils/abilities';
const modal = useModal()
const created = ref()

await authorize(isFaculty)

definePageMeta({
    title: 'Grade reports dashboard',
    layout: 'authenticated',
})
await authorize(isFaculty)

function createNew() {
    modal.open(ModalCreateReport, {
        report_id: created,
        onInformation: (res) => {
            console.log(res)
            const { data, status } = useFetch('/api/reports/', {
                method: 'POST',
                timeout: 60000,
                body: res.selected,
                onResponse({ response, request }) {
                    console.log(response._data)
                }
            })
            modal.close()
        }
    })
}
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
    <main class="grid md:grid-cols-2">
        <ReportCardGradeReportOverview @click="$router.push('/reports/view/67ad9c1f9d81931639e63db6')" />
    </main>
</template>