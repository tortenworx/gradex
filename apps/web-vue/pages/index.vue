<template>
    <main>
      <section class="w-full text-center">
        <h1 class="font-medium text-3xl font-serif text-green-900 dark:text-green-600">
            {{ $t(`${getTime()}`) }}, {{ user?.first_name }}! {{ getTimeEmoji() }}
        </h1>
        <h3 class="font-light text-2xl">
            {{ $t('home.greetings.h2') }}
        </h3>
      </section>
      <section>
        <h1 class="text-3xl font-serif text-oct-othagreen">Latest Announcements</h1>
        <div>
          <HomecardsAnnouncement />
        </div>
      </section>
    </main>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'authenticated'
})
useHead({
  'title': 'Dashboard - GradeX'
})
const { loggedIn, user } = useUserSession()
</script>
<script lang="ts">
async function logOutAndRedirect() {
  const { clear } = useUserSession()
  await clear()
  await navigateTo('/accounts/login')
}

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
