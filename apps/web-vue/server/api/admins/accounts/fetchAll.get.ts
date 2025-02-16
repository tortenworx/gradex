import backend from "~/utils/backend-resolver"

export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    if (!sessionData.secure) {
        throw createError({
            statusCode: 500,
            statusText: "A bug has occured.",
            statusMessage: 'The API Key for the backend disappeaed for some reason. This is a known bug. Retry later.'
        })
    }
    const accessToken = sessionData.secure.apiKey

    try {
        const { data, status, statusText } = await backend.get('users/fetch', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (status >= 400) {
            throw createError({
                statusCode: status,
                statusText,
                statusMessage: data.message.toString()
            })
        }
        const result: any[] = []
        data.forEach((element: any) => {          
            result.push({
                id: element._id,
                id_number: element.id_number,
                full_name: `${element.last_name}, ${element.first_name} ${element.middle_name}`,
                mobile_number: '0'+element.mobile_number,
                personal_email: element.personal_email_address,
                school_email: element.educational_email_address,
                gender: element.gender,
                credential: element.credential ? true : false
            })
        });
        return result;
    } catch (error) {
        console.error(error)
        throw createError({
            statusCode: 500,
            statusText: 'Undefined error occured',
        })
    }
})