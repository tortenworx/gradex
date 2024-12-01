import { defineStore } from "#build/imports";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: undefined,
        user: {
            first_name: '',
            middle_name: '',
            last_name: '',
            
        }
    })
})
