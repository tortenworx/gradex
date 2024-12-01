import axios from "axios"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    maxAge: 60 * 60 * 2,
  },
  providers: [
    Google({
        clientId: '152335755694-sn0mps9md9kc9sdp2tcsbb0jn71up7q2.apps.googleusercontent.com',
        clientSecret: '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',
        profile(profile) {
            return profile
        },
        client: {
            params: {
                hb: 'olivarezcollegetagaytay.edu.ph'
            }
        }
        
    }),
    Credentials({
        credentials: {
            username: { label: "Username or ID Number" },
            password: { label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
            const { data } = await axios.post(process.env.API_BASE_URL + 'credentials/authenticate/jwt', {
                username: credentials.username,
                password: credentials.password
            }).catch(error => {
                throw new Error(error)
            })
            const getUser = await axios.get(process.env.API_BASE_URL + 'credentials/user', {
                headers: {
                    Authorization: 'Bearer ' + data.access_token
                }
            }).catch(error => {
                throw new Error(error)
            })
            return {
                id: getUser.data._id,
                accessToken: data.access_token,
                ...getUser.data
            }
        },
    })
  ],
  callbacks: {
    async jwt({ account, token, user, trigger }) {
        if (trigger == "signIn" && account?.type == "credentials") {
            token.sub = user.id
            token.name = `${user.first_name} ${user.middle_name} ${user.last_name}`
            token.email = user.educational_email_address
            token.accessToken = user.accessToken
            token.role = user.role
            token.credentials = true
        }
        // console.log(token.acessToken, account?.access_token, user)
        return token;
    },
    async session({ token, session }) {
        if (token.credentials) {
            const { data } = await axios.get(process.env.API_BASE_URL + 'credentials/user', {
                headers: {
                    Authorization: 'Bearer ' + token.accessToken
                }
            })
            delete data["__v"]
            session.user = data
            return { ...session, token, }
        }
        return { ...session, token }
    }
  }
})
