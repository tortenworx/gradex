import { isFaculty } from "~/shared/utils/abilities"

export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    const body = await readBody(event)
    const runtime = useRuntimeConfig()
    return await event.$fetch(`${runtime.public.apiUrl}grades`, {
        method: "POST",
        timeout: 60000,
        headers: {
            Authorization: `Bearer ${sessionData.secure.apiKey}`
        },
        body: {
            subject: body._id,
            type: body.linked_class.type,
            semester: 1
        },
    })
})