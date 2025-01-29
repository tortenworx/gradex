import backend from "~/utils/backend-resolver"

export default defineEventHandler(async (event) => {
    const sessionData = await getUserSession(event)
    const accessToken = sessionData.secure.apiKey

    if (!sessionData.secure) {
        throw createError({
            statusCode: 500,
            statusText: "A bug has occured.",
            statusMessage: 'The API Key for the backend disappeaed for some reason. This is a known bug. Retry later.'
        })
    }

    const { data: users, status, statusText } = await backend.get('/users/fetch', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (status >= 400) {
        throw createError({
            statusCode: status,
            statusText,
            statusMessage: users.message.toString()
        })
    }

    return users;
})