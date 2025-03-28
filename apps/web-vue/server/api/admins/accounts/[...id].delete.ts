
export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    const runtime = useRuntimeConfig()
    if (!sessionData.secure) {
        throw createError({
            statusCode: 500,
            statusText: "A bug has occured.",
            statusMessage: 'The API Key for the backend disappeaed for some reason. This is a known bug. Retry later.'
        })
    }
    if (!event.context.params?.id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing user ID."
        })
    }
    const data = await event.$fetch(`${runtime.public.apiUrl}users/${event.context.params?.id}`,
        {
            method: "DELETE",
            onRequest({ options }) {
                options.headers = new Headers(options.headers)
                options.headers.set("Authorization", `Bearer ${sessionData.secure.apiKey}`)
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