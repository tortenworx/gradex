import { isFaculty } from "~/shared/utils/abilities"

export default defineEventHandler(async (event) => {
    const shsCurrentSem = await $fetch('/api/admins/global-vars/shs-current-semester')
    const collegeCurrentSem = await $fetch('/api/admins/global-vars/college-current-semester')
    const sessionData = await requireUserSession(event)
    const body = await readBody(event)
    const runtime = useRuntimeConfig()
    await authorize(isFaculty)
    const accessToken = sessionData.secure.apiKey
    const request = await $fetch(`${runtime.public.apiUrl}grades`, {
        method: "POST",
        body: {
            subject: body._id,
            type: body.linked_class.type,
            semester: body.linked_class.type == "SHS" ? shsCurrentSem.value : collegeCurrentSem.value
        },
        onRequest({ options }) {
            options.headers = new Headers(options.headers)
            options.headers.set("Authorization", `Bearer ${accessToken}`)
        }
    })
    return request
})