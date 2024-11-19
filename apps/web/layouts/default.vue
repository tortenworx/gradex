<script setup>
// 3. Register the toast placements in the root of your app

// Get toast from global context; you could also be getting from a store,
// this example uses the Vue app provide method
const api = computed(() => inject("toast"))
</script>

<template>
    <div v-for="placement in api.getPlacements()">
        <div :key="placement" v-bind="api.getGroupProps({ placement })" >
            <Toast v-for="toast in api.getToastsByPlacement(placement)" :key="toast.id" :actor="toast" />
        </div>
    </div>
    <div>
        <slot />
    </div>
</template>