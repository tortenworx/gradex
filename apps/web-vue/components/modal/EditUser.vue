<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import * as Yup from 'yup'
import type UserRecord from '~/types/User';
const modal = useModal();
const toast = useToast()
const { t } = useI18n()
const s3 = useS3Object()

interface DataProps {
  first_name: string,
  middle_name: string,
  last_name: string,
  personal_email_address: string,
  organizational_email_address: string,
  gender: string,
  id_number: string,
  role: string,
  mobile_number: string,
  image: any
}

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const { data: user } = useFetch<UserRecord>(`/api/admins/accounts/fetch/${props.id}`)

const emit = defineEmits(['success'])

const state = reactive(user.value)

// const state = reactive<any>({
//   first_name: undefined,
//   middle_name: undefined,
//   last_name: undefined,
//   personal_email_address: undefined,
//   organizational_email_address: undefined,
//   gender: undefined,
//   id_number: undefined,
//   role: undefined,
//   mobile_number: undefined,
//   profile_image_file: undefined
// })


const schema = Yup.object().shape({
  first_name: Yup.string().required(t("field_errors.required_default")),
  middle_name: Yup.string().required(t("field_errors.required_default")),
  last_name: Yup.string().required(t("field_errors.required_default")),
  organizational_email_address: Yup.string().required(t("field_errors.required_default")).email(t("field_errors.email_invalid", { field: "Organizational Email" })).matches(/^[A-Za-z0-9._%+-]+@olivarezcollegetagaytay\.edu\.ph$/gi, { message: t("field_errors.school_email_invalid") }),
  personal_email_address: Yup.string().required(t("field_errors.required_default")).email(t("field_errors.email_invalid", { field: "Personal Email" })).matches(/^[A-Za-z0-9._%+-]+@(?!olivarezcollegetagaytay.edu.ph)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi, { message: "field_errors.personal_email_invalid" }),
  gender: Yup.mixed().required(t("field_errors.required_default")).oneOf(['MALE', 'FEMALE', 'OTHER']),
  id_number: Yup.string().required(t("field_errors.required_default")).matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, { message: t('field_errors.id_number_invalid') }),
  role: Yup.mixed().required(t("field_errors.required_default")).oneOf(['USER', "FACULTY", "SUPERADMIN"]),
  mobile_number: Yup.string().required(t("field_errors.required_default")).matches(/^(09|\+639)\d{9}$/g, { message: t('field_errors.mobile_number') }),
  image: Yup.mixed<File>().required(t("field_errors.required_default"))
})

const genders = [
  {
    name: "Male",
    value: "MALE",
  },
  {
    name: "Female",
    value: "FEMALE",
  },
  {
    name: "Others/Prefer not to Say",
    value: "OTHER",
  }
]

const roles = [
  {
    name: "Student",
    value: "USER",
  },
  {
    name: "Teacher, Professor, Faculty Staff",
    value: "FACULTY",
  },
  {
    name: "Administrators",
    value: "SUPERADMIN",
  }
]

function onFilePicked (files: FileList) {
  state.image = files[0]
}

async function submit(event: FormSubmitEvent<any>) {
  return console.log(event.data, user)
  const file_addr = await s3.upload(state.image)
  useFetch('/api/admins/accounts/create', {
    method: "POST",
    body: {
      first_name: event.data.first_name,
      middle_name: event.data.middle_name,
      last_name: event.data.last_name,
      personal_email_address: event.data.personal_email_address,
      educational_email_address: event.data.organizational_email_address,
      gender: event.data.gender,
      id_number: event.data.id_number,
      role: event.data.role,
      mobile_number: event.data.mobile_number,
      image: file_addr
    },
    onResponseError({ response, error }) {
      toast.add({
        title: 'An error occured',
        description: response._data.message || error?.message,
        icon: 'i-lucide-circle-x',
        color: 'red',
        timeout: 3000
      })
    },
    onResponse({ response }) {
      if (response.ok) {
        emit('success')
      }
    }
  })
}
</script>

<template>
  <UModal>
    <UCard>
        <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-serif text-oct-green dark:text-lime-400 tracking-tighter">Create a new user</h1>
              <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
            </div>  
        </template>
      <div class="space-y-2">
        <UForm :schema="schema" :state="state" lang="en" @submit="submit" class="flex flex-col gap-2">
          <UFormGroup label="ID Number" name="id_number" class="mb-2">
            <UInput icon="i-lucide-id-card" v-model="state.id_number" placeholder="OCT-XXXXXXXC"></UInput>
          </UFormGroup>
          <UFormGroup label="Profile Image" name="profile_image_file">
            <UInput icon="i-lucide-image" type="file" accept="image/jpeg, image/png, image/webp" @change="onFilePicked"></UInput>
            <span class="text-xs text-gray-600">Make sure that the profile image is square, else it may have adverse effects!</span>
          </UFormGroup>
          <UFormGroup label="First Name" name="first_name">
            <UInput icon="i-lucide-square-user" v-model="state.first_name" placeholder="Juan"></UInput>
          </UFormGroup>
          <UFormGroup label="Middle Name" name="middle_name">
            <UInput icon="i-lucide-square-user" v-model="state.middle_name" placeholder="Jacinto" />
          </UFormGroup>
          <UFormGroup label="Last Name" name="last_name">
            <UInput icon="i-lucide-square-user" v-model="state.last_name" placeholder="De la Cruz" />
          </UFormGroup>
          <UFormGroup label="Mobile Number" name="mobile_number">
            <UInput icon="i-lucide-phone" v-model="state.mobile_number" placeholder="09270491723" />
          </UFormGroup>
          <UFormGroup label="Personal Email Address" name="personal_email_address" class="mt-4">
            <UInput icon="i-lucide-mail" v-model="state.personal_email_address" placeholder="gradex@lyra-research.site" />
          </UFormGroup>
          <UFormGroup label="School Email Address" name="organizational_email_address">
            <UInput icon="i-lucide-mail" v-model="state.organizational_email_address" placeholder="gradex@olivarzcollegetagaytay.edu.ph" />
          </UFormGroup>
          <UFormGroup label="Gender" name="gender" class="mt-2">
            <USelect icon="i-lucide-person-standing" :options="genders" v-model="state.gender" option-attribute="name" placeholder="Select user's gender" />
          </UFormGroup>
          <UFormGroup label="Role" name="role">
            <USelect icon="i-lucide-user-cog" :options="roles" v-model="state.role" option-attribute="name" placeholder="Select user's role" />
          </UFormGroup>
          <UButton type="submit" block class="mt-6">
            Create a New User
          </UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>