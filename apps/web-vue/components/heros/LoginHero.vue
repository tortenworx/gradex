<template>
    <div class="bg-cover bg-no-repeat relative" :class="backgroundImage">
        <div class="absolute" :class="positioning">
            <h1 class="text-2xl text-medium tracking-tight">
                {{ header }}
            </h1>
            <p class="text-md">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        props: {
            header: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            backgroundImage: {
                type: String,
                required: true,
                validator: (value: string) => {
                    try {
                        new URL(value)
                        return true;
                    } catch (err) {
                        return false
                    }
                }
            },
            positioning: {
                type: String,
                default: "bottom-0 left-0"
            }
        }
    }
</script>