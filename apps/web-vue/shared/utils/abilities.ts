import type UserRecord from '~/types/User.ts'
export const isAdmin = defineAbility((user: UserRecord) => {
    return user.role == 'SUPERADMIN'
})

export const isFaculty = defineAbility((user: UserRecord) => {
    return user.role == 'FACULTY'
})

export const isStudent = defineAbility((user: UserRecord) => {
    return user.role == 'USER'
})