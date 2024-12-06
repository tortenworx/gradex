import Image from "next/image"
import octGoogleWorkspace from '@/assets/images/externals/logo/oct_gworkspace.png'
import { signIn } from "@/auth"

export default function AuthGoogleButton() {
    async function authenticate() {
        "use server";
        await signIn("google")
    }
    return (
        <form
            action={authenticate}>
            <button className="group px-2 py-4 w-full rounded-md flex items-center justify-center gap-2 border-[1px] border-zinc-700 border-opacity-50 shadow-md text-zinc-800 font-sans text-lg font-medium active:bg-oct-darkgreen active:text-white transition-colors duration-700">
                <Image
                    src={octGoogleWorkspace}
                    alt="A picture of the OCT Logo with a modified Google logo to resemble the words OC."
                    width={64}
                    className="group-active:grayscale"
                />
                <span>Google Workspace</span>
            </button>
        </form>
    )
}