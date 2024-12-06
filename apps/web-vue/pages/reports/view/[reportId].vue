<script setup lang="ts">
import ReportCard from '@/components/ReportCard/index.vue'
const route = useRoute()
definePageMeta({
    layout: 'authenticated'
})

// const { data, error, status } = await useFetch(`/reports/fetch/${route.params.reportId}`, {
//     headers: {
//         Authorization: 'Bearer' + token.value
//     }
// })
</script>

<template>
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-3xl text-oct-green font-serif">Your current grade report</h1>
            <h3 class="text-sm text-gray-700 font-mono">Report Id: {{ route.params.reportId }}</h3>
        </div>
        <NuxtLink href="/">&larr; Return</NuxtLink>
    </div>
    <div class="w-full flex items-center justify-center">
        <ReportCard
            full_name="Andulan, Jarelle Emmanuel Payad"
            :year="2024"
            :sem="1"
            :avg="90"
        >
            <ReportCardSubject 
                code="SH001"
                name="Practical Research 2"
                teacher="Ms. Angelica Digno"
                grade=""
            />
        </ReportCard>
    </div>
</template>
