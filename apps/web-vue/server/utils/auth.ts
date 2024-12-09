import type UserType from "@/types/User";
import type { H3Event } from "h3";
import axios from "axios";

async function logSession(event: H3Event<Request>, user: UserType, apiKey?: string) {
    await replaceUserSession(event, {
        user,
        secure: {
            apiKey
        },
        loggedInAt: new Date()
    })
}

async function attemptCredentials(event: H3Event<Request>, username: string, password: string) {
    const { data: keyData, status: keyStatus, statusText: keyStatusText } = await axios.post('http://localhost:8000/credentials/authenticate/', {
        username: username,
        password: password
    }, { validateStatus: () => true })
    if (keyStatus !== 201) {
        throw createError({
            statusCode: keyStatus,
            statusText: keyStatusText,
            statusMessage: keyData.message.toString()
        })
    }
    const { data, status: userStatus, statusText: userStatusText } = await axios.get('http://localhost:8000/credentials/user/', { 
        headers: {
            Authorization: 'Bearer ' +  keyData.access_token
        },
        validateStatus: () => true
    });
    if (userStatus !== 200) {
        throw createError({
            statusCode: userStatus,
            statusText: userStatusText,
            statusMessage: data.message
        })
    }

    await logSession(event, data, keyData.access_token)
    return true
}

export default {
    attemptCredentials,
    logSession
}