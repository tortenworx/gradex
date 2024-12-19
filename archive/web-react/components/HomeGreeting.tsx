import { useSession } from "next-auth/react";
import { Suspense } from "react";
import LoadingSuspense from "./LoadingSuspense";
export default function HomeGreeting() {
    const session = useSession();
    function getTime() {
        const today = new Date()
        const curHr = today.getHours()
        if (curHr < 12) {
        return 'Good Morning'
        } else if (curHr < 18) {
        return 'Good Afternoon'
        } else {
        return 'Good Evening'
        }
    }

    function getTimeEmoji() {
        const today = new Date()
        const curHr = today.getHours()
        if (curHr < 12) {
        return '🌞'
        } else if (curHr < 18) {
        return '🌇'
        } else {
        return '🌚'
        }
    }
    return (
        <div>
            <h1 className="text-3xl font-medium font-serif text-oct-othagreen">
                {getTime()}, { session?.data?.user?.first_name }! {getTimeEmoji()}
            </h1>
            <h3 className="text-xl font-light">What do you want to do today?</h3>
        </div>
    )
}