import { isFaculty } from "~/shared/utils/abilities"

export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    await authorize(isFaculty)
    const runtime = useRuntimeConfig()
    const accessToken = sessionData.secure.apiKey
    if (!event.context.params) {
        throw createError({
            statusCode: 400,
            statusText: 'Bad Request',
            statusMessage: 'Missing required parameters.'
        })
    }
    const data = await event.$fetch(`${runtime.public.apiUrl}grades/${event.context.params.id}`, {
        onRequest({ options }) {
            options.headers = new Headers(options.headers)
            options.headers.set("Authorization", `Bearer ${accessToken}`)
        }
    })
    return data;
})