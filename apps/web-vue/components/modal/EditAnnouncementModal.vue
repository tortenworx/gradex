<script setup lang="ts">
import { Link } from 'lucide-vue-next';	
import * as Yup from 'yup'

const props = defineProps({
  data: {
    type: Announcement,
    required: true,
  }
})

const modal = useModal()
const toast = useToast()
const previewImage = ref<any>()
const s3 = useS3Object()

const emit = defineEmits(['success'])

definePageMeta({
  title: 'Create New Announcement'  
})

function getFileExt(fname: string): string {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}

function previewImg(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;
  const file = target.files[0];
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (img) => {
    previewImage.value = img.target?.result
  }
}

const schema = Yup.object().shape({
  title: Yup.string().required('This title is required.').test('len', 'Title must be 8-32 characters long.', (val) => val.length <= 32 && val.length >= 8 ),
  description: Yup.string().required('A description is required.').test('len', 'Description can onl be up to 180 characters long.', (val) => val.length <= 180),
  content: Yup.string().required('This field is required.').url('The link must be an URL!'),
  file: Yup.mixed<File>().optional().nullable().test({
    message: 'Please use only images with PNG, JPEG, and WEBP file formats.',
    test: (file, context) => {
      const isValid = file && ['png', 'jpg', 'jpeg', 'webp'].includes(getFileExt(file?.name))
      if (file && !isValid) context?.createError()
      return !file || isValid 
    }
  }).test({
    message: `File too big, can't exceed 5MB`,
    test: (file) => {
      const isValid = file && file?.size < 5000000;
      return !file || isValid;
    }
  })
})

async function submit(values: any) {
  if (values.file) { 
  const file = await s3.upload(values.file)
  useFetch(`/api/admins/announcement/${props.data._id}`, {
    method: 'PATCH',
    body: {
      ...values,
      login_image: file
    },
    onRequest({ request, options }) {
      console.log(request)
    },
    onResponseError({ response, error }) {
      toast.add({
        title: 'An error occured',
        description: response._data.message || error?.message,
        icon: 'i-lucide-circle-x',
        timeout: 3000
      })
    },
    onResponse() {
      emit('success')
    }
  })
  } else {
  useFetch(`/api/admins/announcement/${props.data._id}`, {
    method: 'PATCH',
    body: {
      ...values,
    },
    onResponseError({ response, error }) {
      toast.add({
        title: 'An error occured',
        description: response._data.message || error?.message,
        icon: 'i-lucide-circle-x',
        timeout: 3000
      })
    },
    onResponse() {
      emit('success')
    }
  })
  }
}
</script>
<script lang="ts">
export class Announcement {
  _id!: string;
  title!: string;
  description!: string;
  login_image!: string;
  content!: string;
  createdAt!: Date;
  createdBy!: string;
}
</script>

<template>
  <UModal>
    <UCard>
        <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-serif text-oct-green dark:text-lime-400 tracking-tighter">Editing announcement</h1>
              <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
            </div>  
        </template>
        <p class="text-gray-600 text-sm">Post Id: {{ data._id }}</p>
      <div class="space-y-2">
        <Form
          class="flex flex-col gap-2"
          @submit="submit"
          :validation-schema="schema"
          v-slot="{ meta, isSubmitting, errors, values }"
        >
            <div>
              <FormsTextField name="title" label="Title" placeholder="A great title" :value="data.title" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.title || '', { digit: 8, field: "New password" }) }}</span>
            </div>
            <div>
              <FormsTextArea name="description"  label="Description" placeholder="Lorem ipsum, dolor sit amet." :className="['resize-none', 'w-full', 'h-32']" :value="data.description" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.description || '', { digit: 8, field: "New password" }) }}</span>
            </div>
            <div>
              <FormsTextField name="content" label="Link" placeholder="https://facebook.com/post/1023912391231283" :value="data.content">
                <template #leading>
                    <Link :size="24" />
                </template>
              </FormsTextField>
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.content || '') }}</span>
            </div>
            <div>
              <FormsAnnouncementFileUpload name="file" label="Log-in Image" accept="image/jpeg, image/png, image/webp" @change="previewImg" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.file || '') }}</span>
              <UAccordion v-if="values.file" :items="[{ label: 'Preview Image', icon: 'i-lucide-image', slot: 'img-preview' }]" class="mt-2">
                <template #img-preview>
                  <img :src="previewImage" class="w-full max-h-96 object-cover aspect-video" />
                </template>
              </UAccordion>
            </div>
            <ButtonsDefault>Submit</ButtonsDefault>
        </Form>
      </div>
    </UCard>
  </UModal>
</template>