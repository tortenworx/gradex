import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    href: string,
    icon: ReactNode,
    role: string[],
    children: ReactNode
}

export default function HomeActions({ href, icon, children, role }: Props) {
    const { data: session } = useSession()
    if (role.includes(session?.user?.role || '')) return (
        <Link href={href} passHref>
            <button className="min-w-full px-4 py-2 h-full shadow-md flex items-center justify-start gap-4 hover:shadow-2xl rounded-md border-[1px] border-gray-700 border-opacity-50">
                <div className="text-oct-othagreen">
                    {icon}
               </div>
                <div className="flex flex-col items-start justify-start text-left">
                    {children}
                </div>
            </button>
        </Link>
    )
}

export function Header({ children }: { children: ReactNode }) {
    return (
        <h1 className="text-2xl text-oct-othagreen font-medium">
            {children}
        </h1>
    )
}

export function Text({ children }: { children: ReactNode }) {
    return (
        <p className="text-oct-darkgreen text-sm">
            {children}
        </p>
    )
}