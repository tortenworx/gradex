export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    const body = await readBody(event)
    const runtime = useRuntimeConfig()
    if (!sessionData.secure) {
        throw createError({
            statusCode: 500,
            statusText: "A bug has occured.",
            statusMessage: 'The API Key for the backend disappeaed for some reason. This is a known bug. Retry later.'
        })
    }
    const accessToken = sessionData.secure.apiKey
    return await event.$fetch(`${runtime.public.apiUrl}announcements`,
        {
            method: "POST",
            body,
            onRequest({ options }) {
                options.headers = new Headers(options.headers)
                options.headers.set("Authorization", `Bearer ${accessToken}`)
            },
            onRequestError({ request, error, options }) {
                throw createError({
                    statusCode: 500,
                    statusMessage: error.message
                })
            },
            onResponseError({ response, request }) {
                throw createError({
                    statusCode: response.status,
                    statusMessage: 'Error occured on server'
                })
            }
        },
    )
})