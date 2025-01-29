import HomeActions, { Header, Text } from "./HomeActions"
import { FileClock, FilePlus2 } from "lucide-react"
import { Session } from "next-auth"

export default function ReportsGroup({ session }: { session: Session | null }) {
    if(["FACULTY", "SUPERADMIN"].includes(session?.user?.role || '')) return (
        <section>
            <h1 className="text-3xl mb-2 font-serif">Grade Reports</h1>
            <div className="grid md:grid-cols-3 gap-2">
                <HomeActions icon={<FilePlus2 size={32} />} href="/repots/create/" role={["FACULTY"]}>
                    <Header>New Grade Report</Header>
                    <Text>Create a new grade report either for your subjects or your advisory class.</Text>
                </HomeActions>
                <HomeActions icon={<FileClock size={32} />} href="/classes" role={["FACULTY"]}>
                    <Header>Report History</Header>
                    <Text>View the list of your grade reports, and filter them thru types and other parameters.</Text>
                </HomeActions>
            </div>
        </section>
    )
}