<template>
   <div class="bg-oct-green rounded-md w-32 h-32 flex items-center justify-center relative" ref="dropZoneRef">
        <div v-if="isOverDropZone" class="bg-oct-lime">
            <div class="h-full m-2 border-2 border-dashed border-white text-center rounded-md text-white font-bold">
                Drop File Here
            </div>
        </div>
        <img :src="previewImage" class="max-w-28 rounded-sm" />
        <input type="file" accept="image/jpeg" @change=uploadImage class="hover:cursor-pointer opacity-0 w-32 h-32 absolute top-0 bottom-0 left-0 right-0">
   </div>
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
const dropZoneRef = ref<HTMLElement>()
function onDrop(files: File[] | null) {
  // called when files are dropped on zone
}
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ['image/jpeg', 'images/png'],
  // control multi-file drop
  multiple: true,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
})
</script>
<script lang="ts">
    export default {
        name:'imageUpload',
        data(){
            return{
               previewImage: null
            }
        },
        methods:{
            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    console.log(this.previewImage);
                };
            }
        }
     }  // missing closure added
</script>
