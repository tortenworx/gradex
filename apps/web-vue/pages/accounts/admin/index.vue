<template>
    <main>
        <h1 class="text-oct-green text-3xl font-serif">Accounts List</h1>
        <section>
            
        </section>
    </main>
</template>

<script setup lang="ts">
const data = await fetch('/api/admins/users/fetch', {
    method: "GET"
})
console.log(data)
</script>