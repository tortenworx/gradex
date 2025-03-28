<script setup lang="ts">
import { ModalCreateReport } from '#components';
import { isFaculty } from '~/shared/utils/abilities';
import { CalendarRange, Hourglass } from 'lucide-vue-next';
const modal = useModal()
const created = ref()
const router = useRouter()
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
const currentSemester = await $fetch('/api/admins/global-vars/shs-current-semester')

const { data } = useFetch<Record[]>('/api/reports/')

function createNew() {
    modal.open(ModalCreateReport, {
        report_id: created,
        onInformation: async (res) => {
            await useFetch('/api/reports/', {
                method: 'POST',
                body: res.selected,
                onResponse({ response, request }) {
                    router.push(`/reports/edit/${response._data._id}`)
                }
            })
            modal.close()
        }
    })
}

const pr = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
const formatOrdinals = (n: string) => {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};
</script> 

<template>
    <section class="flex md:items-center justify-between gap-2 mb-4">
        <div>
            <h2 class="text-md text-gray-500 tracking-tight">Grade Reports</h2>
            <h1 class="text-5xl font-serif text-oct-green font-medium dark:text-lime-400 tracking-tighter -my-2">
                Overview
            </h1>
        </div>
        <div class="flex flex-col md:flex-row items-end md:items-center justify-end gap-4">
            <div class="flex items-center gap-1">
                <CalendarRange class="text-zinc-600" />
                <span class="invisible hidden md:block md:visible">Reporting for <span class="font-bold">{{ formatOrdinals(currentSemester.value) }}</span> semester</span>
                <span class="visible block md:invisible md:hidden"><span class="font-bold">{{ formatOrdinals(currentSemester.value) }}</span> semester</span>
            </div>
            <div class="flex items-center gap-1">
                <Hourglass class="text-zinc-600" />
                <span></span>
                <span class="invisible hidden md:block md:visible">
                    Reports due in <span class="font-bold">5 days</span>
                </span>
                <span class="visible block md:invisible md:hidden">
                    <span class="font-bold">5 days</span>
                </span>
            </div>
            <UButton icon="i-lucide-plus" @click="createNew">New Report</UButton>
        </div>
    </section>
    <main class="grid md:grid-cols-2 gap-2">
        <ReportCardGradeReportOverview v-for="item in data" :subject="item.subject.name" :className="item.subject.linked_class.class_name" :id="item._id" :status="item.status" :date="item.createdAt" /> 
    </main>
</template>