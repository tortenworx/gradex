import backend from "~/utils/backend-resolver"

export default defineEventHandler(async (event) => {
    const sessionData = await getUserSession(event)
    const accessToken = sessionData.secure.apiKey

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