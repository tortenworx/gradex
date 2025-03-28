<template>
    <button class="px-4 py-2 shadow-md flex items-center justify-start gap-4 hover:shadow-2xl rounded-md border-[1px] border-gray-700 border-opacity-50">
        <div class="text-lime-900 flex items-center justify-center">
            <slot name="icon" />
        </div>
        <div class="flex flex-col text-left">
            <slot />
        </div>
    </button>
</template>