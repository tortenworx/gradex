export default defineEventHandler(async (event) => {
    if (!event.context.params) {
        throw createError({
            statusCode: 400,
            statusText: 'Bad Request',
            statusMessage: 'Missing required parameters.'
        })
    }
    const data = await useStorage('kv').getItem(event.context.params.id)
    if (data == null) throw createError({
        statusCode: 404,
        statusMessage: 'No key found.'
    })
    return {
        key: event.context.params.id,
        value: data
    }
})