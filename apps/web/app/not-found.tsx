import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-oct-othagreen flex items-center justify-center px-12">
            <div className="bg-white px-8 py-6 rounded-lg md:min-w-96 md:max-w-md flex flex-col gap-4 text-center">
                <div className="flex items-center justify-center">
                    <FileQuestion size={64} />
                </div>
                <div>
                    <h1 className="text-3xl font-serif font-medium text-oct-othagreen">Page Not Found</h1>
                    <p>The page you requested has either moved, deleted or did not exist at all. Please check the URL and try again.</p>
                </div>
                <Link href='/' className="text-oct-othagreen">Return Home</Link>
            </div>
        </main>
    )
}