import auth from '@/server/utils/auth'

export default defineEventHandler(async (event) => {
    auth.clearLogin(event)
    return true
});