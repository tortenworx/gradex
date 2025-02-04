export default defineEventHandler(async (event) => {
    return {
        isAlive: true,
        time: Date.now()
    }
})