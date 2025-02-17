<script setup lang="ts">
definePageMeta({
    layout: 'authenticated',
})

interface Record {
    subj_name: string,
    code: string,
    teacher: {
        _id: string,
        first_name: string,
        middle_name: string,
        last_name: string
    },
    avg: number | null
}

interface Document {
  full_name: string,
  id_number: string,
  program: string,
  class_name: string,
  semester: string | number,
  records: Record[]
}

const { user } = useUserSession()
const { data } = useFetch<Document | null>('/api/reports/student-report')
data.value?.records.filter((item) => {
    return item !== null
})
console.log(data)

function getGradeAverage(data: Record[]): string | number {
    const filtration = data.filter(n => n)
    const averages = filtration.map((i) => {
        return i.avg
    })
    if (averages.some(el => el == null)) return "Inc."
    const sum = averages.reduce((a,b) => a + b, 0)
    const avg = (sum / averages.length) || 0
    console.log(avg)
    return avg
}
</script>

<template>
    <main>
        <section>
            <h1 class="text-4xl font-medium font-serif text-oct-gren dark:text-lime-600">
                Your latest grade report
            </h1>
            <h3 class="text-mono text-gray-600">
                Report for user {{ user._id }}
            </h3>
        </section>
        <UAlert
            title="Incomplete Grades"
            description="Some of your grades has been listed as blank. Contact your subject teacher immediately to resolve this issue."
            color="red"
            variant="outline"
            icon="i-lucide-badge-x"
            v-if="getGradeAverage(data?.records) == 'Inc.'"
        />
        <!-- <UAlert
            title="Incomplete Report Card"
            description="Some subject teachers have not yet released their report, try viewing this report later. If your grades still dont show up, contact your subject teacher."
            color="blue"
            variant="outline"
            icon="i-lucide-info"
        /> -->
        <ReportCard :full_name="data?.full_name" :avg="getGradeAverage(data?.records)" :sem="data?.semester" class="mt-4">
            <ReportCardSubject v-for="(item,key) in data?.records.filter(x => x !== null)" :code="item.code" :name="item.subj_name" :teacher="item.teacher.first_name+' '+item.teacher.last_name" :grade="item.avg" />
        </ReportCard>
    </main>
</template>