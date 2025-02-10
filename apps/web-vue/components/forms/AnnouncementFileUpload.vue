<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import { File } from 'lucide-vue-next';

const props = defineProps({
    name: {
        type: String,
        default: 'name'
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Select an option...'
    },
    accept: {
        type: String,
        default: ''
    },
    className: {
        type: Array,
        default: []
    }
})
const fileData = ref<File>()

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    fileData.value = file
};

function formatBytes(a:number,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"][d]}`}

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  resetField
} = useField(name, undefined, {
  initialValue: null,
});

const removeFile = () => {
    fileData.value = undefined
    resetField()
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="name" class="font-bold">{{ $t(label) }}</label>
        <div class="relative bg-oct-othagreen px-2 py-4 flex items-center justify-center border-2 border-dashed border-gray-500 border-spacing-7 text-white rounded-md">
            <div class="flex flex-col gap-2 justify-center items-center text-center overflow-hidden">
                <File :size="32" />
                <div v-if="fileData">
                    <p class="text-2xl font-medium">{{ fileData.name }}</p>
                    <button @click="removeFile" class="z-50">Remove</button>
                    <p class="text-xs text-gray-400 font-mono">Type: {{ fileData.type }} &bull; Size: {{ formatBytes(fileData.size, 2) }}</p>
                </div>
                <div v-else>
                    <p class="text-2xl font-medium">Drag and drop items here, or;</p>
                    <UButton class="relative">
                        <span>Select a file</span>
                        <input 
                            type="file"
                            :accept="accept"
                            :id="name"
                            :value="inputValue"
                            @input="handleChange"
                            @blur="handleBlur"
                            :class="className"
                            class="
                            hover:cursor-pointer opacity-0 w-full h-full absolute top-0 bottom-0 left-0 right-0 z-0
                            "
                            @change="onChange"
                        />
                    </UButton>
                    <p class="text-xs text-gray-400 font-mono">JPEG, PNG, and WEBP file formats only. Images can only be up to 5MB in size.</p>
                </div>
            </div>
        </div>
    </div>
</template>