import HomeActions, { Header, Text } from "./HomeActions"
import { FileSpreadsheet, Presentation } from "lucide-react"
import { Session } from "next-auth"

export default function GradesGroup({ session }: { session: Session | null }) {
    if(["USER", "FACULTY"].includes(session?.user?.role || '')) return (
        <section>
            <h1 className="text-3xl mb-2 font-serif">Grades & Classes</h1>
            <div className="grid md:grid-cols-3 gap-2">
                <HomeActions icon={<FileSpreadsheet size={32} />} href="/repots/view/" role={["USER"]}>
                    <Header>Current Grade Report</Header>
                    <Text>View your current grade report including subject, grades and overall average</Text>
                </HomeActions>
                <HomeActions icon={<Presentation size={32} />} href="/classes" role={["USER", "FACULTY"]}>
                    <Header>Current Classes</Header>
                    <Text>View all your current class and their details for this semester.</Text>
                </HomeActions>
            </div>
        </section>
    )
}