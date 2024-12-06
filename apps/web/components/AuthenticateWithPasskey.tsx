import { KeyRound } from "lucide-react"

export default function AuthPasskeyButton() {
    return (
        <button disabled={true} className="disabled:opacity-50 disabled:hover:cursor-not-allowed px-2 py-4 w-full rounded-md flex items-center justify-center gap-2 border-[1px] border-zinc-700 border-opacity-50 shadow-md text-zinc-800 font-sans text-lg font-medium">
            <KeyRound className="text-gray-900"/>
            <span>Passkey (soon)</span>
        </button>
    )
}