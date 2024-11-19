<template>
    <main>
        <h1 class="font-medium text-3xl font-serif text-green-900">
            {{ $t(`${getTime()}`) }}, {{ data?.first_name }}! {{ getTimeEmoji() }}
        </h1>
        <h3 class="font-light text-2xl">
            {{ $t('home.greetings.h2') }}
        </h3>  
    </main>
</template>
<script setup lang="ts">
useHead({
    'title': 'Dashboard - GradeX'
})
definePageMeta({
  layout: 'authenticated',
})
const { data } = useAuth();
</script>
<script lang="ts">
import HomeCard from '@/components/homecards/index.vue'
import HomeCardIcon from '@/components/homecards/icon.vue'
import HomeCardText from '@/components/homecards/text.vue'
import { FileChartColumn, Presentation, FileStack, FileSearch, Shapes, TextSearch, Cog, UserCog } from 'lucide-vue-next';

function getTime() {
  var today = new Date()
  var curHr = today.getHours()

  if (curHr < 12) {
    return 'home.greetings.h1_day'
  } else if (curHr < 18) {
    return 'home.greetings.h1_afternoon'
  } else {
    return 'home.greetings.h1_night'
  }
}

function getTimeEmoji() {
  var today = new Date()
  var curHr = today.getHours()

  if (curHr < 12) {
    return '🌞'
  } else if (curHr < 18) {
    return '🌇'
  } else {
    return '🌚'
  }
}
</script>
