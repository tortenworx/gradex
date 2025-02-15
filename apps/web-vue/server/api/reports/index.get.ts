import { isFaculty } from "~/shared/utils/abilities"

export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    await authorize(isFaculty)
    const runtime = useRuntimeConfig()
    const accessToken = sessionData.secure.apiKey
    const data = await event.$fetch(`${runtime.public.apiUrl}grades`, {
        onRequest({ options }) {
            options.headers = new Headers(options.headers)
            options.headers.set("Authorization", `Bearer ${accessToken}`)
        }
    })
    return data;
})