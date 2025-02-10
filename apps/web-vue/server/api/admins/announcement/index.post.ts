
import backend from "~/utils/backend-resolver"
import axios from 'axios'
import { ofetch } from "ofetch";

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
    console.log(accessToken)
    const data = await $fetch(`${runtime.public.apiUrl}announcements`,
        {
            method: 'POST',
            body,
            headers: {
                Authorization: accessToken
            },
            onRequestError({ request, error, options }) {
                throw createError({
                    statusCode: 500,
                    statusMessage: error.message
                })
            },
            onResponseError({ response }) {
                throw createError({
                    statusCode: response.status,
                    statusMessage: response._data.message
                })
            }
        },
    )
})