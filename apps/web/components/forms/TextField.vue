<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
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
const name = toRef(props, 'name');

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
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="name" class="font-bold">{{ $t(label) }}</label>
        <input 
            :type="type"
            :id="name"
            :value="inputValue"
            :placeholder="placeholder"
            @input="handleChange"
            @blur="handleBlur"
            class="border-[1px]
            border-gray-800
            rounded-md
            px-4
            py-2
            focus:ring-oct-lime
            focus:border-oct-lime
            "
            :class="{ 
                'focus:ring-red-600 focus:border-red-600 bg-red-400 text-red-600': !!errorMessage,
                'focus:ring-oct-lime focus:border-oct-lime': meta.valid 
                }"
            >
            <p :class="{'text-red-600': !!errorMessage, 'text-oct-green': meta.valid }" v-show="errorMessage || meta.valid">
            {{ $t(errorMessage || successMessage) }}
            </p>
    </div>
</template>