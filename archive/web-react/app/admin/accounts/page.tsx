"use server"
import { auth } from "@/auth"
export default async function AdminAccounts() {
    const session = await auth()
    if (session?.user?.role !== "SUPERADMIN") return <p>Unauthorized {session?.user?.role}</p>
    return (
        <main>
            <h1 className="text-2xl font-serif font-medium">
                All Accounts
            </h1>
        </main>
    )
}