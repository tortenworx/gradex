import { isFaculty } from "~/shared/utils/abilities"

export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    const body = await readBody(event);
    const runtime = useRuntimeConfig();
    await authorize(isFaculty);
    const accessToken = sessionData.secure.apiKey;

    if (!event.context.params) {
        throw createError({
            statusCode: 400,
            statusText: 'Bad Request',
            statusMessage: 'Missing required parameters.'
        })
    }
    const request = await $fetch(`${runtime.public.apiUrl}grades/publish/${event.context.params.id}`, {
        method: "PUT",
        onRequest({ options }) {
            console.log(event.context.params)
            options.headers = new Headers(options.headers)
            options.headers.set("Authorization", `Bearer ${accessToken}`)
        },
        onResponseError({ response }) {
            throw createError({
                status: response.status,
                message: response._data.message
            }) 
        }
    })
    return request;
})