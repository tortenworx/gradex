import { isFaculty } from "~/shared/utils/abilities"
import type { GradeReport } from "~/types/GradeReport"
import { exportSpreadsheet } from "~/utils/ezGrade"

export default defineEventHandler(async (event) => {
    const sessionData = await requireUserSession(event)
    await authorize(isFaculty)
    const runtime = useRuntimeConfig()
    const accessToken = sessionData.secure.apiKey
    if (!event.context.params) {
        throw createError({
            statusCode: 400,
            statusText: 'Bad Request',
            statusMessage: 'Missing required parameters.'
        })
        
    }
    const data = await event.$fetch<GradeReport>(`${runtime.public.apiUrl}grades/${event.context.params.id}`, {
        onRequest({ options }) {
            options.headers = new Headers(options.headers)
            options.headers.set("Authorization", `Bearer ${accessToken}`)
        }
    })
    const alphabetizedStudents = data.records.sort((a,b) => a.user.last_name.localeCompare(b.user.last_name))
    const spreadsheet = exportSpreadsheet({ recordId: data._id, classId: data.subject.linked_class._id }, alphabetizedStudents)
    return spreadsheet;
})