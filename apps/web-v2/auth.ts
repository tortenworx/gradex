import axios from "axios"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: '152335755694-sn0mps9md9kc9sdp2tcsbb0jn71up7q2.apps.googleusercontent.com',
        clientSecret: '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',
        profile(profile) {
            return profile
        },
    }),
    Credentials({
        credentials: {
            username: { label: "Username or ID Number" },
            password: { label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
            const { data, status, statusText } = await axios.post(process.env.API_BASE_URL + 'credentials/authenticate', {
                username: credentials.username,
                password: credentials.password
            })
            if (status !== 200) return statusText;
            return (data) ?? null
        },
    })
  ],
  callbacks: {
    
  }
})
