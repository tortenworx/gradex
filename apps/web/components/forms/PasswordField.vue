<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    value: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    successMessage: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
})

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name')
const visible = ref(true)

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
const toggleVisibility = () => {
    visible.value = !visible.value
}
</script>
<script lang="ts">
import { Eye, EyeClosed, EyeOff } from 'lucide-vue-next';
</script>

<template>
    <div class="flex flex-col gap-2 container">
        <label :for="name" class="font-bold">{{ $t(label) }}</label>
        <div class="relative">
        <input
            :type="visible ? 'text' : 'password'"
            :id="name"
            :value="inputValue"
            :placeholder="placeholder"
            @input="handleChange"
            @blur="handleBlur"
            class="block
            w-full
            border-[1px]
            border-gray-800
            rounded-md
            px-4
            py-2
            focus:ring-oct-lime
            focus:border-oct-lime
            "
            :class="{ 
                'focus:ring-red-400 focus:border-red-400 bg-red-200 text-black': !!errorMessage,
                'focus:ring-oct-lime focus:border-oct-lime': meta.valid 
                }"
            >
            <div class="absolute z-50 top-0 bottom-0 right-4 flex items-center justify-center hover:cursor-pointer" @click="toggleVisibility">
                <Eye v-if="!visible" />
                <EyeClosed v-if="visible" />
            </div>
        </div>
            <p :class="{'text-red-600': !!errorMessage, 'text-oct-green': meta.valid }" v-show="errorMessage || meta.valid">
            {{ $t(errorMessage || successMessage) }}
            </p>
    </div>
</template>