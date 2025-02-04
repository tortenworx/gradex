import type UserType from "@/types/User";
import type { H3Event } from "h3";
import axios from "axios";
import backend from "~/utils/backend-resolver";
import { resolveUser } from "~/utils/backend-resolver";

async function logSession(event: H3Event<Request>, user: UserType, apiKey: string) {
    await replaceUserSession(event, {
        user,
        secure: {
            apiKey
        },
        loggedInAt: new Date()
    }, {
            maxAge: 60 * 60 * 1
        }
    )
}

async function attemptCredentials(event: H3Event<Request>, username: string, password: string) {
    const { data: keyData, status: keyStatus, statusText: keyStatusText } = await backend.post(`/credentials/authenticate/`, {
        username: username,
        password: password
    })
    if (keyStatus !== 201) {
        throw createError({
            statusCode: keyStatus,
            statusText: keyStatusText,
            statusMessage: keyData.message.toString()
        })
    }
    const user = await resolveUser(keyData.access_token).catch(err => {
        throw createError({
            statusCode: err.status,
            statusText: err.statusText,
            statusMessage: err.data.message
        })
    })

    await logSession(event, user, keyData.access_token)
    return true
}

export default {
    attemptCredentials,
    logSession
}