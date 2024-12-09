<template>
    <div>
        <slot />
        <footer class="bg-lime-950 p-8 grid md:grid-cols-3 gap-4 text-white">
            <div>
              <NuxtLink href="/">
                <img src="~/assets/images/logo/gradex-minified-solid.svg" width="248" />
              </NuxtLink>
              <p class="mt-2">&copy; 2024, All rights reserved.</p>
              <p>GradeX is a capstone project made to fullfil the requirements for Practical Research 2.<br>Read more about our research paper <NuxtLink href="/about" class="text-lime-600 underline">here</NuxtLink></p>
            </div>
            <div class="flex flex-col">
              <h5 class="font-mono text-oct-yellow uppercase">Links</h5>
              <a href="https://olivarezcollegetagaytay.edu.ph" target="_blank" class="max-w-fit">Website</a>
              <a href="https://facebook.com/OCTagaytayOfficial" target="_blank" class="max-w-fit">Facebook</a>
              <a href="https://www.facebook.com/oct.shs/" target="_blank" class="max-w-fit">SHS Facebook</a>
            </div>
            <div class="flex flex-col">
              <h5 class="text-oct-yellow uppercase font-mono">Services</h5>
              <a href="https://octiensys.com" target="_blank" class="max-w-fit">Student Portal</a>
              <a href="https://119.93.245.104/iensys/" target="_blank" class="max-w-fit">Faculty Portal</a>
              <a href="http://119.93.245.104:8080" target="_blank" class="max-w-fit">eLibrary</a>
            </div>
        </footer>
    </div>
</template>