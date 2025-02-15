<script setup lang="ts">
import * as Yup from 'yup'
const modal = useModal();

function getFileExt(fname: string): string {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}

const schema = Yup.object().shape({
  first_name: Yup.string().required(),
  middle_name: Yup.string().required(),
  last_name: Yup.string().required(),
  personal_email_address: Yup.string().required().email().matches(/^[A-Za-z0-9._%+-]+@olivarezcollegetagaytay\.edu\.ph$/gi, { message: "field_errors.school_email_invalid" }),
  organizational_email_address: Yup.string().required().email().matches(/^[A-Za-z0-9._%+-]+@(?!olivarezcollegetagaytay.edu.ph)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi, { message: "field_errors.personal_email_invalid" }),
  gender: Yup.mixed().required().oneOf(['MALE', 'FEMALE', 'OTHER']),
  id_number: Yup.string().required(),
  role: Yup.mixed().required().oneOf(['USER', "FACULTY", "SUPERADMIN"]),
  profile_image_file: Yup.mixed<File>().required('field_errors.required_default').test({
    message: 'Please use only images with PNG, JPEG, and WEBP file formats.',
    test: (file, context) => {
      const isValid = file && ['png', 'jpg', 'jpeg', 'webp'].includes(getFileExt(file?.name))
      if (file && !isValid) context?.createError()
      return !file || isValid 
    }
  }).test({
    message: `field_errors.file_too_big`,
    test: (file) => {
      const isValid = file && file?.size < 5000000;
      return !file || isValid;
    }
  })
})

function submit(values: any) {

}
</script>

<template>
  <UModal>
    <UCard>
        <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-serif text-oct-green dark:text-lime-400 tracking-tighter">Create a new announcement</h1>
              <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="modal.close()" />
            </div>  
        </template>
      <div class="space-y-2">
        <Form
          class="flex flex-col gap-2"
          @submit="submit"
          :validation-schema="schema"
          v-slot="{ meta, isSubmitting, errors, values }"
        >
            <div>
              <FormsTextField name="title" label="Title" placeholder="A great title" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.title || '', { digit: 8, field: "New password" }) }}</span>
            </div>
            <div>
              <FormsTextArea name="description"  label="Description" placeholder="Lorem ipsum, dolor sit amet." :className="['resize-none', 'w-full', 'h-32']" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.description || '', { digit: 8, field: "New password" }) }}</span>
            </div>
            <div>
              <FormsTextField name="content" label="Link" placeholder="https://facebook.com/post/1023912391231283">
                <template #leading>
                    <Link :size="24" />
                </template>
              </FormsTextField>
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.content || '') }}</span>
            </div>
            <div>
              <FormsAnnouncementFileUpload name="file" label="Log-in Image" accept="image/jpeg, image/png, image/webp" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.file || '') }}</span>
            </div>
            <ButtonsDefault>Submit</ButtonsDefault>
        </Form>
      </div>
    </UCard>
  </UModal>
</template>