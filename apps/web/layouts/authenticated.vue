<script setup lang="ts">

const { data, signOut } = useAuth();
const router = useRouter()

function signOutAndReturnToLogin() {
    signOut()
    router.push('/accounts/login')
}
</script>

<template>
    <div>
        <nav class="bg-gradient-to-r from-oct-green to-oct-lime px-4 py-2 flex items-center justify-between">
            <div>
                <NuxtLink href="/">
                    <img src="~/assets/images/logo/gradex-solid.svg" alt="" class="max-w-xs md:block md:visible invisible hidden">
                    <img src="~/assets/images/logo/gradex-minified-solid.svg" alt="" class="max-w-[50%] md:invisible md:hidden">
                </NuxtLink>
            </div>
            <div>
                <NavbarUser :user="data" :logOut="signOut()" />
            </div>
        </nav>
        <div class="px-4 py-4">
            <slot></slot>
        </div>
        <footer class="bg-lime-950 p-8 grid md:grid-cols-4 text-white">
            <div> 
                <img src="~/assets/images/logo/gradex-minified-solid.svg" width="248" />
                <p class="mt-2">&copy; 2024, All rights reserved.</p>
                <p>GradeX is a capstone project made to fullfil the requirements for Practical Research 2.<br>Read more about our research paper <a class="text-lime-600 underline">here</a>.</p>
            </div>
            <div>
                <p class="text-lime-600 font-sm tracking-wider font-mono uppercase">
                    Links
                </p>
                <div class="mt-3 flex flex-col gap-1">
                    <a href="https://olivarezcollegetagaytay.edu.ph" target="_blank">Website</a>
                    <a href="https://facebook.com/OCTagaytayOfficial" target="_blank">Facebook</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
</script>